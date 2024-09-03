import TabButton from '~/components/TabButton/TabButton'
import styles from './Explore.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { getVideosList } from '~/services/getVideosList'
import VideoSmallList from '~/components/VideoSmallList'

const cx = classNames.bind(styles)
const dataButton = ['All', 'Singing & Dancing', 'Comedy', 'Sports', 'Relationship']
function Explore() {
  const [page, setPage] = useState(1)
  const [videoList, setVideosList] = useState([])
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(parseFloat(localStorage.getItem('volume')))
  const lastScrollY = useRef(0)
  const tabButtonRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)

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
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollY.current = window.scrollY
      if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
        setPage((prev) => prev + 1)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleMute = () => {
    setVolume(0)
    setMuted(true)
  }

  const handleUnMute = () => {
    setVolume(parseFloat(localStorage.getItem('volume')) || 0.4)
    if (localStorage.getItem('volume')) {
      localStorage.setItem('volume', 0.4)
    }
    setMuted(false)
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('tab-buttons', { hidden: !isVisible, visible: isVisible })} ref={tabButtonRef}>
        <TabButton data={dataButton} type="All" />
      </div>
      <div className={cx('video-list')}>
        {' '}
        <VideoSmallList
          dataVideo={videoList}
          classNames="gy-4"
          muted={muted}
          handleMute={handleMute}
          handleUnMute={handleUnMute}
          volume={volume}
          isExplore
        />
      </div>
    </div>
  )
}

export default Explore
