import useSWR from "swr";
import axios from "../lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState,useCallback} from "react";
import { AuthInterface } from "@/setup/Interfaces/AuthInterface";
import { useAuthStore } from "store/AuthStore";
import { log } from "lib/log";
export default function useAuth({ middleware, redirectIfAuthenticated}:AuthInterface = {}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (user || error) {
      setIsLoading(false);
    }
    let token = localStorage.getItem("token");
        console.log(useAuthStore.getState(),'z')
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    if (middleware === 'guest' && redirectIfAuthenticated && user) router.push(redirectIfAuthenticated)
    if (middleware === "guest" && token) {
    router.push("/");
    }
    if (middleware === "auth" && !token) {
      router.push("/login");
    }

    console.log("token", token);
  }, []);

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/user", () =>
    axios.get("/user").then((response) => response.data.data)
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");
  const register =async  ({
    name,
    email,
    password,
    setErrors,
  }) => {
    await csrf();
    setErrors([])
    
    axios
      .post("/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        mutate(response.data.data);
        localStorage.setItem("token", response.data.access_token);
        log(response.data)
        log(localStorage.getItem("token"));
        useAuthStore.setState({ users: response.data})

      })
        .then(() => router.push("/")) 
        .catch((error) => {
          if(error.response.status !== 422)  throw error
          setErrors(error.response.data.errors)
        });
    
  };

  const login = async ({email,password,setStatus, setErrors, ...props }) => {
    setErrors([]);
    await csrf();
    setErrors([])
    setStatus(null)

    axios
        .post('/login',{
            email,
            password
        })
        .then((response) => {
            mutate(response.data.data);
            localStorage.setItem("token", response.data.access_token);
            log(response.data);
            log(localStorage.getItem("token"));
        })
        .then(() => console.log('jdei'))
        .catch(error => {
            console.log(error)
        })
  };

  const logout = useCallback(async () => {
    await axios.post("/logout");
    mutate(null);
    localStorage.removeItem("token");
    router.push("/login");
  }, []);


  const [authUser, setAuthUser] = useState("");
  const currentUser = () => {
    axios.get("current-user").then((response) => {
      JSON.stringify(response.data);
      setAuthUser(response.data.name);
      log(response.data);
    });
  };

  const forgotPassword = async ({
    email, 
    setErrors, 
    setStatus
  }) => {
    await csrf()
    setErrors([])
    setStatus(null)
    axios
      .post("/forgot-password", { email })
      .then(response => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status != 422) throw error;
      })
    };

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
      await csrf()
      setErrors([])
      setStatus(null)

      axios
          .post('/reset-password', { token: router.query.token, ...props })
          .then(response => router.push('/login?reset=' + btoa(response.data.status)))
          .catch(error => {
              if (error.response.status !== 422) throw error

              setErrors(error.response.data.errors)
          })
     
  }


  const resendEmailVerification = ({ setStatus }) => {
    axios
        .post('/verify-email')
        .then(response => setStatus(response.data.status))
}

  
  return {
    user,
    csrf,
    login,
    logout,
    isLoading,
    register,
    currentUser,
    authUser,
    forgotPassword,
    resetPassword,
    resendEmailVerification
  };
}

