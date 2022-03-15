import { useState } from 'react';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

export const useProvideAuth = () => {

  const [user, setUser] = useState(() => {
    const localUser =  JSON.parse(localStorage.getItem("user"));
    return localUser || undefined;
  });

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  const auth = getAuth();

  function GoogleLogin() { 
    return signInWithPopup(auth, provider)
      .then((result) => {
        let usr = result.user;
        setUser(usr);
        localStorage.setItem('user', JSON.stringify(usr));
      }).catch((error) => {
        console.log(error)
      });
  }

  function Logout() {
    return signOut(auth).then(() => {
        setUser(undefined); 
        localStorage.removeItem('user');
    }).catch((error) => {
        console.log(error);
    })
  }

  return {
    user,
    GoogleLogin,
    Logout
  };
}