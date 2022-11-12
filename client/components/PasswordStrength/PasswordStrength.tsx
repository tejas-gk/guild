import styles from './password-strength.module.scss'
import { useEffect, useState} from 'react'

export default function PasswordStrength({password}:any) {
  const [strength, setStrength] = useState(0)
  const [validations, setValidations] = useState<Array<string>>([])

  function validatePassword(e:any):number{
      let count = 0;
      password=e.target.value
      const validations = []
      if (password.length < 8) {
        validations.push('Password must be at least 8 characters')
        count++;
      }
      if (password.length > 20) {
        validations.push('Password must be less than 20 characters')
        count++;
      } 
      if (password.search(/[a-z]/i) < 0) {
        validations.push('Password must contain at least one letter.')
        count++;
      }
      if (password.search(/[0-9]/) < 0) {
        validations.push('Password must contain at least one digit.')
        count++;
      }
      if (password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0) {
        validations.push('Password must contain at least one special character.')
        count++;
      }
      setValidations(validations)
      setStrength(password.length)
      return count;
  }    
  useEffect(() => {
    setStrength(password.length)
    // validatePassword({target:{value:password}})
    // console.log('password', validations)   
  }, [password])
    
  return (
    
    <div className={styles.strength}>   
       {/* 
      TODO:
      - add validations to the password strength meter
      */}
        <span className={`${styles.bar} ${(strength>=1)? styles.bar1:""}`}></span>
        <span className={`${styles.bar} ${strength>=2? styles.bar2:""}`}></span>
        <span className={`${styles.bar} ${strength>=3? styles.bar3:""}`}></span>
        <span className={`${styles.bar} ${strength>=4? styles.bar4:""}`}></span>
        <br/>
        <ul className={`${styles.showValidations}`}>
          {
            validations.map((validation,index)=>{
              return (
                <div key={index}>
                  <li  className={`${styles.invalid} `}>{validation}</li>
                  </div>
              )
              
            })
          }
      
        </ul>
    </div>
  )
}
