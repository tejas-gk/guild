import React from 'react'
import ProfileLeft from '../../components/trySomethingNew/ProfileLeft'
import ProfileRight from '../../components/trySomethingNew/ProfileRight'
export default function profile() {
  return (
    <div className='flex flex-row'>
      <div className='banner w-full -z-30 
      bg-gradient-to-r from-blue-400 to-blue-600 h-64 absolute border border-radius-2xl
      '>
        </div>
      <div className="profile-left border border-black w-1/3">
        <ProfileLeft />
      </div>
      <div className="profile-right
      mx-12 mt-36 w-full  px-2 py-16 sm:px-0
      ">
        <ProfileRight />
      </div>
      
    </div>
  )
}
