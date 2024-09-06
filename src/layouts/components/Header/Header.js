import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faEllipsisVertical,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional

import styles from './Header.module.scss'
import Search from '~/layouts/components/Search'
import Button from '~/components/Button'
import Menu from '~/components/Popper/Menu'
import { CreatorIcon, InboxIcon, LanguageIcon, Logo } from '~/components/Icon'
import { UploadIcon } from '~/components/Icon'
import { ChartIcon, CoinIcon, DarkIcon, FeedbackIcon, HubIcon, LogoutIcon, SettingIcon, StudioIcon, UserIcon } from '~/components/Icon/Icon'
import Image from '~/components/Image'
import config from '~/config'
import { ThemeContext } from '~/components/Context/ThemeContext'
import { useContext} from 'react'
import { UserContext } from '~/components/Context/UserContext'
import { AuthContext } from '~/components/Modal/AuthModalContext'

const cx = classNames.bind(styles)
const menuItems = []
function Header() {
  const themeContext = useContext(ThemeContext)
  const authContext = useContext(AuthContext)
  const userContext = useContext(UserContext)
  const isLogin = useContext(UserContext).isLogin
  // MENU ITEMS
  const MENU_ITEMS = [
    {
      icon: <CreatorIcon />,
      title: 'Creator tools',
      children: {
        title: 'Creator tools',
        data: [
          {
            icon: <HubIcon />,
            title: 'LIVE Creator Hub',
            to: 'https://www.tiktok.com/live/creators/vi-VN/?enter_from=more&lang=en&region=VN',
          },
        ],
      },
    },
    {
      icon: <LanguageIcon />,
      title: 'English',
      children: {
        title: 'Language',
        data: [
          {
            type: 'language',
            code: 'en',
            title: 'English',
          },
          {
            type: 'language',
            code: 'vi',
            title: 'Tiếng Việt',
          },
        ],
      },
    },
    {
      icon: <FeedbackIcon />,
      title: 'Feedback and help',
      to: '/feedback',
    },
    {
      icon: <DarkIcon />,
      title: 'Dark Mode',
      children: {
        title: 'Dark Mode',
        data: [
          {
            type: 'darkmode',
            title: 'Dark Mode',
            // icon: themeContext.theme ? <FontAwesomeIcon icon={faCheck} /> : <svg style={{ width: '24px' }}></svg>,
            icon: <svg style={{ width: '24px' }}></svg>,
          },
          {
            type: 'darkmode',
            title: 'Light Mode',
            // icon: !themeContext.theme ? <FontAwesomeIcon icon={faCheck} /> : <svg style={{ width: '24px' }}></svg>,
            icon: <svg style={{ width: '24px' }}></svg>,
          },
        ],
      },
    },
  ]

  // USER MENU
  const USER_MENU = [
    {
      icon: <UserIcon />,
      title: 'View Profile',
      to: `/@${userContext.currentUser.nickname}`,
    },
    {
      icon: <CoinIcon />,
      title: 'Get Coins',
      href: 'https://www.tiktok.com/coin?enter_from=web_main_nav',
    },
    {
      icon: <CreatorIcon />,
      title: 'Creator Tools',
      children: {
        title: 'Creator Tools',
        data: [
          {
            icon: <ChartIcon />,
            title: 'View Analytics',
          },
          {
            icon: <StudioIcon />,
            title: 'LIVE Studio',
          },
          {
            icon: <HubIcon />,
            title: 'LIVE Creator Hub',
          },
        ],
      },
    },
    {
      icon: <SettingIcon />,
      title: 'Settings',
      to: '/setting',
    },
    ...MENU_ITEMS.slice(1),
    {
      icon: <LogoutIcon />,
      title: 'Logout',
      type: 'logout',
      separate: true,
    },
  ]

  // Handle select menu
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'language':
        // Handle logic
        break
      case 'logout':
        const isConfirm = window.confirm('Are you sure you want to log out?')
       if (isConfirm) {
         localStorage.removeItem('token');
         localStorage.removeItem('isLogin')
         userContext.toggleLogin();
       }
        break
      case 'darkmode':
        switch (menuItem.title) {
          case 'Light Mode':
            menuItems[0] = menuItem
            if (themeContext.theme) {
              themeContext.toggleTheme()
              menuItem.icon = <FontAwesomeIcon icon={faCheck} />
              if (menuItems[1]) {
                menuItems[1].icon = <svg style={{ width: '24px' }}></svg>
              }
            }
            break
          case 'Dark Mode':
            menuItems[1] = menuItem
            if (!themeContext.theme) {
              themeContext.toggleTheme()
               menuItem.icon = <FontAwesomeIcon icon={faCheck} />
              if (menuItems[0]) {
                 
                 menuItems[0].icon = <svg style={{ width: '24px' }}></svg>
               }
            }
            break
          default:
        }
        break
      default:
        throw new Error('Failed to handle logic menu')
    }
  }

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo-wrapper')}>
          <Logo className={cx('logo')} />
        </Link>
        <Search />

        <div className={cx('actions')}>
          {isLogin ? (
            <div className={cx('current-user')}>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>
              <Tippy content="Message">
                <button className={cx('message-btn')}>
                  <UploadIcon />
                </button>
              </Tippy>
              <div className={cx('inbox-wrapper')}>
                <Tippy content="Inbox">
                  <button className={cx('inbox-btn')}>
                    <InboxIcon />
                  </button>
                </Tippy>
              </div>
              <Menu items={USER_MENU} onChange={handleMenuChange}>
                <Image
                  className={cx('avatar')}
                  src={userContext.currentUser.avatar}
                  alt={userContext.currentUser.nickname}
                  // fallback="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
                ></Image>
              </Menu>
            </div>
          ) : (
            <>
              <Button primary onClick={authContext.handleShowLogin}>
                Login
              </Button>
              <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                <button className={cx('more-btn')}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </Menu>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
