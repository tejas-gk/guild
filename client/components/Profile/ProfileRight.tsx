import { Fragment, useState,useLayoutEffect } from 'react'
import { Tab } from '@headlessui/react'
import {motion} from 'framer-motion'
import axios from 'lib/axios'
import Card0 from '../Card/Card0'
import { log } from 'lib/log'
import useSWR from 'swr'
import Markdown from '../Markdown/Markdown'
import ReactMarkdown from 'react-markdown'
import { Dialog, Transition } from '@headlessui/react'
import Button from '../Button/Button'
import rehypeRaw from "rehype-raw";
import { useAuthStore } from 'store/AuthStore'
export default function ProfileRight({posts,user,votes=1,profileData,uid}) {
  const [isClicked, setIsClicked] = useState(false)
  const fetcher = (url) => axios.get(url).then((res) => res.data)
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${uid}`, fetcher, {
    refreshInterval: 1000, // 1 second
    revalidateOnFocus: false,
    suspense: true,
  })

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  // @ts-ignore
  const authenticatedUser = useAuthStore((state) => state?.token?.user?.id)
  const [authUserId, setAuthUserId] = useState<string | null>('')
  log(authenticatedUser, 'uid')
  useLayoutEffect(() => {
    setAuthUserId(authenticatedUser)
  },[])
  const storeProfileReadme = (e) => {
    e.preventDefault()
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update-profile`, {
      readme: e.target.readme.value,
    })
  }


  return (
    <div
      className="profile-right px-2 py-16 sm:px-0
     w-[120vh] mx-4
    ">
      <Tab.Group>
        <motion.div
          // animate={{
          //   x: isClicked ? 0 : 100,
          // }}
          onClick={() => {
            console.log('clicked');
            setIsClicked(!isClicked);
          }}>
          <Tab.List className="flex p-1 space-x-1 bg-gray-200 sticky top-0">
            <Tab
              className={({ selected }) =>
                `w-1/4 py-2.5 text-sm font-medium text-center rounded-md ${
                  selected
                    ? 'bg-white shadow  dark:text-black'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 '
                }
                `
              }>
              Overview
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-1/4 py-2.5 text-sm font-medium text-center rounded-md ${
                  selected
                    ? 'bg-white shadow dark:text-black'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 '
                }`
              }>
              Posts
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-1/4 py-2.5 text-sm font-medium text-center rounded-md ${
                  selected
                    ? 'bg-white shadow dark:text-black'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-black'
                }`
              }>
              Media
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-1/4 py-2.5 text-sm font-medium text-center rounded-md ${
                  selected
                    ? 'bg-white shadow dark:text-black'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-black'
                }`
              }>
              About
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="profile__main__body__posts mt-4 mr-2">
                <div className="profile__main__body__posts__post">
                  <div className="profile__main__body__photos mt-4 mr-2">
                    <div className="profile__main__body__photos__photo">    

                      {
                        (uid===authUserId) ? (
                        <div>
                      <button
                        type="button"
                        onClick={openModal}
                        className="rounded-md bg-purple-100 bg-blue-200 px-4 py-2 text-sm font-medium text-blue-800
                        hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 
                        focus-visible:ring-white focus-visible:ring-opacity-75
                        ml-[90%]
                        "
                        
                      >
                        Edit
                      </button>
                    
                       <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Readme
                  </Dialog.Title>
                  <div className="mt-2">
                                    <form onSubmit={storeProfileReadme}>
                                      <textarea
                                        name="readme"
                                        className="w-full h-96 p-2 border-2 border-gray-300 rounded-md"
                                        placeholder="Write something about yourself"
                                        defaultValue={data?.profile?.readme}
                                      />
                                      <button
                                      type="submit"
                                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                      onClick={closeModal}  
                                      >
                                        
                                        Save
                                      </button>
                                      
                                    </form>
                                        </div>
                                        
                                      </Dialog.Panel>
                                      
                                    </Transition.Child>
                                    
                                  </div>
                                  
          </div>
        </Dialog>
                      </Transition>
                          </div>
                        ) : (
                          <span></span>
                        )
                        
                            
                      }
                        <ReactMarkdown
                        
                        children={data?.profile?.readme}
                        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <pre {...props}>
                <code className={className}>{children}</code>
              </pre>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
                        }}
                        rehypePlugins={[rehypeRaw]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="profile__main__body__photos mt-4 mr-2">
                <div className="profile__main__body__photos__photo">
                  {posts.map((post,index) => (
                      <div key={index} className='mr-96'>
                          {/* {post?.post} */}
                          <Card0
                              text={post?.post}
                          id={post?._id} 
                        user={user}
                          />
                    </div>
                  ))} 

                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="profile__main__body__videos mt-4 mr-2">
                <div className="profile__main__body__videos__video">
                  <img
                    src="https://images.unsplash.com/photo-1662387709820-5ea1c001c67b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=406&q=80" />
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="profile__main__body__about mt-4 mr-2">
                <div className="profile__main__body__about__item">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime autem a expedita!
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </motion.div>
      </Tab.Group>
    </div>
  );
}



export const getServerSideProps = async (context) => {
  const userId = context.query;
  const res = await axios.get(`/user/${userId.profile}`);
  const data = await res.data;
  
  const profile = await axios.get(`/profile/${userId.profile}`)
  const profileData = await profile.data
  return {
    props: {
      user: data,
      profileData
      
    },
  };
};