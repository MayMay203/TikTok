import Header from '../components/Header'
import styles from './HeaderOnlyLayout.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function HeaderOnlyLayout({ children }) {
  return (
    <div>
      <Header></Header>
      <div className={cx('content')}>{children}</div>
    </div>
  )
}

export default HeaderOnlyLayout
