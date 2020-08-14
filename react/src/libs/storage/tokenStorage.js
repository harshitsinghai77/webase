import localstorage from 'local-storage'

const keyToken = 'TOKEN_KEY';
const keyCurrentUserID = 'CURRENT_USER_ID';
const keyCurrentUserEmail = 'CURRENT_USER_EMAIL';

/**
 * save the auth token
 * @param token
 */
export function saveToken(token) {
  localstorage.set(keyToken, token);
}

/**
 * Reads auth token
 * @return {*}
 */
export function getToken() {
  return localstorage.get(keyToken);
}

/**
 * Delete auth token
 * @return {*}
 */
export function deleteToken() {
  return localstorage.removeItem(keyToken);
}

/**
 * Save info about current bot
 * @param userID
 */
export function setCurrentUser(userID) {
  if (userID !== getCurrentUser()) {
    localstorage.set(keyCurrentUserID, userID);
  }
}

/**
 * Read info about current bot
 * @return {*}
 */
export function getCurrentUser() {
  return localstorage.get(keyCurrentUserID);
}

/**
 * Clear info about current bot
 * @return {*}
 */
export function clearCurrentUser() {
  return localstorage.removeItem(keyCurrentUserID);
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
  return localstorage.removeItem(keyCurrentUserID);
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
  return localstorage.removeItem(keyCurrentUserEmail);
}
