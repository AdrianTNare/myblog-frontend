import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { appConfig } from "../app/config";
import { defaultAuthUser } from "../app/fixtures/fixtures";
import { LoginInput, User } from "../app/types/types";

const Auth_Context_Key = "user";

interface IAuthContext {
  user: User | null;
  setAuth: (user: User | null) => void;
  ready: boolean;
}

interface APIResponse {
  ok: boolean;
  message: string;
  status: number;
}

const authContext = createContext<IAuthContext>({
  user: defaultAuthUser,
  setAuth: () => {
    //do nothing
  },
  ready: false,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [store, setStore] = useState<IAuthContext>({
    user: null,
    setAuth: (newUser: User | null) => {
      setStore((currentAuth) => ({
        ...currentAuth,
        user: newUser,
      }));
    },
    ready: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      let newAuthUser: User | null = defaultAuthUser;

      const authUserstring = window.localStorage.getItem(Auth_Context_Key);

      if (authUserstring) newAuthUser = JSON.parse(authUserstring);

      // could change to have expiration time stored wiht token in local storage,
      // and then check that value for expiration when we load the app
      if (newAuthUser?.authToken) {
        setStore((currentStore) => ({
          ...currentStore,
          user: newAuthUser ? newAuthUser : defaultAuthUser,
          ready: true,
        }));
      } else {
        setStore((currentStore) => ({
          ...currentStore,
          ready: true,
        }));
      }
    }
  }, []);
  //   console.log(store.user);

  return <authContext.Provider value={store}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  const authStore = useContext(authContext);
  const { push } = useRouter();

  const logout = () => {
    window.localStorage.removeItem(Auth_Context_Key);
    authStore.setAuth(null);
    push("/");
  };

  const login = async (LoginInput: LoginInput): Promise<APIResponse> => {
    try {
      const response = await fetch(`${appConfig.backendDomain}/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(LoginInput),
      });
      const data = await response.json();
      const { token } = data;

      if (!response.ok || !token) {
        throw new Error("failed to login!", {
          cause: { ok: response.ok, status: response.status },
        });
      }
      const updatedUser: User = {
        ...defaultAuthUser,
        authToken: token,
      };
      window.localStorage.setItem(
        Auth_Context_Key,
        JSON.stringify(updatedUser)
      );
      authStore.setAuth(updatedUser);
      return {
        ok: response.ok,
        message: response.statusText,
        status: response.status,
      };
    } catch (e: any) {
      window.localStorage.removeItem(Auth_Context_Key);
      authStore.setAuth(null);
      return {
        ok: false,
        message: e.cause ? e.cause.message : "login failed",
        status: e.cause ? e.cause.status : 500,
      };
    }
  };

  // to be implemented
  //   const refresh = async (LoginInput: LoginInput): Promise<APIResponse> => {};

  const update = async (newAuth: Partial<User>): Promise<User> => {
    const currentAuth = JSON.parse(
      window.localStorage.getItem(Auth_Context_Key) || "{}"
    );
    const updatedAuth: User = {
      ...currentAuth,
      ...newAuth,
    };
    window.localStorage.setItem(Auth_Context_Key, JSON.stringify(updatedAuth));
    authStore.setAuth(updatedAuth);
    return Promise.resolve(updatedAuth);
  };

  return {
    user: authStore.user,
    ready: authStore.ready,
    login,
    logout,
    update,
  };
};
