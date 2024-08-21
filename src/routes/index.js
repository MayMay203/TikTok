import Home from '~/pages/Home'
import Explore from '~/pages/Explore'
import Following from '~/pages/Following'
import Friends from '~/pages/Friends'
import Live from '~/pages/Live'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import config from '~/config'

// Public Routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.explore, component: Explore },
  { path: config.routes.following, component: Following },
  { path: config.routes.friends, component: Friends },
  { path: config.routes.live, component: Live },
  { path: config.routes.profile, component: Profile },
  {path: config.routes.upload, component: Upload}
  // {path: '/upload', component: Upload, layout: null}
]

// Private Routes
const privateRoutes = []

export { publicRoutes, privateRoutes }
