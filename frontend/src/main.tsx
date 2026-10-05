import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

import HomePage from "./pages/Homepage.tsx";
import JobDetailsPage from "./pages/JobDetailsPage.tsx";
import CompanyDetailsPage from "./pages/CompanyDetailsPage.tsx";
import JobsPage from "./pages/JobPage.tsx";
import CompaniesPage from "./pages/CompanyPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import EmployerDashboardPage from "./pages/EmployerDashboardPage.tsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import MyApplicationsPage from "./pages/MyApplicationPage.tsx";
import SavedJobsPage from "./pages/SavedJobPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/:id" element={<JobDetailsPage />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="companies/:id" element={<CompanyDetailsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="about" element={<AboutPage />} />

          {/* Employer Routes */}
          <Route element={<ProtectedRoute allowedRoles={["employer"]} />}>
            <Route
              path="employer/dashboard"
              element={<EmployerDashboardPage />}
            />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="admin/dashboard" element={<AdminDashboardPage />} />
          </Route>

          {/* Candidate Routes */}
          <Route element={<ProtectedRoute allowedRoles={["candidate"]} />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="applications" element={<MyApplicationsPage />} />
            <Route path="saved-jobs" element={<SavedJobsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
