// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./config";
// import { store } from "../store/store";
// import { fetchUserData, clearUser, setAuthInitialized } from "../store/slices/loginSlice";

// export const listenToAuthChanges = () => {
//   onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       const token = await user.getIdToken();
//       const email = user.email!;
//       await store.dispatch(fetchUserData({ email, token }));
//     } else {
//       store.dispatch(clearUser());
//     }
//     store.dispatch(setAuthInitialized());
//   });
// };
