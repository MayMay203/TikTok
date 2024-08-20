import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './AccountItem.module.scss'
import classNames from 'classnames/bind'
import { faCheckCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import Image from '../Image'

const cx = classNames.bind(styles)
function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('user')}>
        <Image
          className={cx('avatar')}
          src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7dc789b28318e5489cfeeb1d39b35969~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=26492&refresh_token=0fc6d6166d2e6214408b88e508b6b631&x-expires=1724205600&x-signature=SZhb5nfbBqDbTOikpzNiosltsPY%3D&shp=a5d48078&shcp=81f88b70"
          alt="avatar"
        ></Image>
        <div className={cx('info')}>
          <h4 className={cx('name')}>
            <span>Nhung</span>
            <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle}></FontAwesomeIcon>
          </h4>
          <span className={cx('username')}>lethihongnhung</span>
        </div>
      </div>
        <div classNames={cx('more')}>
          <button className={cx('more-btn')}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
    </div>
  )
}

export default AccountItem
