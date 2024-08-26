import styles from './UserProfile.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { memo} from 'react'

import Image from '../Image'
import Button from '../Button'
import { SettingIcon, ShareIcon } from '../Icon'

const cx = classNames.bind(styles)
function UserProfile({ dataUser }) {
  const {avatar, first_name, last_name, nickname, bio, followers_count, followings_count, likes_count } = dataUser
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
          <Button primary>Edit profile</Button>
          <button className={cx('btn')}>
            <SettingIcon />
          </button>
          <button className={cx('btn')}>
            <ShareIcon />
          </button>
        </div>
        <div className={cx('interaction')}>
          <div className={cx('number')}>
            <strong className={cx('value')}>{followings_count ? followings_count : 0}</strong>
            <span className={cx('unit')}>Following</span>
          </div>
          <div className={cx('number')}>
            <strong className={cx('value')}>{followers_count ? followers_count : 0}</strong>
            <span className={cx('unit')}>Followers</span>
          </div>
          <div className={cx('number')}>
            <strong className={cx('value')}>{likes_count}</strong>
            <span className={cx('unit')}>Likes</span>
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
