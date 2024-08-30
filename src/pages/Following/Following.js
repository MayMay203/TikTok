import classNames from 'classnames/bind'
import styles from './Following.module.scss'
import { useEffect, useState } from 'react'
import { getVideosList } from '~/services/getVideosList'
import VideoList from '../../components/VideoList/VideoList'
import { ArrowUpIcon } from '~/components/Icon'
import { getFollowingList } from '~/services/getFollowingList'
import { unFollowUser } from '~/services/unFollowService'

const cx = classNames.bind(styles)
function Following() {
  const [videoFollowingsList, setVideosFollowingList] = useState([])
  const [videosList, setVideosList] = useState([])
  const [followingList, setFollowingList] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchApi = async () => {
      let tempVideoList = []
      let tempFollowingList = []
      const result = await getVideosList('for-you', page)
      if (result) {
        tempVideoList = [...videosList, ...result]
        setVideosList((prev) => [...prev, ...result])
      }
      const data = await getFollowingList(page)
      if (data) {
        tempFollowingList = [...followingList, ...data]
        setFollowingList((prev) => [...prev, ...data])
      }

      const filteredVideos = tempVideoList.filter((video) => {
        for (let user of tempFollowingList) {
          if (video.user_id === user.id) {
            return true
          }
        }
        return false
      })
      if (filteredVideos) {
        setVideosFollowingList([...filteredVideos])
      }
    }
    fetchApi()
  }, [page])

  const handleScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleUnFollow = async (user_id) => {
    console.log(user_id)
    const data = await unFollowUser(user_id)
    if (data) {
      setVideosFollowingList(videoFollowingsList.filter((video) => video.user_id !== user_id))
    }
  }

  return (
    <div className={cx('wrapper')}>
      <VideoList data={videoFollowingsList} handleUnFollow={handleUnFollow} />
      <button
        className={cx('scroll-top-btn')}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <ArrowUpIcon className={cx('arrow-icon')} />
      </button>
    </div>
  )
}

export default Following
