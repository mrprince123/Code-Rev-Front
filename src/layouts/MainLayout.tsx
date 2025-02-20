import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    // <div className="flex flex-col min-h-screen bg-[url('https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-center bg-cover bg-fixed">
      
    <div className="flex flex-col min-h-screen bg-[url('https://img.freepik.com/free-vector/gradient-blur-pink-blue-abstract-background_53876-117324.jpg?t=st=1740032026~exp=1740035626~hmac=569724f229e2f8e37430a5c386ffa682715538f1c6ec88b23b4d4644557df6f3&w=1380')] bg-center bg-cover bg-fixed">
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative w-[98%] sm:w-5/6 md:w-4/5 lg:w-2/3 mx-auto p-4 sm:p-0">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
