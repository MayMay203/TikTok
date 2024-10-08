import PropTypes from 'prop-types'
import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
import { NavLink} from 'react-router-dom'
import Image from '~/components/Image'

const cx = classNames.bind(styles)
function MenuItem({ title, to, icon, activeIcon, avatar, onClick }) {
  const hasAvatar = !!avatar
  return onClick ? (
    <div
      onClick={onClick}
      className={cx('menu-item')}
    >
      {hasAvatar || <span className={cx('icon')}>{icon}</span>}
      {hasAvatar || <span className={cx('active-icon')}>{activeIcon}</span>}
      {hasAvatar && <Image className={cx('avatar')} src={avatar.src} alt={avatar.alt} />}
      <span className={cx('title')}>{title}</span>
    </div>
  ) : (
    <NavLink
      to={to}
      className={(nav) => {
        return cx('menu-item', { active: nav.isActive })
      }}
    >
      {hasAvatar || <span className={cx('icon')}>{icon}</span>}
      {hasAvatar || <span className={cx('active-icon')}>{activeIcon}</span>}
      {hasAvatar && <Image className={cx('avatar')} src={avatar.src} alt={avatar.alt} />}
      <span className={cx('title')}>{title}</span>
    </NavLink>
  )
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  icon: PropTypes.node,
  activeIcon: PropTypes.node,
  avatar: PropTypes.object,
  onClick: PropTypes.func
}
export default MenuItem
