import GuestLayout from '../components/Layouts/GuestLayout';
import AuthCard from '../components/Layouts//AuthCard';
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import axios from '../lib/axios'
import Label from '@/components/Label/Label';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import InputError from '@/components/Errors/InputErrors';
import AuthSessionStatus from '@/components/Status/AuthSessionStatus';

export default function forgot_password() {
    const { forgotPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(false)

    const submitForm = event => {
        event.preventDefault()
        setStatus(true)
        forgotPassword({ email, setErrors, setStatus })
        console.log('status', status)
    }

  return (
    <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            yay
                        </a>
                    </Link>
                }>

                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </div>

                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status='Email sent' />

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />

                        {/* <InputError messages={errors.email} className="mt-2" /> */}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button>Email Password Reset Link</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
  )
}
