import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'
import images from '~/assets/images'
import Search from '~/layouts/components/Search'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)
function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to="/" className={cx('logo')}>
          <img src={images.logoLight} alt="logo" />
          {/* <img src={images.logoDark} alt="logo" /> */}
        </Link>
        <Search />
        {/* Actions */}
        <div className={cx('actions')}>
          <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
            Upload
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
