import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './AccountItem.module.scss'
import classNames from 'classnames/bind'
import { faCheckCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Image from '../Image'

const cx = classNames.bind(styles)
function AccountItem({data}) {
  return (
    <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
      <div className={cx('user')}>
        <Image className={cx('avatar')} src={data.avatar} alt="avatar"></Image>
        <div className={cx('info')}>
          <h4 className={cx('name')}>
            <span>{data.full_name}</span>
            {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle}></FontAwesomeIcon>}
          </h4>
          <span className={cx('username')}>{data.nickname}</span>
        </div>
      </div>
      <div classNames={cx('more')}>
        <button className={cx('more-btn')}>
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      </div>
    </Link>
  )
}

export default AccountItem
