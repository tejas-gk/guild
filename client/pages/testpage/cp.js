import {useState} from 'react'


const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
];


export default function cp() {
  return (
    <div
      className="
    sidebar shadow-xl h-[100vh] w-64 bg-gray-800 text-white
    ">
      <div
        className="
      sidebar__inner flex flex-col gap-4
      ">
        <div className="sidebar__logo">import Image from 'next/image'</div>
        <div className="sidebar__nav">
          <nav className="nav">
            <ul
              className="
            nav__list flex flex-col gap-6 
            ">
              {navigation.map((item) => (
                <li key={item.name} className="nav__item">
                  <a
                    href="#"
                    className={`nav__link hover:text-white  hover:bg-gray-700
                    w-full p-2 rounded-sm flex items-center gap-2 transition-colors
                    ${
                      item.current ? 'nav__link--current' : ''
                    }`}>
                    {/* <span className='nav__icon'>{item.icon}</span> */}
                    <span className="nav__text">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
