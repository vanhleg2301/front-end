export const handleOpenFile = (fileURL) => {
  console.log("decodedURL:", fileURL);
  window.open(fileURL, "_blank");
};


export const getFileExtension = (fileURL) => {
  const decodedURL = decodeURIComponent(fileURL);
  // Lấy phần cuối cùng của URL bằng cách tách theo dấu /
  const fileNameWithParams = decodedURL.split("/").pop();

  // Lấy tên file từ phần cuối cùng của URL bằng cách tách theo dấu .
  const fileName = fileNameWithParams.split(".").slice(0, -1).join(".");

  return fileName;
};