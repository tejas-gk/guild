import React from 'react'
import ProfileLeft from '../../components/trySomethingNew/ProfileLeft'
import ProfileRight from '../../components/trySomethingNew/ProfileRight'
export default function profile() {
  return (
    <div>
      <div className="profile-left">
        <ProfileLeft />
      </div>
      <div className="profile-right">
        <ProfileRight />
      </div>
      
    </div>
  )
}
