import React from 'react'
import {motion} from 'framer-motion'
export default function TrySomeThingNew() {
  return (
    <>
    <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    >
        Trying Some Thing New
    </motion.button>
    </>
  )
}



