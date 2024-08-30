import styles from './ButtonList.module.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'
import Image from '~/components/Image'
import Button from '~/components/Button'
import { AddIcon, CommentIcon, FavoriteIcon, HeartIcon, LikedIcon, ShareVideoIcon } from '~/components/Icon'
import { likeVideo } from '~/services/likeVideo'
import { useContext, useEffect, useState } from 'react'
import { unlikeVideo } from '~/services/unlikeVideo'
import { UserContext } from '~/components/Context/UserContext'
import { AuthContext } from '~/components/Modal/AuthModalContext'

const cx = classNames.bind(styles)
function ButtonList({ data, className, dnone, gap, small }) {
  const [dataVideo, setDataVideo] = useState(data)
  const { id, uuid, likes_count, comments_count, shares_count, views_count, is_liked } = dataVideo

  const { nickname, avatar } = dataVideo.user
  const userContext = useContext(UserContext)
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    setDataVideo(data)
  }, [data])

  const handleLikeUnlikeVideo = async () => {
    if (userContext.isLogin) {
      if (is_liked) {
        const data = await unlikeVideo(id)
        if (data) {
          setDataVideo(data)
        }
      } else {
        const data = await likeVideo(id)
        if (data) {
          setDataVideo(data)
        }
      }
    } else {
      authContext.handleShowLogin()
    }
  }

  const handleComment = () => {
    if (userContext.isLogin) {
      navigate(`/@${nickname}/video/${uuid}`, {
        state: {
          uuid,
        },
      })
    } else {
      authContext.handleShowLogin()
    }
  }

  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('post-user', { dnone })}>
        <Link to={`/@${nickname}`}>
          <Image src={avatar} alt={nickname} className={cx('user-avatar')} />
        </Link>
        <button className={cx('add-btn')}>
          <AddIcon />
        </button>
      </div>
      <div className={cx('item', className, { gap })}>
        <Button circle onClick={handleLikeUnlikeVideo} className={cx({ small })}>
          {!is_liked ? <HeartIcon /> : <LikedIcon />}
        </Button>
        <p className={cx('number')}>{likes_count ? likes_count : 0}</p>
      </div>
      <div className={cx('item', className, { gap })}>
        <Button circle onClick={handleComment} className={cx({ small })}>
          <CommentIcon />
        </Button>
        <p className={cx('number')}>{comments_count ? comments_count : 0}</p>
      </div>
      <div className={cx('item', className, { gap })}>
        <Button circle className={cx({ small })}>
          <FavoriteIcon />
        </Button>
        <p className={cx('number')}>{views_count ? views_count : 0}</p>
      </div>
      <div className={cx('item', { dnone })}>
        <Button circle className={cx({ small })}>
          <ShareVideoIcon />
        </Button>
        <p className={cx('number')}>{shares_count ? shares_count : 0}</p>
      </div>
    </div>
  )
}

ButtonList.propTypes = {
  data: PropTypes.object.isRequired,
  classNames: PropTypes.string,
  dnone: PropTypes.bool,
}

export default ButtonList
