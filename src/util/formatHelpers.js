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
export const formatSalary = (salary) => {
  if (isNaN(salary)) {
    return salary;
  } else {
    const millionSalary = salary / 1000000;
    return `${millionSalary} - triệu`;
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
