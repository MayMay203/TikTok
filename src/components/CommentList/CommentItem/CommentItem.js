import styles from './CommentItem.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { useState, memo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '~/components/Context/UserContext'
import { HeartCommentIcon, LikedIcon, DeleteIcon } from '~/components/Icon'
import Image from '~/components/Image'
import { likeComment } from '~/services/likeComment'
import { unlikeComment } from '~/services/unLikeComment'

const cx = classNames.bind(styles)
function CommentItem({ data, handleDeleteComment }) {
  const [dataComment, setDataComment] = useState(data)
  const { id, comment, likes_count, updated_at, is_liked } = dataComment
  const { nickname, avatar } = dataComment.user
  const userContext = useContext(UserContext)

  const handleLikeComment = async () => {
    const data = await likeComment(id)
    if (data) {
      setDataComment(data)
    }
  }

  const handleUnlikeComment = async () => {
    const data = await unlikeComment(id)
    if (data) {
      setDataComment(data)
    }
  }

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
        {userContext.currentUser.id === dataComment.user.id && (
          <button className={cx('delete-btn')} onClick={() => handleDeleteComment(dataComment.id)}>
            <DeleteIcon />
          </button>
        )}
        {!is_liked && (
          <button onClick={handleLikeComment}>
            <HeartCommentIcon />
          </button>
        )}
        {is_liked && (
          <button onClick={handleUnlikeComment}>
            <LikedIcon width="2rem" height="2rem" />
          </button>
        )}
        <span className={cx('number')}>{likes_count}</span>
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  data: PropTypes.object.isRequired,
  handleDeleteComment: PropTypes.func.isRequired
}

export default memo(CommentItem)
