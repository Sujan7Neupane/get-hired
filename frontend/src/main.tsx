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

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="jobs/" element={<JobsPage />} />
          <Route path="jobs/:id" element={<JobDetailsPage />} />
          <Route path="companies/" element={<CompaniesPage />} />
          <Route path="companies/:id" element={<CompanyDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
