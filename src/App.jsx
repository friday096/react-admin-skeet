import { useLocation } from "react-router-dom";
import Layout from "./layouts/Layout";
import AppRoutes from "./router/AppRoutes";
import { Blank } from "./layouts/Blank";
import ProtectedRoute from './router/ProtectedRoute';
// import { useAuth } from './context/AuthContext'; // Make sure this is correctly imported

function App() {
  return <AppRoutesWrapper />;
}

const AppRoutesWrapper = () => {
  const location = useLocation();
  // const { isAuthenticated } = useAuth();
  const isAuthPath = location.pathname.includes("auth") || location.pathname.includes("error") || location.pathname.includes("under-maintenance") || location.pathname.includes("blank");

  return (
    <>
      {isAuthPath ? (
        <AppRoutes>
          <Blank />
        </AppRoutes>
      ) : (
        <Layout>
          <ProtectedRoute>
            <AppRoutes />
          </ProtectedRoute>
        </Layout>
      )}
    </>
  );
};

export default App;
