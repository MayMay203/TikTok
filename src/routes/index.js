import Home from '~/pages/Home'
import Explore from '~/pages/Explore'
import Following from '~/pages/Following'
import Friends from '~/pages/Friends'
import Live from '~/pages/Live'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import routesConfig from '~/config/routes'

// Public Routes
const publicRoutes = [
  { path: routesConfig.home, component: Home },
  { path: routesConfig.explore, component: Explore },
  { path: routesConfig.following, component: Following },
  { path: routesConfig.friends, component: Friends },
  { path: routesConfig.live, component: Live },
  { path: routesConfig.profile, component: Profile },
  {path: routesConfig.upload, component: Upload}
  // {path: '/upload', component: Upload, layout: null}
]

// Private Routes
const privateRoutes = []

export { publicRoutes, privateRoutes }
