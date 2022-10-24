import styles from './password-strength.module.scss'
import { useState } from 'react'
// import PassStrength from './PassStrength'
export default function PasswordStrength({ password,onChange }: { password: any,onChange: any }) {
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
  return (
    <div className={styles.strength}>    
      <input type="password" onChange={validatePassword} />
        <span className={`${styles.bar} ${strength>=1?styles.bar1:""}`}></span>
        <span className={`${styles.bar} ${strength>=2?styles.bar2:""}`}></span>
        <span className={`${styles.bar} ${strength>=3?styles.bar3:""}`}></span>
        <span className={`${styles.bar} ${strength>=4?styles.bar4:""}`}></span>
        <br/>
        <ul className={styles.showValidations}>
          {
            validations.map((validation,index)=>{
              return <li key={index} className={styles.invalid}>{validation}</li>
            })
          }
      
        </ul>
    </div>
  )
}
