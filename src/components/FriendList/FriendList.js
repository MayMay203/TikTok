import styles from './FriendsItem.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import FriendItem from './FriendItem'

const cx = classNames.bind(styles)
function FriendList({ data }) {
  return (
    <div className={cx('wrapper')}>
      {data.map((friend, index) => (
        <FriendItem key={index} data={friend} />
      ))}
    </div>
  )
}

FriendList.propTypes = {
  data: PropTypes.array.isRequired,
}
export default FriendList
