export const handleOpenFile = (fileURL) => {
  console.log("decodedURL:", fileURL);
  window.open(fileURL, "_blank");
};
