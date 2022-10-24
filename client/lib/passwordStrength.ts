import {useState,createContext} from 'react'

export const PasswordStrengthContext = createContext({})

export default function Validation({ password }:{password:string}) {
    const [strength, setStrength] = useState(0)
    const [validations, setValidations] = useState<Array<string>>([])
  
      function validatePassword(e){
        password = e.target.value
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
      }
    
      console.log(validations,strength)
    console.log('password', password)
    console.log('strength', strength)
    console.log('validations', validations)

    return{
        strength,
        validations,
        validatePassword

    }
}
