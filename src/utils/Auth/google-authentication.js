import { signInWithPopup, browserSessionPersistence, setPersistence } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../services/firebase';


export async function loginWithGoogle(onLoginSuccess) {
    try {
        // override google authentication default place to save session data
        await setPersistence(auth, browserSessionPersistence);
        //const googleSession = 
        await signInWithPopup(auth, googleAuthProvider);
        onLoginSuccess();
    } catch (error) {
        console.error(error)
    }
}