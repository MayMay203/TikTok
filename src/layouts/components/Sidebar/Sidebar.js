import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

import MenuItem from './Menu/MenuItem';
import Menu from './Menu';
import { ExploreActiveIcon, ExploreIcon, FollowingActiveIcon, FollowingIcon, FriendActiveIcon, FriendIcon, HomeActiveIcon, HomeIcon, LiveActiveIcon, LiveIcon } from '~/components/Icon';
import config from '~/config';
import SuggestedAccount from '~/components/SuggestedAccount';
import { useContext, useEffect, useState } from 'react';
import * as suggestService from '~/services/getSuggestedUsers';
import images from '~/assets/images'
import FooterList from './FooterList';
import Button from '~/components/Button';
import { UserContext } from '~/components/Context/UserContext';
const cx = classNames.bind(styles)
function Sidebar() {
  const isLogin = useContext(UserContext).isLogin
  // Sidebar Footer
  const FOOTER_LIST = [
    {
      title: 'Company',
      items: [
        {
          title: 'About',
          href: 'https://www.tiktok.com/about?lang=en',
        },
        {
          title: 'Newsroom',
          href: 'https://newsroom.tiktok.com/en-us/',
        },
        {
          title: 'Contact',
          href: 'https://www.tiktok.com/about/contact?lang=en',
        },
        {
          title: 'Careers',
          href: 'https://careers.tiktok.com/',
        },
      ],
    },
    {
      title: 'Program',
      items: [
        {
          title: 'TikTok for Good',
          href: 'https://www.tiktok.com/for-good/',
        },
        {
          title: 'Advertise',
          href: 'https://www.tiktok.com/business/vi?attr_medium=tt_official_site_guidance&attr_source=tt_official_site&refer=tiktok_web&tt4b_lang_redirect=1&ab_version=experiment_1',
        },
        {
          title: 'TikTok LIVE Creator Networks',
          href: 'https://www.tiktok.com/live/creator-networks/en?enter_from=tiktok_official',
        },
        {
          title: 'Developers',
          href: 'https://developers.tiktok.com/?refer=tiktok_web',
        },
        {
          title: 'Transparency',
          href: 'https://www.tiktok.com/transparency/en?tc_version=2024',
        },
        {
          title: 'TikTok Rewards',
          href: 'https://www.tiktok.com/tiktok-rewards/eligibility',
        },
        {
          title: 'TikTok Embeds',
          href: 'https://www.tiktok.com/embed',
        },
      ],
    },
    {
      title: 'Terms & Policies',
      items: [
        {
          title: 'Help',
          href: 'https://support.tiktok.com/en',
        },
        {
          title: 'Safety',
          href: 'https://www.tiktok.com/safety/en',
        },
        {
          title: 'Terms',
          href: 'https://www.tiktok.com/legal/page/row/terms-of-service/en',
        },
        {
          title: 'Privacy Policy',
          href: 'https://www.tiktok.com/legal/page/row/privacy-policy/en',
        },
        {
          title: 'Privacy Center',
          href: 'https://www.tiktok.com/privacy/overview/en',
        },
        {
          title: 'Creator Academy',
          href: 'https://www.tiktok.com/creator-academy',
        },
        {
          title: 'Community Guidelines',
          href: 'https://www.tiktok.com/community-guidelines/en?lang=en',
        },
      ],
    },
  ]

  const [dataList, setDataList] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const data = await suggestService.getSuggestedUsers()
      setDataList(data)
    }
    fetchApi()
  }, [])

  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
        <MenuItem
          title="Explore"
          to={config.routes.explore}
          icon={<ExploreIcon />}
          activeIcon={<ExploreActiveIcon />}
        />
        <MenuItem
          title="Following"
          to={config.routes.following}
          icon={<FollowingIcon className={cx('icon')} />}
          activeIcon={<FollowingActiveIcon className={cx('icon')} />}
        />
        <MenuItem title="Friends" to={config.routes.friends} icon={<FriendIcon />} activeIcon={<FriendActiveIcon />} />
        <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
        <MenuItem
          title="Profile"
          to="/@maymay203"
          avatar={{
            src: 'https://p16-sign-sg.tiktokcdn.com/aweme/1080x1080/tos-alisg-avt-0068/7322552705711341569.jpeg?lk3s=a5d48078&nonce=99080&refresh_token=43952f4ebaf517bace44ebe415bc2000&x-expires=1724407200&x-signature=RloCzgWgyoWKp6FFSLr37yX7aVg%3D&shp=a5d48078&shcp=81f88b70',
            alt: 'Nhung',
          }}
        />
      </Menu>
      {isLogin && <SuggestedAccount label="Suggested for you" data={dataList} />}
      {isLogin || (
        <div className={cx('login-wrapper')}>
          <p className={cx('login-desc')}>Log in to follow creators, like videos, and view comments.</p>
          <Button outline size="large">
            Login
          </Button>
        </div>
      )}
      <div className={cx('footer')}>
        <a
          href="https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v1&utm_source=tiktok_webapp_main"
          className={cx('reward-link')}
        >
          <img src={images.rewardImage} alt="reward" className={cx('reward-img')}></img>
          <h3 className={cx('reward-text')}>Create TikTok effects, get a reward</h3>
        </a>
        <FooterList dataList={FOOTER_LIST} />
        <p className={cx('copy-right')}>© 2024 TikTok</p>
      </div>
    </aside>
  )
}

export default Sidebar
