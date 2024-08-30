import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import { useEffect, useState } from 'react'
import { getVideosList } from '~/services/getVideosList'
import VideoList from '../../components/VideoList/VideoList'
import { ArrowUpIcon } from '~/components/Icon'
import { followUser } from '~/services/followService'
import { unFollowUser } from '~/services/unFollowService'

const cx = classNames.bind(styles)
function Home() {
  const [videosList, setVideosList] = useState([])
  const [page, setPage] = useState(1)
  const [change, setChange] = useState(null)

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getVideosList('for-you', page)
      if (result) {
        setVideosList((prev) => [...prev, ...result])
      }
    }
    fetchApi()
  }, [page])

    useEffect(() => {
      const fetchApi = async () => {
        let dataList = []
        for (let i = 1; i <= page; i++){
          const result = await getVideosList('for-you', i)
          if (result) {
            dataList = [...dataList, ...result]
          }
        }
        setVideosList(dataList)
        }
      fetchApi()
    }, [change])

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

  const handleFollow = async (user_id) => {
      const data = await followUser(user_id)
      if (data) {
         setChange(true)
       }
    }

  const handleUnFollow = async (user_id) => {
      const data = await unFollowUser(user_id)
      if (data) {
        setChange(false)
      }
    }
  
  return (
    <div className={cx('wrapper')}>
      <VideoList data={videosList} handleFollow={handleFollow} handleUnFollow={handleUnFollow}/>
      <button className={cx('scroll-top-btn')} onClick={() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
      }}>
        <ArrowUpIcon className={cx('arrow-icon')}/>
      </button>
    </div>
  )
}

export default Home
