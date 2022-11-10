import Navbar from 'components/Navbar/Navbar';
import ProfileLeft from '../../../components/trySomethingNew/ProfileLeft';
import ProfileRight from '../../../components/trySomethingNew/ProfileRight';
import axios from 'lib/axios';
import Sidebar from 'components/Sidebar/Sidebar';
export default function profile({ user, userId }) {
    console.log(user);
    console.log(userId);
  return (
      <div className="profile">
          <Sidebar />
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
                  />
        </div>
        <div
          className="profile-right
      mx-12 mt-36 w-full  px-2 py-16 sm:px-0
      ">
          <ProfileRight 
            posts={user.posts}
                  />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const userId = context.query.test;
  const res = await axios.get(`/user/${userId}`);
  const data = await res.data;

  return {
    props: { user: data, userId },
  };
};
