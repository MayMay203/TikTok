import { Link } from 'react-router-dom'
import styles from './FriendsItem.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import Button from '../Button'
import Image from '../Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { followUser } from '~/services/followService'
import { unFollowUser } from '~/services/unFollowService'
import { useContext, useRef, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { AuthContext } from '../Modal/AuthModalContext'

const cx = classNames.bind(styles)
function FriendItem({ data }) {
  const { id, nickname, first_name, last_name, tick, is_followed, avatar } = data
  const { file_url, thumb_url } = data.popular_video
  const [isFollowing, setIsFollowing] = useState(is_followed)
  const videoRef = useRef(null)
  const userContext = useContext(UserContext)
  const authContext = useContext(AuthContext)

  const handleOverVideo = () => {
    setTimeout(() => {
      videoRef.current.play()
    }, 100)
  }

  const handleLeaveVideo = () => {
    setTimeout(() => {
      videoRef.current?.pause()
    }, 100)
  }

  const handleFollow = async (e) => {
    e.preventDefault()
    if (!userContext.isLogin) {
      authContext.handleShowLogin()
    } else {
      const data = await followUser(id)
      if (data) {
        setIsFollowing((prev) => !prev)
      }
    }
  }

  const handleUnFollow = async (e) => {
    e.preventDefault()
    if (!userContext.isLogin) {
      authContext.handleShowLogin()
    } else {
      const data = await unFollowUser(id)
      if (data) {
        setIsFollowing((prev) => !prev)
      }
    }
  }

  return (
    <Link
      to={`/@${nickname}`}
      className={cx('container')}
      onMouseEnter={handleOverVideo}
      onMouseLeave={handleLeaveVideo}
    >
      <video ref={videoRef} className={cx('video')} src={file_url} poster={thumb_url} muted></video>
      <div className={cx('info')}>
        <Image className={cx('avatar')} src={avatar} alt={nickname} />
        <h3 className={cx('fullname')}>{`${first_name} ${last_name}`}</h3>
        <div className={cx('user')}>
          <span className={cx('nickname')}>{nickname}</span>
          {tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
        </div>
        {!isFollowing && (
          <Button primary className={cx('follow-btn')} onClick={handleFollow}>
            Follow
          </Button>
        )}
        {isFollowing && (
          <Button className={cx('following-btn')} onClick={handleUnFollow}>
            Following
          </Button>
        )}
      </div>
    </Link>
  )
}

FriendItem.propTypes = {
  data: PropTypes.object.isRequired,
}
export default FriendItem
