import { LOGIN, SET_UPLOAD_PROGRESS, UPLOAD_COMPLETED, CREATE_SESSION_ID, CONVERSION_COMPLETED } from "./action";

import { Map } from 'immutable';


export const initialState = Map({
    progress: 0,
    sessionid: '',
    actionType: '',
    uploadCompleted: false,
    filename: '',
    downloadurl: '',
    checkinterval: null,
    convertedfilename: ''
});

export function DesignConverterApp(state = initialState, action) {
    let newState = state;

    switch (action.type) {
        case SET_UPLOAD_PROGRESS:
            newState = newState.set('progress', action.progress);
            break;
        case UPLOAD_COMPLETED:
            newState = newState.set('uploadCompleted', true)
            newState = newState.set('filename', action.filename);
            break;
        case CREATE_SESSION_ID:
            newState = newState.set('sessionid', action.uuid);
            break;
        case LOGIN:
            newState = state.set('loggedin', true);
            break;
        case CONVERSION_COMPLETED:
            newState = state.set('downloadurl', action.downLoadURL);
            newState = newState.set('checkinterval', action.checkinterval);
            newState = newState.set('convertedfilename', action.convertedFilename);
            break;
        default:
            break;
    }
    return newState.set('actionType', action.type);
}
