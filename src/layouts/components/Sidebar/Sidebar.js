import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

import MenuItem from './Menu/MenuItem';
import Menu from './Menu';
import { ExploreActiveIcon, ExploreIcon, FollowingActiveIcon, FollowingIcon, FriendActiveIcon, FriendIcon, HomeActiveIcon, HomeIcon, LiveActiveIcon, LiveIcon } from '~/components/Icon';
import config from '~/config';
const cx = classNames.bind(styles);
function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon/>} />
        <MenuItem title="Explore" to={config.routes.explore} icon={<ExploreIcon />} activeIcon={<ExploreActiveIcon />} />
        <MenuItem title="Following" to={config.routes.following} icon={<FollowingIcon className={cx('icon')} />} activeIcon={<FollowingActiveIcon className={cx('icon')} />}/>
        <MenuItem title="Friends" to={config.routes.friends} icon={<FriendIcon />} activeIcon={<FriendActiveIcon />} />
        <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
        <MenuItem
          title="Profile"
          to='/@maymay203'
          avatar={{
            src: 'https://p16-sign-sg.tiktokcdn.com/aweme/1080x1080/tos-alisg-avt-0068/7322552705711341569.jpeg?lk3s=a5d48078&nonce=99080&refresh_token=43952f4ebaf517bace44ebe415bc2000&x-expires=1724407200&x-signature=RloCzgWgyoWKp6FFSLr37yX7aVg%3D&shp=a5d48078&shcp=81f88b70',
            alt: 'Nhung'
          }}
        />
      </Menu>
    </aside>
  )
}

export default Sidebar
