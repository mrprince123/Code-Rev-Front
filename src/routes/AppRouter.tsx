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

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/codes" element={<Codes />} />
          <Route path="/your-code" element={<YourCodes />} />
          <Route path="/full-code/:id" element={<FullCode />} />
          <Route path="/full-code/public/:id" element={<FullPublicCode />} />
          <Route path="/submit-code" element={<CodeSubmit />} />
          <Route path="/code-update/:id" element={<CodeUpdate />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/profile/update" element={<UserUpdate />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
