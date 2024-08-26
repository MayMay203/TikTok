import styles from './Profile.module.scss'
import classNames from 'classnames/bind'
import {useEffect, useState } from 'react'
import { LockIcon } from '~/components/Icon/Icon'
import TabList from '~/components/TabList'
import { getAnUser } from '~/services/getAnUser'
import { useParams } from 'react-router-dom'
import UserProfile from '~/components/UserProfile'
import { getUserLikedVideos } from '~/services/getUserLikedVideos'
import { getUserVideos } from '~/services/getUserVideos'

const tablist = ['Videos', 'Favotites', 'Liked']
const cx = classNames.bind(styles)
function Profile() {
  const [dataUser, setDataUser] = useState({})
  const { nickname } = useParams()
  const [dataVideo, setDataVideo] = useState([])
  const [dataLikedVideo, setDataLikedVideo] = useState([])
  // Get user data
  useEffect(() => {
    async function fetchApi() {
      const data = await getAnUser(nickname)
      setDataUser(data)
    }
    fetchApi()
  }, [dataUser])

  // Get user's videos
  useEffect(() => {
    async function getVideos() {
      const data = await getUserVideos(dataUser.id)
      setDataVideo(data)
    }

    async function getLikedVideos() {
      const data = await getUserLikedVideos(dataUser.id)
      setDataLikedVideo(data);
    }

    getVideos();
    getLikedVideos();
  }, [dataUser.id])

  return (
    <div className={cx('wrapper')}>
      <UserProfile dataUser={dataUser} />
      <TabList className={cx('title')} icon={<LockIcon />} tablist={tablist} dataVideo={dataVideo} dataLikedVideo={dataLikedVideo} nickname={nickname}>
      </TabList>
    </div>
  )
}

export default Profile
