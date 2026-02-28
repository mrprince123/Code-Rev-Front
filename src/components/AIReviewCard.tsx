import { useState } from "react";
import {
  Sparkle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  AlertTriangle,
  AlertCircle,
  Info,
  FlaskConical,
  Code2,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../App";
import CodeMirror, { EditorState } from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import ReactMarkdown from "react-markdown";
import type {
  AIReviewResponse,
  AIReviewCategory,
  AIReviewIssue,
  AIReviewTestSuggestion,
} from "../types/AIReview";

interface AIReviewCardProps {
  aiResponse: string | AIReviewResponse;
  slug: string;
  onReviewUpdated: () => void;
  isAuthor?: boolean;
}

// --- Helper Functions ---

const parseAIResponse = (
  aiResponse: string | AIReviewResponse,
): AIReviewResponse | null => {
  if (typeof aiResponse === "object" && aiResponse !== null) {
    return aiResponse as AIReviewResponse;
  }
  if (typeof aiResponse === "string") {
    try {
      const parsed = JSON.parse(aiResponse);
      if (parsed && typeof parsed.verdict === "string") {
        return parsed as AIReviewResponse;
      }
    } catch {
      // Not JSON — legacy markdown string
    }
  }
  return null;
};

const getVerdictStyle = (verdict: string) => {
  const v = verdict.toLowerCase();
  if (v.includes("excellent") || v.includes("great") || v.includes("good"))
    return {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    };
  if (v.includes("poor") || v.includes("fail") || v.includes("bad"))
    return {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      dot: "bg-red-500",
    };
  return {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-500",
  };
};

const getScoreColor = (score: number) => {
  if (score >= 8) return { bar: "bg-emerald-500", text: "text-emerald-600" };
  if (score >= 6) return { bar: "bg-amber-500", text: "text-amber-600" };
  return { bar: "bg-red-500", text: "text-red-600" };
};

const getSeverityConfig = (severity: string) => {
  switch (severity) {
    case "critical":
      return {
        icon: AlertTriangle,
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        badge: "bg-red-100 text-red-700",
      };
    case "warning":
      return {
        icon: AlertCircle,
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        badge: "bg-amber-100 text-amber-700",
      };
    default:
      return {
        icon: Info,
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
        badge: "bg-blue-100 text-blue-700",
      };
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
};

// --- Sub-Components ---

const ScoreRing = ({ score }: { score: number }) => {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 10) * circumference;

  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={color.text}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${color.text}`}>{score}</span>
        <span className="text-xs text-gray-400">/10</span>
      </div>
    </div>
  );
};

const IssueCard = ({ issue }: { issue: AIReviewIssue }) => {
  const config = getSeverityConfig(issue.severity);
  const Icon = config.icon;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(issue.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`border ${config.border} ${config.bg} rounded-lg p-4 transition-all duration-200`}
    >
      <div className="flex items-start gap-3">
        <Icon size={18} className={`${config.text} mt-0.5 flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge}`}
            >
              {issue.severity}
            </span>
            <h4 className="font-semibold text-gray-800 text-sm">
              {issue.title}
            </h4>
          </div>
          <p className="text-sm text-gray-600 mt-1.5">{issue.description}</p>
          {issue.suggestion && (
            <div className="mt-2 bg-white/70 rounded-md p-2.5 border border-gray-200">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Suggestion
              </p>
              <p className="text-sm text-gray-700">{issue.suggestion}</p>
            </div>
          )}
          {issue.codeSnippet && (
            <div className="mt-2 relative">
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors z-10"
                title="Copy code"
              >
                {copied ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy size={14} className="text-gray-300" />
                )}
              </button>
              <pre className="bg-gray-800 text-gray-100 rounded-md p-3 text-xs overflow-x-auto">
                <code>{issue.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ category }: { category: AIReviewCategory }) => {
  const [expanded, setExpanded] = useState(false);
  const color = getScoreColor(category.score);
  const hasIssues = category.issues && category.issues.length > 0;

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-200 hover:shadow-sm">
      <button
        onClick={() => hasIssues && setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <ShieldCheck size={20} className="text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="font-semibold text-gray-800 text-sm truncate">
                {category.name}
              </h3>
              <span className={`text-sm font-bold ${color.text} ml-2`}>
                {category.score}/10
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${color.bar} transition-all duration-500`}
                style={{ width: `${category.score * 10}%` }}
              />
            </div>
          </div>
        </div>
        {hasIssues && (
          <div className="ml-3 flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs text-gray-500">
              {category.issues.length} issue
              {category.issues.length > 1 ? "s" : ""}
            </span>
            {expanded ? (
              <ChevronUp size={16} className="text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-400" />
            )}
          </div>
        )}
      </button>
      {expanded && hasIssues && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
          {category.issues.map((issue, i) => (
            <IssueCard key={i} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
};

const TestSuggestionCard = ({ test }: { test: AIReviewTestSuggestion }) => {
  const badge = getPriorityBadge(test.priority);
  return (
    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
      <FlaskConical
        size={16}
        className="text-indigo-500 mt-0.5 flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-medium text-sm text-gray-800">{test.testName}</h4>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge}`}
          >
            {test.priority}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{test.description}</p>
      </div>
    </div>
  );
};

// --- Main Component ---

const AIReviewCard = ({
  aiResponse,
  slug,
  onReviewUpdated,
  isAuthor = false,
}: AIReviewCardProps) => {
  const [isReGenerating, setIsReGenerating] = useState(false);
  const [showRefactored, setShowRefactored] = useState(false);

  const review = parseAIResponse(aiResponse);

  const handleReGenerate = async () => {
    setIsReGenerating(true);
    try {
      const response = await axios.patch(
        `${baseUrl}/code/re-review/${slug}`,
        {},
        { withCredentials: true },
      );
      toast.success(
        response.data.message || "Review regenerated successfully!",
      );
      onReviewUpdated();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to regenerate review",
      );
    } finally {
      setIsReGenerating(false);
    }
  };

  // Fallback: legacy markdown string
  if (!review) {
    return (
      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-purple-500">
            <Sparkle />
            <h2 className="text-xl font-medium">AI Review</h2>
          </div>
          {isAuthor && (
            <button
              onClick={handleReGenerate}
              disabled={isReGenerating}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={isReGenerating ? "animate-spin" : ""}
              />
              {isReGenerating ? "Regenerating..." : "Re-Generate"}
            </button>
          )}
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border text-gray-600">
          <ReactMarkdown>{aiResponse as string}</ReactMarkdown>
        </div>
      </div>
    );
  }

  const verdictStyle = getVerdictStyle(review.verdict);

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-purple-500">
          <Sparkle />
          <h2 className="text-xl font-semibold">AI Code Review</h2>
        </div>
        {isAuthor && (
          <button
            onClick={handleReGenerate}
            disabled={isReGenerating}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={isReGenerating ? "animate-spin" : ""}
            />
            {isReGenerating ? "Regenerating..." : "Re-Generate Review"}
          </button>
        )}
      </div>

      {/* Verdict + Score Overview */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <ScoreRing score={review.overallScore} />
          <div className="flex-1 text-center sm:text-left">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${verdictStyle.bg} ${verdictStyle.border} border mb-3`}
            >
              <span className={`w-2 h-2 rounded-full ${verdictStyle.dot}`} />
              <span className={`text-sm font-semibold ${verdictStyle.text}`}>
                {review.verdict}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {review.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {review.categories && review.categories.length > 0 && (
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Category Breakdown
          </h3>
          <div className="space-y-2">
            {review.categories.map((cat, i) => (
              <CategoryCard key={i} category={cat} />
            ))}
          </div>
        </div>
      )}

      {/* Refactored Code */}
      {review.refactoredCode && (
        <div className="mb-5">
          <button
            onClick={() => setShowRefactored(!showRefactored)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 hover:text-gray-700 transition-colors"
          >
            <Code2 size={16} />
            Refactored Code
            {showRefactored ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {showRefactored && (
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <CodeMirror
                value={review.refactoredCode}
                theme={vscodeDark}
                extensions={[EditorState.readOnly.of(true)]}
                className="overflow-x-auto"
              />
            </div>
          )}
        </div>
      )}

      {/* Testing Suggestions */}
      {review.testingSuggestions && review.testingSuggestions.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            <FlaskConical size={16} />
            Testing Suggestions
          </h3>
          <div className="space-y-2">
            {review.testingSuggestions.map((test, i) => (
              <TestSuggestionCard key={i} test={test} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIReviewCard;
