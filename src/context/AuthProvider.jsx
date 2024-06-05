import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo Context cho AuthProvider
const AuthContext = createContext();

// Hook tùy chỉnh để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra accessToken từ cookies ở đây và cập nhật trạng thái
    const accessTokenFromCookies = getAccessTokenFromCookies();
    setAccessToken(accessTokenFromCookies);
    setLoading(false);
  }, []);

  // Hàm kiểm tra accessToken từ cookies
  const getAccessTokenFromCookies = () => {
    // Thực hiện logic để lấy accessToken từ cookies
    // Ví dụ: sử dụng thư viện js-cookie
    return null; // Trả về null nếu không tìm thấy accessToken
  };

  const isAuthenticated = () => {
    // Trả về true nếu accessToken tồn tại và không null
    return accessToken !== null;
  };

  const logout = () => {
    // Thực hiện logic để xóa accessToken từ cookies
    // Ví dụ: sử dụng thư viện js-cookie
    setAccessToken(null);
  };

  // Trả về AuthContext.Provider để bọc children và cung cấp giá trị xác thực
  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
