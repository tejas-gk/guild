import Head from "next/head";
import Link from "next/link";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Errors from "components/Errors/Errors";
import { useState,useContext, useEffect } from "react";
import useAuth from "hooks/useAuth";
import styles from "styles/pages/login/login.module.scss"
import style from 'components/PasswordStrength/password-strength.module.scss'
import PasswordStrength from "components/PasswordStrength/PasswordStrength";
import { useRouter } from 'next/router'
export default function Login() {
  const router = useRouter()


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [strength, setStrength] = useState(0)
  const [validations, setValidations] = useState<Array<string>>([])
  const [status, setStatus] = useState(null)

  const { login, isLoading, user } = useAuth({ middleware: "guest",  redirectIfAuthenticated: '/dashboard'});
   
  useEffect(() => {
    if (router.query.reset?.length > 0 && errors.length === 0) {
        setStatus(' You can now login.')
    } else {
        setStatus(null)
    }
})

  function validatePassword(e:any){
    setPassword(e.target.value)
    const validations = []
    if (password.length < 8) {
      validations.push('Password must be at least 8 characters')
    }
    if (password.length > 20) {
      validations.push('Password must be less than 20 characters')
    } 
    if (password.search(/[a-z]/i) < 0) {
      validations.push('Password must contain at least one letter.')
    }
    if (password.search(/[0-9]/) < 0) {
      validations.push('Password must contain at least one digit.')
    }
    if (password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0) {
      validations.push('Password must contain at least one special character.')
    }
    setValidations(validations)
    setStrength(password.length)
    console.log(password)
  }
  

  const submitForm = async (event) => {
    event.preventDefault();
    console.log('email', email)
    login({
      email,
      password,
      setErrors,
      setStatus,
    });

  };
  const handleChangePassword = (e:any)=>{
    validatePassword(e)
    // console.log('password', password,strength,validations)
    setPassword(e.target.value)
  }
  if (isLoading || user) {
    return <>fuck load man...</>;
  }

  return (
    <>
      <Head>
        <title>Guild — Login</title>
      </Head>

      <div className={`${styles.wrapper}`}>
        <Errors className={styles.errors} errors={errors} />

        <form onSubmit={submitForm} autoComplete="off" className={styles.form}>
          <div>
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className={`${styles.input}`}
              onChange={(event:any) => {setEmail(event.target.value) 
                console.log('email', email)
              }}
              required
              autoFocus
              autoComplete="off"
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              value={password}
              className={`${styles.input}`}
              onChange={handleChangePassword}
              required
              autoComplete="current-password"
            />
          </div>

          <div className={styles.remember_me}>
                        <label
                            htmlFor="remember_me"
                            className={styles.remember_me__checkbox__wrapper}>
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className={styles.remember_me__checkbox}
                               
                            />

                            <span className={styles.remember_me__text}>
                                Remember me
                            </span>
                        </label>
                    </div>
                  
<div className="mt-4">
          <Link href="/forgot-password">
            <a>Forgot password?</a>
          </Link>
        </div>
          <div style={{
            marginTop: "1rem"
            }}>
            do not have a account?<Link href="/register">
              <a>
                Register
              </a>
            </Link>
            </div>
          <Button className={`${styles.btn}`}>Login</Button>
        </form>

        <div className={style.strength}>
        <span className={`${style.bar} ${strength>=1?style.bar1:""}`}></span>
        <span className={`${style.bar} ${strength>=2?style.bar2:""}`}></span>
        <span className={`${style.bar} ${strength>=3?style.bar3:""}`}></span>
        <span className={`${style.bar} ${strength>=4?style.bar4:""}`}></span>
        <br/>
        <ul className={style.showValidations}>
          {
            validations.map((validation,index)=>{
              return <li key={index} className={style.invalid}>{validation}</li>
            })
          }
      
        </ul>
    </div>


      </div>
    </>
  );
}
