import MaterialDesign from 'material-design-lite';
import { initFirebase, waitForConversion, stopCheck } from './api/firebase-service';
import { initUI, setUploadProgress, displayDownloadURL } from './ui/upload';
import { store } from './redux/store';
import { LOGIN, SET_UPLOAD_PROGRESS, UPLOAD_COMPLETED, CONVERSION_COMPLETED } from './redux/action';
import { showUserImage } from './ui/userimage';

initFirebase();
initUI();

let processFlowListener = () => {
    let state = store.getState();
    let actionType = state.get('actionType');
    if (actionType === LOGIN) {
        showUserImage();
    }
    else if (actionType === SET_UPLOAD_PROGRESS) {
        setUploadProgress(state.get('progress'));
    }
    else if (actionType === UPLOAD_COMPLETED) {
        waitForConversion(state.get('sessionid'), state.get('filename'));
    }
    else if (actionType === CONVERSION_COMPLETED) {
        stopCheck(state.get('checkinterval'));
        displayDownloadURL(state.get('downloadurl'), state.get("convertedfilename"));
    }
}
store.subscribe(processFlowListener);
