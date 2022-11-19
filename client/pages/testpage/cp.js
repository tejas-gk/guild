import { useState } from 'react'
import {useAuthStore} from '../../store/AuthStore'
export default function cp() {
  const user = useAuthStore(state => state.users)
  // eye move according to mouse position
  const [eye, setEye] = useState({ x: 0, y: 0 })
  const handleMouseMove = e => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    const x = (clientX / innerWidth) * 100
    const y = (clientY / innerHeight) * 100
    setEye({ x, y })
    console.log(eye)
  }

  return (
    <div className="ml-96">
      <span
        className="
      text-2xl font-bold linear-gradient text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500
     animate-bounce
      ">
        user :{user.access_token}
      </span>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
           // increment the count
          useAuthStore.setState({ bears: 'tejas gk'})
  
        }}>
        Click me
      </button>


      {/* eye that follows user */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="eye_lashes">
          <div className="eye_lashes_inner"></div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            onMouseMove={handleMouseMove}
          />
        </svg>
      </div>
    </div>
  );
}
