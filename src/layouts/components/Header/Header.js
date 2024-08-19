import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faEllipsisVertical, faHouseFlag, faLanguage, faMoon} from '@fortawesome/free-solid-svg-icons'

import styles from './Header.module.scss'
import images from '~/assets/images'
import Search from '~/layouts/components/Search'
import Button from '~/components/Button'
import Menu from '~/components/Popper/Menu'

const cx = classNames.bind(styles)
function Header() {

  // MENU ITEMS
  const MENU_ITEMS = [
    {
      icon: <FontAwesomeIcon icon={faHouseFlag} />,
      title: 'Creator tools',
    },
    {
      icon: <FontAwesomeIcon icon={faLanguage} />,
      title: 'English',
    },
    {
      icon: <FontAwesomeIcon icon={faCommentDots} />,
      title: 'Feedback and help',
      to: '/feedback'
    },
    {
      icon: <FontAwesomeIcon icon={faMoon} />,
      title: 'Dark mode',
    },
  ]
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to="/" className={cx('logo-wrapper')}>
          <img src={images.logoLight} alt="logo" className={cx('logo')} />
          {/* <img src={images.logoDark} alt="logo" className={cx('logo')} /> */}
        </Link>
        <Search />
        {/* Actions */}
        <div className={cx('actions')}>
          <Button primary>Login</Button>
          <Menu items={MENU_ITEMS}>
            <button className={cx('more-btn')}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </Menu>
        </div>
      </div>
    </header>
  )
}

export default Header
