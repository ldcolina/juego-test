import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const app = initializeApp({
    apiKey:     "AIzaSyBdl0YLsizKpAFg0i4RU2DeqkhCYDYjN9w",
    authDomain: "juegos-test.firebaseapp.com",
    projectId:  "juegos-test",
    appId:      "1:931269343574:web:21fc66ef6e605aaa9d3ef7"
});

const auth     = getAuth(app);
const provider = new GoogleAuthProvider();

// Llamado directamente desde onclick (gesto de usuario sincrónico)
// Popup funciona en móvil desde gesto directo; si es bloqueado usa redirect
window.__firebaseSignIn = () => {
    signInWithPopup(auth, provider).catch(err => {
        if (err.code === 'auth/popup-blocked' || err.code === 'auth/cancelled-popup-request') {
            signInWithRedirect(auth, provider);
        }
    });
};
