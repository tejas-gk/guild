import Head from "next/head";
import Link from "next/link";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Errors from "components/Errors/Errors";
import { useState } from "react";
import useAuth from "hooks/useAuth";
import styles from "styles/pages/login/login.module.scss"
import style from 'components/PasswordStrength/password-strength.module.scss'
import GuestLayout from "@/components/Layouts/GuestLayout";
import PasswordStrength from "@/components/PasswordStrength/PasswordStrength";
import InputError from "@/components/Errors/InputErrors";
import { GitHub } from "react-feather";
import axios from "lib/axios";
export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setPasswordConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const { register, isLoading, user } = useAuth({
    middleware: "guests",
    redirectIfAuthenticated: "/",
  });

  const submitForm = async (event: any) => {
    event.preventDefault();
    console.log('errors',errors)
    register({ name, email, password,setErrors });
  };

  const handleChangePassword = (e:any)=>{
    setPassword(e.target.value)
  }
  
  return (
    <>
      <Head>
        <title>ergodnc — Register</title>
      </Head>
      <GuestLayout>
      <div className={`${styles.wrapper} dark:bg-gray-800`}>
        <Errors className={styles.errors} errors={errors} />

        <form onSubmit={submitForm} autoComplete="off" className={styles.form}>
          <div>
            <Label htmlFor="email" className='dark:text-white'>Name</Label>

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
              <InputError errors={errors.name} className="mt-2"  />
          </div>

          <div className="mt-4">
            <Label htmlFor="email" className='dark:text-white'>Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className={`${styles.input}`}
              onChange={(event: any) => setEmail(event.target.value)}
              required
              />
              <InputError messages={errors.email} className="mt-2" />
          </div>

          <div className="mt-4">
            <Label htmlFor="password" className='dark:text-white'>Password</Label>

            <Input
              id="password"
              type="password"
              value={password}
              className='block mt-1 w-full'
              onChange={handleChangePassword}
                required
                
              />
              <InputError messages={errors.password} className="mt-2"/>

          </div>

          <div className="mt-4">
            <Label htmlFor="password" className='dark:text-white'>Confirm Password</Label>

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
              <a className="underline text-sm text-gray-600 hover:text-gray-900 dark:text-white">
                Already registered?
              </a>
            </Link>

              <Button onClick={submitForm} className={`${styles.btn} ml-8 mb-2 dark:border dark:border-gray-100 
              dark:text-white
            `}>
              Register
              </Button>
              <span>
              <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/sign-in/github`}>
              <GitHub
                className="Oauth github ml-4 dark:text-white"
                size={24}
                strokeWidth={1.5}
                color="currentColor"
                  />
             </a>
        </span>
          </div>
        </form>
        
          <PasswordStrength
            password={password}
          />
      </div>
      </GuestLayout>
     

    </>
  );
}
