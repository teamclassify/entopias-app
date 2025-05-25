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
  const [, setError] = useState(null);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const registerWithEmail = async (email, password, name, birthdate) => {
    setName(name);
    setBirthday(birthdate);

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
          setName("");
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

    if (response && !response.error) {
      setUser({
        ...user,
        name: response.data.name,
        photo: response.data.photo,
        email: response.data.email,
        id: response.data.id,
        gender: response.data.gender,
        phone: response.data.phone,
        roles: response.data.roles?.map(({ role }) => role.name),
      });

      setError(null);
    } else {
      setUser(null);
    }
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
          birthday: user.birthdate || "",
        };

        const token = await user.getIdToken(true);

        setAccessToken(token);
        setUser(userInfo);
        setLoggedIn(true);
      } else {
        setLoading(false);
        setLoggedIn(false);
      }
    });

    return () => {
      unsuscribeStateChanged();
    };
  }, []);

  //console.log(accessToken);

  // useEffect(() => {
  //   if (error) toast(error);
  // }, [error]);

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken && user) {
        await handleLogin({
          name: name || user.name,
          birthday: birthday || user.birthday,
          email: user.email,
          photo: user.photo,
          id: user.id,
          roles: [],
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
      setUser,
      handleLogin,
      loginWithGoogle,
      logout,
      loading,
      registerWithEmail,
      loginWithEmail,
      isAdmin,
      selectedAddress,
      setSelectedAddress,
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user, loading, selectedAddress]);

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
