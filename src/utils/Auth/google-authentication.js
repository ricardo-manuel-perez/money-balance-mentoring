import { signInWithPopup, browserSessionPersistence, setPersistence, signOut } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../services/firebase';


export async function loginWithGoogle(onLoginSuccess) {
    try {
        // override google authentication default place to save session data
        await setPersistence(auth, browserSessionPersistence);
        const googleSession = await signInWithPopup(auth, googleAuthProvider);
        onLoginSuccess(googleSession);
    } catch (error) {
        console.error(error)
    }
}

export async function logout(onLogoutSuccess) {
    try {
        const googleSession = await signOut(auth);
        onLogoutSuccess(googleSession);
    } catch (error) {
        console.error(error)
    }
}