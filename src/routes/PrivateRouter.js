/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Spin } from "antd";
import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const [isLogin, setIsLogin] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuthToken = () => {
      const token = window.localStorage.getItem("auth_token");
      setIsLogin(token !== null);
    };

    checkAuthToken();
  }, [location]);

  const content = <div style={{ padding: "50px" }} />;
  if (isLogin === null) {
    return (
      <Flex align="center" justify="center" style={{ height: "100vh" }}>
        <Spin size="large" tip="Đang tải">
          {content}
        </Spin>
      </Flex>
    );
  }

  return <>{isLogin ? <Outlet /> : <Navigate to="/login" />}</>;
}
