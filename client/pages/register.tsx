import Head from "next/head";
import Link from "next/link";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Errors from "components/Errors/Errors";
import { useState } from "react";
import useAuth from "hooks/useAuth";
import styles from "styles/pages/login/login.module.scss"
export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setPasswordConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const { register, isLoading, user } = useAuth({ middleware: "guests" });

  const submitForm = async (event: any) => {
    event.preventDefault();
    register({ name, email, password, password_confirmation, setErrors });
  };

  return (
    <>
      <Head>
        <title>ergodnc — Register</title>
      </Head>

      <div className={`${styles.wrapper}`}>
        <Errors className={styles.errors} errors={errors} />

        <form onSubmit={submitForm} autoComplete="off" className={styles.form}>
          <div>
            <Label htmlFor="email">Name</Label>

            <Input
              id="name"
              type="text"
              value={name}
              className={`${styles.input}`}
              onChange={(event: any) => setName(event.target.value)}
              required
              autoFocus
              autoComplete="off"
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className={`${styles.input}`}
              onChange={(event: any) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              value={password}
              className={`${styles.input}`}
              onChange={(event: any) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="password">Confirm Password</Label>

            <Input
              id="password_confirmation"
              type="password"
              value={password_confirmation}
              className={`${styles.input}`}
              onChange={(event: any) =>
                setPasswordConfirmation(event.target.value)
              }
              required
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link href="/login">
              <a className="underline text-sm text-gray-600 hover:text-gray-900">
                Already registered?
              </a>
            </Link>

            <Button onClick={submitForm} className={`${styles.btn}`}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
