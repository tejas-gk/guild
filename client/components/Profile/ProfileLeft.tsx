import {GitHub,Twitter,Twitch,Linkedin, Plus} from 'react-feather'
import { useState, useRef ,useEffect} from 'react';
import axios from 'lib/axios';
import Follows from 'lib/helpers/Follows';
import  useAuth  from 'hooks/useAuth';
export default function ProfileLeft({
  name,
  username,
  bio,
  id,
}) {
  
  const [followIsClicked, setFollowIsClicked] = useState(false);
  const [followers, setFollowers] = useState();
  const [followings, setFollowings] = useState();
  const [followD, setFollowD] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);


  const followRef = useRef(null);
    const followRequest = async () => {
      const res = await axios.post(`/follow/${id}`);
      const data = await res.data;
      console.log(data);
  }

  const getFollowers = async () => {
    const res = await axios.get(`/follower/${id}`)
    console.log(res.data)
    setFollowers(res.data.followerCount)
    setFollowD(res.data)
    console.log(followD, 'followD')
    console.log(followers,'j')
  }
  const following = async () => {
    const res = await axios.get(`/following/${id}`)
    console.log(res.data)
    setFollowings(res.data.following)
  }
  const toggleFollow = () => {
    followRequest()
    console.log(followIsClicked);
    setFollowIsClicked(!followIsClicked);
  };
  
  const isAuthUserFollowing = () => {
    const { authUser } = useAuth({ middleware: 'auth' });
    const { followingData } = Follows();
    console.log(followingData, 'followingData');
    if (followingData) {
      const isFollowing = followingData.find(
        (following) => following.id === id
      );
      console.log(isFollowing, 'isFollowing');
      setIsFollowing(isFollowing);
    }
  };


  useEffect(() => {
    getFollowers()
    following()
    
    console.log(followD,'l')

    console.log(followings,'k')
  },[]);

  return (
    <div>
      <div className="profile-left">
        <div className="profile-left__image mt-24 ml-24">
          <img
            src="https://picsum.photos/200"
            alt="user"
            className="rounded-full w-64 h-64"
          />
        </div>
        <div className="profile-left__name mt-8 ml-32">
          <h1 className="font-bold text-xl">{name}</h1>
          <p>{username}</p>
        </div>

        <div className="profile-left__bio mt-8 ml-32 w-64 overflow-hidden">
          <h2 className="font-semibold">Bio</h2>
          <p>{bio}</p>
        </div>

        <div className="follow mt-8 ml-32 flex flex-row divide-gray-600">
          <a
            href="#"
            className="rounded-md border border-transparent bg-gray-900 py-3 px-8 text-center font-medium
             text-white hover:bg-gray-700 flex flex-row divide-gray-600 divide-x
             ">
            { (followIsClicked ) ? (
              <p className="mr-2"
                onClick={toggleFollow}
                ref={followRef}
                >Following</p>
            ) : (
                <>
                  <span className='pr-4'
                    onClick={toggleFollow}
                    ref={followRef}
                  >
                    Follow</span>
              <span className='pl-4'><Plus /></span>
                </>
            )}

                     
          </a>
        </div>

        <div className="follows mt-8 ml-32 flex flex-row gap-5">
          <div className="following">
            <h2 className="font-semibold">Following</h2>
            <p>{
              followings
            }</p>
          </div>
          <div className="followers">
            <h2 className="font-semibold">Followers</h2>
            <p>{followers}</p>
          </div>
        </div>

        <div className="profile-left__bio mt-8 ml-32">
          <ul className=" flex flex-row gap-5">
            <li>
              <a href="#">
                <GitHub />
              </a>
            </li>
            <li>
              <a href="#">
                <Twitter />
              </a>
            </li>
            <li>
              <a href="#">
                <Twitch />
              </a>
            </li>
            <li>
              <a href="#">
                <Linkedin />
              </a>
            </li>
          </ul>
        </div>
        <div className="profile-left__contact mt-8 ml-32">
          <h2>Contact</h2>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i> 123 Street, City, State
            </li>
            <li>
              <i className="fas fa-phone"></i> 123-456-7890
            </li>
            <li>
              <i className="fas fa-envelope"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const userId= context.query
  const res = await axios.post(`/follow/${userId.profile}`);
  const data = await res.data;

  const followerData = await axios.get(`/follower/${userId.profile}`);
  const follower = await followerData.data;

  
  return {
    props: {
      follow: data,
      follower: follower

    },
  };
}

