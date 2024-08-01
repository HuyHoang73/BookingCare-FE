/* eslint-disable react-hooks/exhaustive-deps */
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
    const [isLogin, setIsLogin] = useState(null); // Sử dụng null để phân biệt giữa trạng thái chưa kiểm tra và trạng thái đã kiểm tra
    const location = useLocation();
  
    useEffect(() => {
      const checkAuthToken = () => {
        const token = window.localStorage.getItem("auth_token");
        setIsLogin(token !== null);
      };
  
      checkAuthToken();
    }, [location]);

  if (isLogin === null) {
    return (
      <div>
        <Spin indicator={<FontAwesomeIcon icon={faSpinner} />} />
      </div>
    );
  }

  return <>{isLogin ? <Outlet /> : <Navigate to="/login" />}</>;
}
