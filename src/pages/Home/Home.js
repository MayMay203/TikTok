import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import { useEffect, useState } from 'react'
import { getVideosList } from '~/services/getVideosList'
import VideoList from './VideoItem/VideoList'
import { ArrowUpIcon } from '~/components/Icon'

const cx = classNames.bind(styles)
function Home() {
  const [videosList, setVideosList] = useState([])
  const [page, setPage] = useState(1)
  const [uuidList, setUuidList] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getVideosList('for-you', page)
      if (result) {
        setVideosList((prev) => [...prev, ...result])
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
  
  return (
    <div className={cx('wrapper')}>
      <VideoList data={videosList}/>
      <button className={cx('scroll-top-btn')} onClick={() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
      }}>
        <ArrowUpIcon className={cx('arrow-icon')}/>
      </button>
    </div>
  )
}

export default Home
