import SignInPage from "./Components/SiginInPage";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./HomePage";

function App() {
  //to protect private routes
  const PrivateRoute = ({ children }) => {
    const isAuth = localStorage.getItem("jwtToken");
    console.log(isAuth);
    return isAuth ? children : <Navigate to="/signin" />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />

          {/* Proteced Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
