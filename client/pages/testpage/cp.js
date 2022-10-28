import React from 'react'
import MenuItems from 'components/Menu/Menu'
import CommandPallette from '../../components/CommandPallette'
import { MoreHorizontal } from 'react-feather'
export default function cp() {
  return (
    <div>
      <MenuItems
      icon={<MoreHorizontal/>}
      />
    </div>
  )
}
