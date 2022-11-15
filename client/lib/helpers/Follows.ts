import {useEffect,useState} from 'react'
import axios from 'lib/axios'
import useSWR from "swr";
import { log } from 'lib/log';
export default function Follows() {
    const [follower, setFollower] = useState()
    const [followingData, setFollowingData] = useState()

   
    const getFollower = async () => {
        const response = await axios.get('/follower/1')
        setFollower(response.data)
        log('response.data')
    }

    const getFollowing = async () => {
        const response = await axios.get('/following/1')
        setFollowingData(response.data)
        console.log(response.data)
    }


    return {
        getFollower,
        follower,
        getFollowing,
        followingData
    }
}
