// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCQy0HWEBabaVOseigqfWnQ5nnWYFjW8Rk",
  authDomain: "ta-moble.firebaseapp.com",
  databaseURL: "https://ta-moble-default-rtdb.firebaseio.com",
  projectId: "ta-moble",
  storageBucket: "ta-moble.firebasestorage.app",
  messagingSenderId: "797370448470",
  appId: "1:797370448470:web:fd13c3be30c0581c5f59f7",
  measurementId: "G-M4JEWN6DXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Auth functions
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// Database functions dengan user ID otomatis
export const getAddress = async (setAddress) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user logged in");
    return;
  }

  try {
    const addressRef = ref(database, `addresses/${user.uid}`);
    const snapshot = await get(addressRef);
    
    if (snapshot.exists()) {
      setAddress(snapshot.val());
    } else {
      setAddress(null);
    }
  } catch (error) {
    console.error("Error getting address: ", error);
    setAddress(null);
  }
};

export const updateAddress = async (addressData) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user logged in");
    return false;
  }

  try {
    const addressRef = ref(database, `addresses/${user.uid}`);
    await set(addressRef, {
      ...addressData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error updating address: ", error);
    return false;
  }
};

export const deleteAddress = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user logged in");
    return false;
  }

  try {
    const addressRef = ref(database, `addresses/${user.uid}`);
    await remove(addressRef);
    return true;
  } catch (error) {
    console.error("Error deleting address: ", error);
    return false;
  }
};

export { auth, database };