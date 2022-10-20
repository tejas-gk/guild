import Head from "next/head";
import Link from "next/link";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Errors from "components/Errors/Errors";
import { useState } from "react";
import useAuth from "hooks/useAuth";
import "styles/login.module.css";

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
        <title>ergodnc — Login</title>
      </Head>

      <div className={"w-1/2 mx-auto bg-white p-5 rounded-lg"}>
        <Errors className="mb-5" errors={errors} />

        <form onSubmit={submitForm} autoComplete="off" className="login">
          <div>
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event) => setEmail(event.target.value)}
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
              className="block mt-1 w-full"
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <Button className="ml-3">Login</Button>
        </form>
      </div>
    </>
  );
}
