import { createContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";

import { auth } from "../config/firebase";
import { login } from "../services/api/Auth";
import {
  logoutUser,
  signInGoogle,
  signInWithEmail,
  signUpWithEmailAndPassword,
} from "../services/firebase";
import { formatEmail } from "../utils/formatUser";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [, setLocation] = useLocation();
  const [loggedIn, setLoggedIn] = useState();
  const [accessToken, setAccessToken] = useState();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerWithEmail = async (email, password) => {
    return signUpWithEmailAndPassword(email, password).then((res) => {
      return res;
    });
  };

  const loginWithEmail = async (email, password) => {
    return signInWithEmail(email, password).then((res) => {
      return res;
    });
  };

  const loginWithGoogle = async () => {
    setLoading(true);

    return signInGoogle()
      .then((res) => {
        setLoading(false);

        if (res.status === 404) {
          return;
        }

        return res;
      })
      .finally(() => {
        setLocation("/");
        setLoading(false);
      });
  };

  const logout = async () => {
    setLoading(true);

    return logoutUser()
      .then((res) => {
        if (res.status === 200) {
          setUser(null);
          setLocation("/");
          setLoading(false);
          setToken(null);
          setAccessToken(undefined);
          setLoggedIn(undefined);

          // reload page
          window.location.reload();
        }

        return res;
      })
      .finally(() => setLoading(false));
  };

  /*
   * on login update or create user in firestore database
   */
  const handleLogin = async (userInfo) => {
    const response = await login(userInfo);
    console.log(response);

    if (response && !response.error) {
      setUser({
        ...user,
        name: response.data.name,
        photo: response.data.photo,
        email: response.data.email,
        id: response.data.id,
        gender: response.data.gender,
        phone: response.data.phone,
      });
    } else setUser(null);
  };

  useEffect(() => {
    const unsuscribeStateChanged = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userInfo = {
          email: user.email,
          id: user.uid,
          name:
            user.displayName && user.displayName?.length > 0
              ? user.displayName
              : formatEmail(user.email || ""),
          photo: user.photoURL || "",
          roles: [],
          emailVerified: user.emailVerified,
        };

        const token = await user.getIdToken(true);

        console.log(userInfo);

        setAccessToken(token);
        setUser(userInfo);
        setLoggedIn(true);
        // setLoading(false);
      } else {
        setLoading(false);
        setLoggedIn(false);
      }
    });

    return () => {
      unsuscribeStateChanged();
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken && user) {
        await handleLogin({
          name: user.name,
          email: user.email,
          photo: user.photo,
          id: user.id,
          // rolesAll: user?.roles || [],
          // roles: user.roles?.map((role) => ROLES[role.roleId]),
        });

        setToken(accessToken);
      }
      setLoading(false);
    };

    if (loggedIn !== undefined) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, accessToken]);

  const isAdmin =
    user?.roles?.includes("admin") || user?.roles?.includes("sales") || false;

  const value = useMemo(() => {
    return {
      token,
      user,
      handleLogin,
      loginWithGoogle,
      logout,
      loading,
      registerWithEmail,
      loginWithEmail,
      isAdmin,
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user, loading]);

  return (
    <UserContext.Provider value={value}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Cargando...</p>
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
}
