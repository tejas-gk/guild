import React from 'react'

export default function Icon({
    icon,
    size,
}) {
  return (
      <div className='flex flex-row gap-2'>
          {icon}
            <span className='text-sm'>{size}</span>
      </div>
      
  )
}
