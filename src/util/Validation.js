
export const validateFullName = (fullName) => {
  if (!fullName) {
    return "Full Name is required";
  }
  // Example validation (you can adjust as per your requirements)
  if (/[^a-zA-Z\s]/.test(fullName)) {
    return "Họ và tên chỉ được chứa các ký tự chữ và khoảng trắng";
  }
  return "";
};

export const validateUsername = (username) => {
  if (!username) {
    return "Username is required";
  }
  // Example validation (you can adjust as per your requirements)
  if (/[^a-zA-Z\s]/.test(username)) {
    return "Tên chỉ được chứa các ký tự chữ và khoảng trắng";
  }
  return "";
};

export const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  }
  // Example validation with regex (adjust as needed)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Email không hợp lệ";
  }
  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6 || password.length > 25) {
    return "Mật khẩu phải có từ 6 đến 25 ký tự";
  }
  return "";
};

export const validatePhone = (phone) => {
  if (!phone) {
    return "Phone number is required";
  }
  // Example validation (you can adjust as per your requirements)
  const phoneRegex = /^[0-9]{10}$/; // Example: 10-digit number
  if (!phoneRegex.test(phone)) {
    return "Phone number must be a 10-digit number";
  }
  return "";
};
