import { useState,useEffect,Fragment } from "react";
import styles from "styles/profile.module.scss";
import {
  Camera,
  MapPin,
  Briefcase,
  Calendar,
  Gift,
  MoreHorizontal,
} from "react-feather";
// import NavBar from "components/NavBar/NavBar";
import SideBar from "components/SideBar/SideBar";
import useAuth from "hooks/useAuth";
import axios from "lib/axios";
import { Tab,Transition,Popover} from "@headlessui/react";
import Image from "next/image";
export default function profile() {
  /*
  * ! hey
  */
  return (
    <div className="profile">
     {/* <SideBar /> */}
      <div className="profile__main ">
        <div className="profile__main__header__banner h-1/4 ">
          <img 
          className={`profile__main__header__banner__img w-full object-cover max-h-64`}
          src="https://images.unsplash.com/photo-1666586364671-f4907c79b1dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
            
        </div>
        <div className="profile__main__header__profile">
          <img 
          className="profile__main__header__img rounded-full h-32 w-32 object-cover border-4 border-white -mt-16"
          src="https://images.unsplash.com/photo-1661347333298-26846cec680b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" 
          />
        </div>
        <div className="profile__main__header__info  w-1/2">
          <h1 className="profile__main__header__info__name text-2xl font-bold ml-9">
            User
          </h1>
          <h6 className="profile__main__header__info__username text-sm ml-9 font-light">
            @username
          </h6>
          <p className="profile__main__header__info__bio text-sm ml-9">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptas, quod, quia, voluptates quae voluptatibus quibusdam
          </p>
        </div>
        <div className='profile__follow__btn absolute right-0 mr-24 -mt-36'>
          <button className='profile__follow__btn__follow bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-white hover:text-black hover:border hover:border-black'>
            Follow
            </button>
        </div>
       <div className='profile__main__header__stats flex justify-between w-1/2'>
          <div className='profile__main__header__stats__item'>
            <Calendar />
            <div className='profile__main__header__stats__item__number text-md font-light'>28th may 2003</div>
          </div>
          <div className='profile__main__header__stats__item'>
            <Gift />
          <div className='profile__main__header__stats__item__number text-md font-light'>gifts</div>
          </div>
          <div className='profile__main__header__stats__item'>
            <Briefcase />
          <div className='profile__main__header__stats__item__number text-md font-semibold'>works @
          <span className="font-light">google </span></div>
            </div>
          <div className='profile__main__header__stats__item'>
            <MapPin />
          <div className='profile__main__header__stats__item__number text-md font-light'>mangalore</div>
            </div>
          <div className='profile__main__header__stats__item cursor-pointer'>
            <Popover className="relative">
              <Popover.Button className='focus:outline-none'>
                <MoreHorizontal />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Popover.Panel className="absolute z-10 right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Edit Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      >
                      Logout
                    </a>
                  </div>
                </Popover.Panel>
              </Transition>

            </Popover>
            </div>
      </div>
      </div>
      <div className="profile__main__body mt-14 ml-4 mr-4">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-gray-200">
            <Tab
              className={({ selected }) =>
                `w-1/4 py-2.5 text-sm font-medium text-center rounded-md ${
                  selected
                    ? "bg-white shadow"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              Posts
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-1/4 py-2.5 text-sm font-medium text-center rounded-md ${
                  selected
                    ? "bg-white shadow"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              Photos
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-1/4 py-2.5 text-sm font-medium text-center rounded-md ${
                  selected
                    ? "bg-white shadow"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              Videos
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-1/4 py-2.5 text-sm font-medium text-center rounded-md ${
                  selected
                    ? "bg-white shadow"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              About
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="profile__main__body__posts mt-4 mr-2">
                <div className="profile__main__body__posts__post">
                  <img
                    className="profile__main__body__posts__post__img"
                    src="https://images.unsplash.com/photo-1662387709820-5ea1c001c67b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=406&q=80"
                  />
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="profile__main__body__photos mt-4 mr-2">
                <div className="profile__main__body__photos__photo">
                  <img
                  src="https://stat2.bollywoodhungama.in/wp-content/uploads/2022/10/Kantara-1-306x393.jpg"
                  />
                  </div>
                </div>

              </Tab.Panel>
              <Tab.Panel>
                <div className="profile__main__body__videos mt-4 mr-2">
                  <div className="profile__main__body__videos__video">
                  <img 
                  src='https://images.unsplash.com/photo-1662387709820-5ea1c001c67b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=406&q=80'
                  />
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="profile__main__body__about mt-4 mr-2">
                  <div className="profile__main__body__about__item">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime autem a expedita!
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        

                
                  
      </div>
    </div>
  );
}
