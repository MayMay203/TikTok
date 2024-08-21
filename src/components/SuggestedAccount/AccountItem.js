import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SuggestedAccount.module.scss'
import classNames from 'classnames/bind'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Image from '../Image'

const cx = classNames.bind(styles)
function AccountItem({ data }) {
  return (
    <Link to={`/@${data.nickname}`} className={cx('account-item')}>
      <div className={cx('avatar-wrapper')}>
        <Image className={cx('avatar')} src={data.avatar} alt="avatar"></Image>
      </div>
      <div className={cx('info')}>
        <h3 className={cx('username')}>
          <span>{data.nickname}</span>
          {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle}></FontAwesomeIcon>}
        </h3>
        <span className={cx('name')}>{data.first_name + ' ' + data.last_name}</span>
      </div>
    </Link>
  )
}

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AccountItem
