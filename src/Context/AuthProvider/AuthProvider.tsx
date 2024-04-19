// Import necessary modules and interfaces
import { createContext, ReactNode, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../../Firebase/Firebase.config";

// Define the AuthInfo interface
export interface AuthInfo {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<User>; // Corrected return type
  login: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

// Define the AuthContextType interface
export interface AuthContextType {
  authInfo: AuthInfo;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType>({
  authInfo: {
    user: null,
    loading: true,
    createUser: async () => {
      throw new Error("createUser function not implemented");
    },
    login: async () => {},
    logOut: async () => {},
  },
});

// Define the AuthProviderProps interface
interface AuthProviderProps {
  children: ReactNode;
}

// Initialize Firebase authentication instance
const auth = getAuth(app);

// Define the AuthProvider component
const AuthProvider = ({ children }: AuthProviderProps) => {
  // Define state variables for user and loading status
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Define createUser function
  const createUser = async (email: string, password: string): Promise<User> => {
    setLoading(true); // Set loading to true during user creation
    try {
      // Attempt to create user with Firebase auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user; // Retrieve the newly created user
      setUser(newUser); // Set the newly created user to state
      setLoading(false); // Set loading to false after user creation
      return newUser; // Return the newly created user
    } catch (error) {
      console.error("Error creating user:", error); // Log any errors during user creation
      throw error; // Throw the error to propagate it
    }
  };

  // Define login function
  const login = async (email: string, password: string) => {
    setLoading(true); // Set loading to true during login
    try {
      // Attempt to sign in with Firebase auth
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false); // Set loading to false after successful login
    } catch (error) {
      console.error("Error logging in:", error); // Log any errors during login
      throw error; // Throw the error to propagate it
    }
  };

  // Define logOut function
  const logOut = async () => {
    setLoading(true); // Set loading to true during logout
    try {
      // Attempt to sign out with Firebase auth
      await signOut(auth);
      setUser(null); // Set user to null after successful logout
      setLoading(false); // Set loading to false after successful logout
    } catch (error) {
      console.error("Error logging out:", error); // Log any errors during logout
      throw error; // Throw the error to propagate it
    }
  };

  // useEffect hook to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state based on authentication state changes
      setLoading(false); // Set loading to false once authentication state is determined
    });

    // Cleanup function to unsubscribe from authentication state changes
    return () => {
      unsubscribe();
    };
  }, []);

  // Define authInfo object containing user, loading status, and authentication functions
  const authInfo: AuthInfo = { user, loading, createUser, login, logOut };

  // Provide authInfo to components in the tree via AuthContext
  return (
    <AuthContext.Provider value={{ authInfo }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider; // Export the AuthProvider component
