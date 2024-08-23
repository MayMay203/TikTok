import styles from './SuggestedAccount.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import AccountItem from './AccountItem'
import { memo } from 'react'

const cx = classNames.bind(styles)
function SuggestedAccount({ label, data, onViewChange, isSeeMore}) {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('label')}>{label}</h3>
      {data.map((acc) => (
        <AccountItem key={acc.id} data={acc} />
      ))}
      <button
        className={cx('more-btn')}
        onClick={() => {
          onViewChange(isSeeMore)
        }}
      >
        {isSeeMore ? 'See less' : 'See more'}
      </button>
    </div>
  )
}

SuggestedAccount.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onViewChange: PropTypes.func.isRequired,
  isSeeMore: PropTypes.bool.isRequired
}

export default memo(SuggestedAccount)
