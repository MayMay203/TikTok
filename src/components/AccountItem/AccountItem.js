import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './AccountItem.module.scss'
import classNames from 'classnames/bind'
import { faCheckCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Image from '../Image'
import { IrrelevantIcon, ReportIcon } from '../Icon/Icon'
import Menu from '../Popper/Menu'

const cx = classNames.bind(styles)
function AccountItem({ data}) {
  // ACCOUNT MENU
  const ACCOUNT_MENU = [
    {
      icon: <ReportIcon />,
      title: 'Report',
    },
    {
      icon: <IrrelevantIcon />,
      title: 'Mark as irrelevant',
      separate: true,
    },
  ]
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
      <Menu items={ACCOUNT_MENU} customHover>
        <div className={cx('more')}>
          <button className={cx('more-btn')}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      </Menu>
    </Link>
  )
}

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AccountItem
