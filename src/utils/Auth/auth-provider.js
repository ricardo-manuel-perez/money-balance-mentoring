import { useEffect } from 'react';
import {useQuery, useQueryClient} from 'react-query';
import { auth } from '../../services/firebase';

// export const UseProvideAuth = () => {

//   const [user, setUser] = useState(() => {
//     const localUser =  JSON.parse(localStorage.getItem("user"));
//     return localUser || undefined;
//   });

//   const provider = new GoogleAuthProvider();
//   provider.setCustomParameters({ prompt: 'select_account' });

//   const auth = getAuth();

//   function GoogleLogin() { 
//     return signInWithPopup(auth, provider)
//       .then((result) => {
//         let usr = result.user;
//         setUser(usr);
//         localStorage.setItem('user', JSON.stringify(usr));
//       }).catch((error) => {
//         console.log(error)
//       });
//   }

//   function Logout() {
//     return signOut(auth).then(() => {
//         setUser(undefined); 
//         localStorage.removeItem('user');
//     }).catch((error) => {
//         console.log(error);
//     })
//   }

//   return {
//     user,
//     GoogleLogin,
//     Logout
//   };
// }

export const UseProvideAuth = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const unsuscribeSession = auth.onAuthStateChanged((session) => {
      queryClient.setQueriesData('SESSION', session);
    });
    return () => unsuscribeSession();
  }, [])
  return useQuery('SESSION', () => new Promise(() => { }), {});
}