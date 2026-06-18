import { getApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
    getAuth, getRedirectResult,
    signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// firebase-auth-init.js ya inicializó la app y registró window.__firebaseSignIn
const auth = getAuth(getApp());

let _dotnetRef = null;

function notifyDotnet(user) {
    if (!_dotnetRef) return;
    _dotnetRef.invokeMethodAsync("OnAuthChanged", user
        ? { uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL }
        : null);
}

export function init(dotnetRef) {
    _dotnetRef = dotnetRef;

    getRedirectResult(auth)
        .then(result => { if (result?.user) notifyDotnet(result.user); })
        .catch(() => {});

    onAuthStateChanged(auth, user => notifyDotnet(user));
}

export function signInGoogle() {
    window.__firebaseSignIn?.();
}

export async function signOutUser() {
    await signOut(auth);
}

export function getIdToken() {
    return auth.currentUser ? auth.currentUser.getIdToken() : Promise.resolve(null);
}
