import styles from './CommentItem.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import images from '~/assets/images'
import { HeartCommentIcon, HeartIcon, LikedIcon } from '~/components/Icon'
import Image from '~/components/Image'

const cx = classNames.bind(styles)
function CommentItem({ data }) {
  const { comment, likes_count, updated_at } = data
  const { nickname, avatar } = data.user
  return (
    <div className={cx('wrapper')}>
      <Link to={`/@${nickname}`}>
        <span>
          <Image className={cx('avatar')} src={avatar} alt={nickname}></Image>
        </span>
      </Link>
      <div className={cx('content')}>
        <Link to={`/@${nickname}`}>
          <span className={cx('nickname')}>{nickname}</span>
        </Link>
        <p className={cx('comment')}>{comment}</p>
        <time className={cx('time')}>{updated_at}</time>
      </div>
      <div className={cx('interact')}>
        <HeartCommentIcon />
        {/* <LikedIcon /> */}
        <span className={cx('number')}>{likes_count}</span>
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CommentItem
