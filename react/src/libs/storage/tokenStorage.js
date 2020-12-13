import localstorage from "local-storage";

const keyToken = "TOKEN_KEY";
const keyCurrentUserID = "CURRENT_USER_ID";
const keyCurrentUserName = "CURRENT_USER_NAME";
const keyCurrentUserEmail = "CURRENT_USER_EMAIL";

/**
 * save the auth token
 * @param token
 */
export function saveToken(token) {
  localstorage.set(keyToken, token);
}

/**
 * Delete auth token
 * @return {*}
 */
export function clearToken() {
  return localstorage.remove(keyToken);
}

/**
 * Read info about current user name
 * @return {*}
 */
export function getCurrentUserName() {
  return localstorage.get(keyCurrentUserName);
}

/**
 * Save name of the current user
 * @return {*}
 */
export function setCurrentUserName(username) {
  localstorage.set(keyCurrentUserName, username);
}

/**
 * Remove name of the current user
 * @return {*}
 */
export function clearCurrentUserName() {
  localstorage.remove(keyCurrentUserName);
}

/**
 * Reads auth token
 * @return {*}
 */
export function getToken() {
  return localstorage.get(keyToken);
}

/**
 * Save info about current user
 * @param userID
 */
export function setCurrentUser(userID) {
  if (userID !== getCurrentUser()) {
    localstorage.set(keyCurrentUserID, userID);
  }
}

/**
 * Read info about current user
 * @return {*}
 */
export function getCurrentUser() {
  return localstorage.get(keyCurrentUserID);
}

/**
 * Clear info about current user
 * @return {*}
 */
export function clearCurrentUser() {
  return localstorage.remove(keyCurrentUserID);
}
/** ********************************************* */
export function setUserId(userID) {
  if (userID !== getCurrentUser()) {
    localstorage.set(keyCurrentUserID, userID);
  }
}

/**
 * Read info about current bot
 * @return {*}
 */
export function getUserId() {
  return localstorage.get(keyCurrentUserID);
}

/**
 * Clear info about current bot
 * @return {*}
 */
export function clearUserId() {
  return localstorage.remove(keyCurrentUserID);
}
/** ********************************************* */
export function setUserEmail(userID) {
  if (userID !== getCurrentUser()) {
    localstorage.set(keyCurrentUserEmail, userID);
  }
}

/**
 * Read info about current bot
 * @return {*}
 */
export function getUserEmail() {
  return localstorage.get(keyCurrentUserEmail);
}

/**
 * Clear info about current bot
 * @return {*}
 */
export function clearUserEmail() {
  return localstorage.remove(keyCurrentUserEmail);
}
