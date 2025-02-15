import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

const MainLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const location = useLocation();

  // Define routes that should be publicly accessible
  const publicRoutes = [
    "/",
    "/codes",
    "/full-code/public/:id",
    "/privacy",
    "/feedback",
  ];

  // // Check if the current route is public
  // const isPublicRoute = publicRoutes.some((route) =>
  //   location.pathname.startsWith(route.replace(":id", ""))
  // );

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // If the user is not authenticated and the route is not public, redirect to login
  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[url('https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-center bg-cover bg-fixed">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative w-[98%] sm:w-5/6 md:w-4/5 lg:w-2/3 mx-auto p-4 sm:p-0">
        {/* {isAuthenticated ? <Outlet /> : <Navigate to="/login" />} */}
        {/* {isAuthenticated || isPublicRoute ? ( */}
        <Outlet />
        {/* // ) : (
        //   <Navigate to="/login" />
        // )} */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
