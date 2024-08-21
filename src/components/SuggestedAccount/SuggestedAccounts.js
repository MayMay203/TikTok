import styles from './SuggestedAccount.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import AccountItem from './AccountItem'
import { memo, useState } from 'react'

const cx = classNames.bind(styles)
function SuggestedAccount({ label, data }) {
    const [content, setContent] = useState('See more')
  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>
      {data.map((acc) => (
        <AccountItem key={acc.id} data={acc} />
      ))}
          <button className={cx('more-btn')} onClick={() => {
            content === 'See more'?setContent('See less'): setContent('See more')
          }}>{content}</button>
    </div>
  )
}

SuggestedAccount.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default memo(SuggestedAccount)
