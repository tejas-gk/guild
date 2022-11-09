import {useState,useEffect} from 'react'
import {Dialog,Combobox,Transition,Fragment} from '@headlessui/react'
import {Search} from 'react-feather'
export default function CommandPallette({projects}) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  function onKeydown(e) {
    if(e.key==='b' && (e.ctrlKey || e.metaKey)) {
      setIsOpen(!isOpen)
    }
}
  useEffect(() => {
    window.addEventListener('keydown',onKeydown)
    return () => {
        window.removeEventListener('keydown',onKeydown)
    }
  },[isOpen])

  const filteredProjects = query ? 
  projects.filter(project => project.name.toLowerCase().includes(query.toLowerCase())) :
   []
  return (
    <Transition.Root
    show={isOpen} as={Fragment}
    afterLeave={() => setQuery('')}
    >
        <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 z-10 overflow-y-auto pt-[25vh] p-4"
        >
        <Transition.Child
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
        <Dialog.Overlay className="fixed inset-0 bg-gray-500/75 transition-opacity"/>
        </Transition.Child>
        <Transition.Child
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        >
        <Combobox 
        as='div' 
        onChange={(slug)=>{
            setIsOpen(false)
          
            window.location.href = `/${slug.url}`
        }}
        className="bg-white  mx-auto max-w-xl relative rounded-xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
        <div className='flex item-center pt-1'>
        {/* <Search className="h-6 w-6 text-gray-500"/> */}
        <Combobox.Input 
        className="w-full border-0 p-4 bg-transparent focus:ring-0 text-sm text-gray-800
        placeholder-gray-400 h-12 outline-none" 
        placeholder='search...'
        onChange={(e)=>setQuery(e.target.value)}
        />
     
        </div> 
        {filteredProjects.length > 0 && (
            
        <Combobox.Options static className='max-h-96 overflow-y-auto py-4 text-sm'> 
        {filteredProjects.map((project,index)=>(
            <Combobox.Option key={index} value={project}>
             {({active})=>(
            <div  className={` px-4 py-2 space-x-4 ${active ? 'bg-indigo-600' : 'bg-white'}`}>
            <span className={`font-medium text-gray-900 ${active ? 'text-white' : 'text-black'}`}>{project.name}</span>
            <span className={`text-gray-400 ${active ? 'text-white' : 'text-black'}`}>in {project.url!=''?project.url:'/'}</span>
            </div>
              )}
            </Combobox.Option>
        ))}
        </Combobox.Options>
        )}
        {
            query && filteredProjects.length === 0 && (
                <div className='text-sm text-gray-400 px-4 py-2'>
                    No results found
                
                </div>
            )
        }
        </Combobox>
        </Transition.Child>
        </Dialog>
    </Transition.Root>
  )
}
