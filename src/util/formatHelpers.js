import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export const getRandomLetter = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters[Math.floor(Math.random() * letters.length)];
};

export const generateRoomId = () => {
  let roomId = uuidv4()
    .replace(/-/g, "")
    .substring(0, 10)
    .replace(/(\w{3})(\w{4})(\w{3})/, "$1-$2-$3");

  roomId = roomId.replace(/\d/g, getRandomLetter);
  return roomId;
};

export const formatDate = (timestamp) => {
  return moment(timestamp).format("h:mm A, MMMM Do YYYY");
};


// format description
export const formatDescription = (description) => {
  if (!description || typeof description !== "string") {
    return "";
  }
  const maxLength = 30;
  const truncatedDescription =
    description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  return truncatedDescription;
};

// format salary
export const formatSalary = (minSalary, maxSalary) => {
  if (isNaN(minSalary) || isNaN(maxSalary)) {
    return `${minSalary} - ${maxSalary}`;
  } else {
    const millionMinSalary = minSalary;
    const millionMaxSalary = maxSalary;
    return `${millionMinSalary} - ${millionMaxSalary} triệu`;
  }
};

// format location
export const formatLocation = (location) => {
  if (typeof location !== "string") {
    return "";
  }
  const locations = location.split(",");
  if (locations.length > 1) {
    return `${locations[0]}, ...`;
  } else {
    return location;
  }
};
