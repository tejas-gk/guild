import React from 'react'
import PasswordStrength from 'components/PasswordStrength/PasswordStrength'
export default function card() {
    const [password, setPassword] = React.useState('')
  return (
      <div>
          <input type="password" 
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrength
            password={password}
          />
    </div>
  )
}
