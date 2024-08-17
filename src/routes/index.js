import Home from '~/pages/Home'
import Explore from '~/pages/Explore'
import Following from '~/pages/Following'
import Friends from '~/pages/Friends'
import Live from '~/pages/Live'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'

// Public Routes
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/explore', component: Explore },
  { path: '/following', component: Following },
  { path: '/friends', component: Friends },
  { path: '/live', component: Live },
  { path: '/profile', component: Profile },
  {path: '/upload', component: Upload}
  // {path: '/upload', component: Upload, layout: null}
]

// Private Routes
const privateRoutes = []

export { publicRoutes, privateRoutes }
