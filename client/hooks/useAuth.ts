import useSWR from "swr";
import axios from "../lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useAuth({ middleware}: { middleware?: string } = {}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (user || error) {
      setIsLoading(false);
    }
    let token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    // if(token && currentUser){
    //   localStorage.removeItem("token");
    // }
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
  const register = ({
    name,
    email,
    password,
    password_confirmation,
    setErrors,
  }) => {
    csrf().then(() => {
      axios
        .post("/register", {
          name,
          email,
          password,
          password_confirmation,
        })
        .then((response) => {
          mutate(response.data.data);
          localStorage.setItem("token", response.data.access_token);
          console.log(response.data);
          console.log(localStorage.getItem("token"));
        })
        .then(() => router.push("/"))
        .catch((error) => {
          // setErrors(error.response.data.errors)
        });
    });
  };

  const login = async ({ setErrors, ...props }) => {
    setErrors([]);

    await csrf();

    axios
      .post("/login", props)
      .then(() => mutate())
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
      })
      .catch((error) => {
        if (error.response.status != 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const logout = async () => {
    await axios.post("/logout");

    mutate(null);

    localStorage.removeItem("token");
    router.push("/login");
  };

  const [authUser, setAuthUser] = useState("");
  const currentUser = () => {
    axios.get("current-user").then((response) => {
      JSON.stringify(response.data);
      setAuthUser(response.data.name);
      console.log(response.data);
    });
  };



  // let [passwordValid,setPasswordValid]=useState("")
  const [strength, setStrength] = useState(0)
  const [validations, setValidations] = useState<Array<string>>([])

    function validatePassword(e:any,pass){
        let password = e.target.value;
        let validations = []
        let strength = 0
        if(password.length < 8){
            validations.push("Password must be at least 8 characters")
        }else{
            strength += 1
        }
        if(password.match(/[A-Z]/)){
            strength += 1
        }else{
            validations.push("Password must contain at least one uppercase letter")
        }
        if(password.match(/[a-z]/)){
            strength += 1
        }else{
            validations.push("Password must contain at least one lowercase letter")
        }
        if(password.match(/[0-9]/)){
            strength += 1
        }else{
            validations.push("Password must contain at least one number")
        }
        if(password.match(/[!@#$%^&*]/)){
            strength += 1
        }else{
            validations.push("Password must contain at least one special character")
        }
        setStrength(strength)
        setValidations(validations)
        
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
    strength,
    setStrength,
    validations,
    setValidations,
    validatePassword
  };
}
