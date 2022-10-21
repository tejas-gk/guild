import {useState} from 'react'
import {motion} from 'framer-motion'
import BackDrop from './Backdrop'
import styles from './test.module.css'
// import '../../styles/globals.css'
const dropIn={
    hidden:{
        y:"-100vh",
        opacity:0
    },
    visible:{
        y:"200px",
        opacity:1,
        transition:{
            duration:0.1,
            type:'spring',
            damping:25,
            stiffness:500
        }
    },
    exit:{
        y:"-100vh",
        opacity:0
    }
}
export default function Modal({handleClose,text}) {
  return (
    <>
    <BackDrop 
    onClick={handleClose}
    >
    <motion.div
    drag
     onClick={(e)=>e.stopPropagation()}
    variants={dropIn}
    className={styles.modal}
    initial="hidden"
    animate="visible"
    exit="exit"
     >
     <p>{text}</p>
        <button onClick={handleClose}>close</button>
     </motion.div>
    </BackDrop>
    </>
  )
}
