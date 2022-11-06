import AuthCard from '@/components/Layouts/AuthCard'
// import AuthSessionStatus from '@/components/AuthSessionStatus'
import Button from '@/components/Button/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input/Input'
import InputError from '@/components/Errors/InputErrors'
import Label from '@/components/Label/Label'
import Link from 'next/link'
import useAuth  from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const PasswordReset = () => {
    const router = useRouter()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    // useEffect(() => {
    //     setEmail(router.query.email || '')
    // }, [router.query.email])

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            {/* <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" /> */}
                        </a>
                    </Link>
                }>
                {/* Session Status */}
                {/* <AuthSessionStatus className="mb-4" status={status} /> */}

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />

                        {/* <InputError messages={errors.email} className="mt-2" /> */}
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                        />

                        {/* <InputError messages={errors.password} className="mt-2" /> */}
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Label htmlFor="passwordConfirmation">
                            Confirm Password
                        </Label>

                        <Input
                            id="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                        />

                        {/* <InputError messages={errors.password_confirmation} className="mt-2" /> */}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button>Reset Password</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default PasswordReset
