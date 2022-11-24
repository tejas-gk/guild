import Navbar from 'components/Navbar/Navbar';
import ProfileLeft from 'components/Profile/ProfileLeft';
import ProfileRight from 'components/Profile/ProfileRight';
import useAuth from 'hooks/useAuth';
import axios from 'lib/axios';
import { log } from 'lib/log';
import {useEffect,useRef} from 'react';
import useSWR from 'swr';
export default function profile({ user, userId }) {
  const { authUser,currentUser } = useAuth({ middleware: 'auth' });

  useEffect(() => {
    log(user);
    log('authUser', authUser,currentUser.name)
  }, [])

  const fetcher = ((url) => axios.get(url).then((res) => res.data.message));
  const { data: bio, error } = useSWR(process.env.NEXT_PUBLIC_BACKEND_URL +`/profile/6`, fetcher)
  log(bio?.profile?.bio, 'bio')
  return (
      <div className="profile">
          {/* <Sidebar /> */}
      {/* <Navbar /> */}
      
      <div className="flex flex-row">
        <div
          className="banner w-full -z-30 
      bg-gradient-to-r from-blue-400 to-blue-600 h-64 absolute border border-radius-2xl
      "></div>
        <div className="profile-left border border-black w-1/3">
                  <ProfileLeft
                      name={user.name}
                      username={user.email}
                      bio={bio?.profile?.bio}
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
            uid={user.id}
            profileData={user}
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


