/*
 * action types
 */

export const CREATE_SESSION_ID = 'CREATE_SESSION_ID';
export const SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS';
export const UPLOAD_COMPLETED = 'UPLOAD_COMPLETED';
export const CONVERSION_COMPLETED = 'CONVERSION_COMPLETED';
export const LOGIN = 'LOGIN';


/*
 * action creators
 */

export function createCreateSessionIdAction(uuid) {
  return { type: CREATE_SESSION_ID, uuid }
}

export function createSetUploadProgressAction(progress) {
  return { type: SET_UPLOAD_PROGRESS, progress }
}

export function createUploadCommpletedAction(filename) {
    return { type: UPLOAD_COMPLETED, filename}
}

export function createLoginAction() {
  return { type: LOGIN }
}

export function createConversionCompletedAction(downLoadURL, convertedFilename, checkInterval) {
  return { type: CONVERSION_COMPLETED, downLoadURL, convertedFilename, checkInterval}
}