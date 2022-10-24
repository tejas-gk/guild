import Head from "next/head";
import Link from "next/link";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Errors from "components/Errors/Errors";
import { useState } from "react";
import useAuth from "hooks/useAuth";
import styles from "styles/pages/login/login.module.scss"
import PasswordStrength from "components/PasswordStrength/passwordStrength";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState([]);

  const { login, isLoading, user } = useAuth({ middleware: "guest" });
  const submitForm = async (event) => {
    event.preventDefault();
   
    login({ email, password, remember, setErrors });
  };

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
              onChange={(event:any) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
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
                                // onChange={event => setShouldRemember(event.target.checked)}
                            />

                            <span className={styles.remember_me__text}>
                                Remember me
                            </span>
                        </label>
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

        <PasswordStrength 
          password={password}
          onChange={setPassword}
        />
      </div>
    </>
  );
}
