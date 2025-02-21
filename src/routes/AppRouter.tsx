import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/Profile";
import Codes from "../pages/Codes";
import YourCodes from "../pages/YourCodes";
import FullCode from "../pages/FullCode";
import CodeSubmit from "../pages/CodeSubmit";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CodeUpdate from "../pages/CodeUpdate";
import FullPublicCode from "../pages/FullPublicCode";
import Feedback from "../pages/Extras/Feedback";
import UserUpdate from "../pages/UserUpdate";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import PrivacyPolicy from "../pages/Extras/PrivacyPolicy";
import AuthRedirectGuard from "../guards/AuthRedirectGuard";
import AuthGuard from "../guards/AuthGuard";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public  Route  */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/codes" element={<Codes />} />
          <Route path="/full-code/public/:slug" element={<FullPublicCode />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Protected Routes (Required Authentication)  */}
        <Route element={<AuthGuard />}>
          <Route element={<MainLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/your-code" element={<YourCodes />} />
            <Route path="/full-code/:slug" element={<FullCode />} />
            <Route path="/submit-code" element={<CodeSubmit />} />
            <Route path="/code-update/:slug" element={<CodeUpdate />} />
            <Route path="/profile/update" element={<UserUpdate />} />
          </Route>
        </Route>

        {/* Login and Register Route  */}
        <Route element={<AuthRedirectGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
