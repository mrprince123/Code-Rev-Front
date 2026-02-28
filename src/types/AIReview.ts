export interface AIReviewIssue {
    severity: "critical" | "warning" | "info";
    title: string;
    description: string;
    suggestion: string;
    codeSnippet: string;
}

export interface AIReviewCategory {
    name: string;
    score: number;
    issues: AIReviewIssue[];
}

export interface AIReviewTestSuggestion {
    testName: string;
    description: string;
    priority: "high" | "medium" | "low";
}

export interface AIReviewResponse {
    verdict: string;
    overallScore: number;
    summary: string;
    categories: AIReviewCategory[];
    refactoredCode: string;
    testingSuggestions: AIReviewTestSuggestion[];
}
