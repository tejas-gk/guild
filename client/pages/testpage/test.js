import {useState} from 'react'
import TrySomeThingNew from 'components/TrySomeThingNew/TrySomeThingNew'
import {motion,AnimatePresence} from 'framer-motion'
import BackDrop from '../../components/trySomethingNew/Backdrop'
import Modal from '../../components/trySomethingNew/Modal'
import useModal from '../../hooks/useModal'
export default function test() {
  const [showModal,setShowModal]=useState(false)
  const {open,close,modalOpen}=useModal()
  return (
    <div>
<motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={()=>(modalOpen ? close() : open())}
    drag
    >
        Trying Some Thing New
    </motion.button>
    <AnimatePresence
    initial={false}
    exitBeforeEnter={true}
    onExitComplete={()=>null}
    >

    {modalOpen && <Modal handleClose={close} text="Hello World" modalOpen={modalOpen}  />}
    </AnimatePresence>
         {/* <Modal
          handleClose={()=>console.log("clicked")}
          text="hello"
        />  */}
        {/* <TrySomeThingNew /> */}
    </div>
  )
}
