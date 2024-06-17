import moment from "moment";

export const formatDate = (timestamp) => {
  return moment(timestamp).format("h:mm A");
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
    const millionMinSalary = minSalary / 1000;
    const millionMaxSalary = maxSalary / 1000;
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
