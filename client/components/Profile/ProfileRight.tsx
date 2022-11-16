import { useState } from 'react'
import { Tab } from '@headlessui/react'
import {motion} from 'framer-motion'
import axios from 'lib/axios'
import Card0 from '../Card/Card0'
export default function ProfileRight({posts,user,votes=1}) {
  const [isClicked, setIsClicked] = useState(false)
  console.log('votes',votes)
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
                      <img src="https://stat2.bollywoodhungama.in/wp-content/uploads/2022/10/Kantara-1-306x393.jpg" />
                      <img src="https://stat2.bollywoodhungama.in/wp-content/uploads/2022/10/Kantara-1-306x393.jpg" />
                      <img src="https://stat2.bollywoodhungama.in/wp-content/uploads/2022/10/Kantara-1-306x393.jpg" />
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
  // const votes = await axios.get(`/vote/9`);
  // const votesData = await votes.data;
  return {
    props: {
      user: data,
      // votes:votesData,
      
    },
  };
};