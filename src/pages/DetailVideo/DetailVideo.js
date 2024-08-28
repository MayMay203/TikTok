import { Link, useParams, useLocation } from 'react-router-dom'
import styles from './DetailVideo.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { getAVideo } from '~/services/getAVideo'
import Image from '~/components/Image'
import Button from '~/components/Button'
import VideoItem from './VideoItem'
import { MusicColorIcon } from '~/components/Icon'
import { followUser } from '~/services/followService'
import { unFollowUser } from '~/services/unFollowService'
import ButtonList from '../Home/ButtonList'
import {
  EmbedIcon,
  FacebookIcon,
  PhoneIcon,
  RepostIcon,
  SendIcon,
  ShareIcon,
  ShareVideoIcon,
} from '~/components/Icon/Icon'
import { getCommentsList } from '~/services/getCommentsList'
import CommentList from '~/components/CommentList'

const cx = classNames.bind(styles)
function DetailVideo() {
  const location = useLocation()
  const { uuidList, currentIndex, data } = location.state || {}
  const [videoData, setVideoData] = useState(data)
  const [dataUser, setDataUser] = useState(data.user)
  const [dataComment, setDataComment] = useState([])
  const [index, setIndex] = useState(currentIndex)

  const { id, user_id } = videoData
  const { nickname, avatar, first_name, last_name, is_followed } = dataUser

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getAVideo(uuidList[index])
      if (data) {
        setVideoData(data)
      }
    }
    fetchApi()
  }, [index])

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getCommentsList(id);
      if (data) {
        setDataComment(data)
      }
    }
    fetchApi();
  },[index])

  const handleFollow = async () => {
    const dataRes = await followUser(user_id)
    setDataUser(dataRes)
  }

  const handleUnFollow = async () => {
    const dataRes = await unFollowUser(user_id)
    setDataUser(dataRes)
  }

  const handleCopyToClipBoard = () => {
    const link = window.location.href
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert('Like copied to clipboard!')
      })
      .catch(() => {
        alert('Failed to copy!')
      })
  }

  return (
    <div className={cx('wrapper')}>
      <VideoItem data={videoData} />
      <div className={cx('container')}>
      <div className={cx('content')}>
          <div className={cx('info')}>
            <div className={cx('user')}>
              <Link to={`/@${nickname}`} className={cx('user-profile')}>
                <Image src={avatar} alt={nickname} className={cx('avatar')} />
                <div className={cx('name')}>
                  <p className={cx('nickname')}>{nickname}</p>
                  <div className={cx('more')}>
                    <p className={cx('fullname')}>{`${first_name}  ${last_name}`}</p>
                    <span className={cx('dot')}>.</span>
                    <time>{data.published_at}</time>
                  </div>
                </div>
              </Link>
              {!is_followed ? (
                <Button primary onClick={handleFollow}>
                  Follow
                </Button>
              ) : (
                <Button text onClick={handleUnFollow}>
                  Following
                </Button>
              )}
            </div>
            <p className={cx('description')}>{data.description}</p>
            <p className={cx('music')}>
              <span>
                <MusicColorIcon />
              </span>
              {data.music}
            </p>
          </div>
          <div className={cx('actions')}>
            <ButtonList data={videoData} dnone className={cx('custom-flex')} gap small />
            <div className={cx('brands')}>
              <RepostIcon className={cx('round')} />
              <EmbedIcon />
              <SendIcon />
              <FacebookIcon />
              <PhoneIcon />
              <button className={cx('share-btn')}>
                <ShareVideoIcon className={cx('share-icon')} />
              </button>
            </div>
          </div>
          <div className={cx('link-wrapper')}>
            <p className={cx('link')}>{window.location.href}</p>
            <button className={cx('copy-btn')} onClick={handleCopyToClipBoard}>
              Copy link
            </button>
          </div>
      </div>
        <div className={cx('comments')}>
          <CommentList data={dataComment} />
          {/* <div className={cx('write-comment')}>
            <textarea type='text' className={cx('comment-area')} placeholder='Add comment...'/>
            <button className={cx('post-btn')}>Post</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default DetailVideo
