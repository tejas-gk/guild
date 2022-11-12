import Navbar from 'components/Navbar/Navbar';
import ProfileLeft from 'components/Profile/ProfileLeft';
import ProfileRight from 'components/Profile/ProfileRight';
import useAuth from 'hooks/useAuth';
import axios from 'lib/axios';
import {useEffect,useRef} from 'react';
export default function profile({ user, userId }) {
  const { authUser}=useAuth({middleware: 'auth'});
  

  

  return (
      <div className="profile">
          {/* <Sidebar /> */}
      <Navbar />
      
      <div className="flex flex-row">
        <div
          className="banner w-full -z-30 
      bg-gradient-to-r from-blue-400 to-blue-600 h-64 absolute border border-radius-2xl
      "></div>
        <div className="profile-left border border-black w-1/3">
                  <ProfileLeft
                      name={user.name}
                      username={user.email}
                      bio='hello world'
                      id={user.id}
                  />
        </div>
        <div
          className="profile-right
      mx-12 mt-36 w-full  px-2 py-16 sm:px-0
      ">
          <ProfileRight 
            posts={user.posts}
            user={user.name}
                  />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const userId= context.query
  const res = await axios.get(`/user/${userId.profile}`);
  const data = await res.data;
  
  return {
    props: { user: data},
  };
}


