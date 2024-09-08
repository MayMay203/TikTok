import styles from './Live.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function Live() {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>COMING SOON!!!</h2>
    </div>
  )
}

export default Live
