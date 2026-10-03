import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Toaster />
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
