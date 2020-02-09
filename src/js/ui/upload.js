import { upLoadImage } from "../api/firebase-service";

export function initUI() {

    document.getElementById("bt_convert").addEventListener('click', (e) => {
        upLoadImage( document.getElementById('addimage').files[0]);
    });
}

export function setUploadProgress(progress) {
    document.getElementById("uploadprogress").MaterialProgress.setProgress(progress);
}

export function displayDownloadURL(url, filename) {
    document.getElementById('downloadurl').innerHTML="<a href=" + url + ">" + filename + "</a>";
}

export function showConvertCard() {
    document.getElementById('convertcard').classList.remove('hidden');
}