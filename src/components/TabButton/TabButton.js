import { type } from '@testing-library/user-event/dist/type'
import styles from './TabButton.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

const cx = classNames.bind(styles)
function TabButton({ data, type }) {
  return (
    <div className={cx('wrapper')}>
      {data.map((item, index) => (
        <button key={index} className={cx('btn', { active: type === item })}>
          {item}
        </button>
      ))}
    </div>
  )
}

TabButton.porpTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}
export default TabButton
