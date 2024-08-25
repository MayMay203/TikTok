import styles from './Profile.module.scss'
import classNames from 'classnames/bind'
import {useEffect, useState } from 'react'
import Image from '~/components/Image'
import Button from '~/components/Button'
import { SettingIcon, ShareIcon } from '~/components/Icon'
import { LockIcon } from '~/components/Icon/Icon'
import TabList from '~/components/TabList'
import { getAnUser } from '~/services/getAnUser'
import { useParams } from 'react-router-dom'

const tablist = ['Videos', 'Favotites', 'Liked']
const cx = classNames.bind(styles)
function Profile() {
  const [dataUser, setDataUser] = useState({})
  const { nickname } = useParams()
  const { first_name, last_name, bio, followers_count, followings_count, likes_count, avatar } = dataUser

  useEffect(() => {
    async function fetchApi() {
      const data = await getAnUser(nickname)
      setDataUser(data)
    }
    fetchApi()
  }, [nickname])
  return (
    <div className={cx('wrapper')}>
      <div className={cx('info-wrapper')}>
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
      <TabList className={cx('title')} icon={<LockIcon />} tablist={tablist} hasVideo>
        <div className={cx('control')}>
          <button className={cx('control-btn')}>Latest</button>
          <button className={cx('control-btn')}>Popular</button>
          <button className={cx('control-btn', { active: true })}>Oldest</button>
        </div>
      </TabList>
    </div>
  )
}

export default Profile
