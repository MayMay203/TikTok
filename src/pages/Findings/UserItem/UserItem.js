import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './UserItem.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Image from '~/components/Image'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)
function UserItem({ data }) {
  const { avatar, nickname, tick, bio, full_name, followers_count } = data
  return (
    <Link to={`/@${nickname}`} className={cx('wrapper')}>
      <div className={cx('avatar-wrapper')}>
        <Image src={avatar} alt={nickname} className={cx('avatar')}></Image>
      </div>
      <div className={cx('info')}>
        <p className={cx('nickname')}>
          {nickname}
          {tick && (
            <span className={cx('check-icon')}>
              <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle}></FontAwesomeIcon>
            </span>
          )}
        </p>
        <p className={cx('fullname')}>
          {full_name} · <strong className={cx('number')}>{followers_count}</strong>
          Followers
        </p>
        <p className={cx('bio')}>{bio}</p>
      </div>
    </Link>
  )
}

UserItem.propTypes = {
  data: PropTypes.object.isRequired,
}
export default UserItem
