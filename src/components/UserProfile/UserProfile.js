import styles from './UserProfile.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { memo, useContext, useState } from 'react'

import Image from '../Image'
import Button from '../Button'
import { FollowedIcon, MoreIcon, SettingIcon, ShareIcon } from '../Icon'
import { UserContext } from '../Context/UserContext'
import { followUser } from '~/services/followService'
import { unFollowUser } from '~/services/unFollowService'
import { getFollowingList } from '~/services/getFollowingList'
import { EditContext } from '../Modal/EditProfileModal'

const cx = classNames.bind(styles)
function UserProfile({ dataUser }) {
  const {
    id,
    avatar,
    first_name,
    last_name,
    nickname,
    bio,
    followers_count,
    followings_count,
    likes_count,
    is_followed,
  } = dataUser

  const [isFollowing, setIsFollowing] = useState(is_followed)
  const userContext = useContext(UserContext)
  const editContext = useContext(EditContext)

  const handleFollow = async () => {
    const data = await followUser(id)
    if (data) {
      setIsFollowing(data.is_followed)
    }
  }

  const handleUnFollow = async () => {
    const data = await unFollowUser(id)
    if (data) {
      setIsFollowing(data.is_followed)
    }
  }

  const handleGetFollowingList = async () => {
    const data = await getFollowingList(1);
  }

  const handleEditProfile = () => {
    editContext.handleShowEditModal();
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('avatar-wrapper')}>
        <Image src={avatar} alt={nickname} className={cx('avatar')} />
      </div>
      <div className={cx('info')}>
        <div className={cx('username')}>
          <h1 className={cx('nickname')}>{nickname}</h1>
          <h2 className={cx('fullname')}>{`${first_name} ${last_name}`}</h2>
        </div>
        <div className={cx('actions')}>
          {userContext.currentUser.id === id || (
            <>
              {!isFollowing ? (
                <Button primary className={cx('custom-height')} onClick={handleFollow}>
                  Follow
                </Button>
              ) : (
                <button className={cx('btn')} onClick={handleUnFollow}>
                  <FollowedIcon />
                  Following
                </button>
              )}
              <button className={cx('btn')}>Message</button>
            </>
          )}
          {userContext.currentUser.id === id && (
            <>
              <Button primary className={cx('custom-height')} onClick={handleEditProfile}>
                Edit profile
              </Button>
              <button className={cx('btn')}>
                <SettingIcon />
              </button>
            </>
          )}
          <button className={cx('btn')}>
            <ShareIcon />
          </button>
          {userContext.currentUser.id === id || (
            <button className={cx('btn')}>
              <MoreIcon />
            </button>
          )}
        </div>
        <div className={cx('interaction')}>
          <div className={cx('number')} onClick={handleGetFollowingList}>
            <strong className={cx('value')}>{followings_count ? followings_count : 0}</strong>
            <span className={cx('unit')}>Following</span>
          </div>
          <div className={cx('number')}>
            <strong className={cx('value')}>{followers_count ? followers_count : 0}</strong>
            <span className={cx('unit')}>Followers</span>
          </div>
          <div className={cx('number','custom-number')}>
            <strong className={cx('value')}>{likes_count}</strong>
            <span className={cx('unit','custom-unit')}>Likes</span>
          </div>
        </div>
        <p className={cx('bio')}>{bio ? bio : 'No bio yet.'}</p>
      </div>
    </div>
  )
}

UserProfile.propTypes = {
  dataUser: PropTypes.object.isRequired,
}

export default memo(UserProfile)
