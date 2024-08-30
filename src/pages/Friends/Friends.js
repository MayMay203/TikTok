import { useEffect, useState } from 'react'
import styles from './Friends.module.scss'
import classNames from 'classnames/bind'
import { getSuggestedUsers } from '~/services/getSuggestedUsers'
import FriendList from '~/components/FriendList/FriendList'

const cx = classNames.bind(styles)

function Friends() {
  const [page, setPage] = useState(1)
  const [userData, setUserData] = useState([])

  useEffect(() => {
    async function fetchApi() {
      const data = await getSuggestedUsers(page, 9)
      if (data) {
        setUserData((prev) => [...prev, ...data])
      }
    }
    fetchApi()
  }, [page])

  const handleScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      setPage((prev) => prev + 1)
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
      <FriendList data={userData} />
    </div>
  )
}

export default Friends
