import Cookies from 'js-cookie';

/**
 * Update user information in cookies
 * @param {Object} updatedUserInfo - The updated user information object
 */
export const updateUserInfoInCookies = (updatedUserInfo) => {
  // Convert the user information object to a JSON string
  const userInfoString = JSON.stringify(updatedUserInfo);

  // Update the user information in cookies
  Cookies.set('user', userInfoString, { expires: 7 }); // Set cookie to expire in 7 days
};

/**
 * Update access token in cookies
 * @param {string} accessToken - The new access token
 */
export const updateAccessTokenInCookies = (accessToken) => {
  // Update the access token in cookies
  Cookies.set('accessToken', accessToken, { expires: 7 }); // Set cookie to expire in 7 days
};
