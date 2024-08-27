import styles from './ButtonList.module.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Image from '~/components/Image'
import Button from '~/components/Button'
import { AddIcon, CommentIcon, FavoriteIcon, HeartIcon, ShareIcon, ShareVideoIcon } from '~/components/Icon'

const cx = classNames.bind(styles)
function ButtonList({ data }) {
    const { likes_counts, comments_count, shares_count, views_count} = data
  const { nickname, avatar } = data.user
  return (
    <div className={cx('wrapper')}>
      <div className={cx('post-user')}>
        <Link to={`/@${nickname}`}>
          <Image src={avatar} alt={nickname} className={cx('user-avatar')} />
        </Link>
        <button className={cx('add-btn')}>
          <AddIcon />
        </button>
      </div>
      <div className={cx('item')}>
        <Button circle>
          <HeartIcon />
        </Button>
        <p className={cx('number')}>{likes_counts?likes_counts:0}</p>
      </div>
      <div className={cx('item')}>
        <Button circle>
          <CommentIcon />
        </Button>
        <p className={cx('number')}>{comments_count?comments_count:0}</p>
      </div>
      <div className={cx('item')}>
        <Button circle>
          <FavoriteIcon />
        </Button>
        <p className={cx('number')}>{views_count?views_count:0}</p>
      </div>
      <div className={cx('item')}>
        <Button circle>
          <ShareVideoIcon />
        </Button>
        <p className={cx('number')}>{shares_count?shares_count:0}</p>
      </div>
    </div>
  )
}

ButtonList.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ButtonList
