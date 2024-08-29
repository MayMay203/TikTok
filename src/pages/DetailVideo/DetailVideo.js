import { Link, useLocation } from 'react-router-dom'
import styles from './DetailVideo.module.scss'
import classNames from 'classnames/bind'
import { useContext, useEffect, useRef, useState } from 'react'
import { getAVideo } from '~/services/getAVideo'
import Image from '~/components/Image'
import Button from '~/components/Button'
import VideoItem from './VideoItem'
import { MusicColorIcon } from '~/components/Icon'
import { followUser } from '~/services/followService'
import { unFollowUser } from '~/services/unFollowService'
import ButtonList from '../Home/ButtonList'
import { deleteComment } from '~/services/deleteComment'
import {
  ArrowUpIcon,
  EmbedIcon,
  FacebookIcon,
  PhoneIcon,
  RepostIcon,
  SendIcon,
  ShareVideoIcon,
} from '~/components/Icon/Icon'
import { getCommentsList } from '~/services/getCommentsList'
import CommentList from '~/components/CommentList'
import { UserContext } from '~/components/Context/UserContext'
import { createComment } from '~/services/createNewComment'
import { ErrorModalContext } from '~/components/Modal/ErrorModalContext'

const cx = classNames.bind(styles)
function DetailVideo() {
  const location = useLocation()
  const { uuid } = location.state || {}

  const [videoData, setVideoData] = useState({})
  const [userData, setUserData] = useState({})
  const [dataComment, setDataComment] = useState([])
  const [comment, setComment] = useState('')

  const containerRef = useRef(null)
  const arrowRef = useRef(null)
  const userContext = useContext(UserContext)
  const inputRef = useRef(null)

  const modal = useContext(ErrorModalContext)

  useEffect(() => {
    const getVideo = async () => {
      const data = await getAVideo(uuid)
      if (data) {
        setVideoData(data)
      }
    }

    getVideo()
  }, [uuid, dataComment])

  useEffect(() => {
    const getCommentList = async () => {
      const data = await getCommentsList(videoData.id)
      if (data) {
        setDataComment([...data])
      }
    }
    getCommentList()
  }, [videoData.id])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleScroll = () => {
    if (containerRef.current.scrollTop > 10) {
      arrowRef.current.style.display = 'block'
    }
  }

  useEffect(() => {
    const container = containerRef.current
    container.addEventListener('scroll', handleScroll)
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleFollow = async () => {
    const dataRes = await followUser(videoData.user_id)
    if (dataRes) {
      setUserData(dataRes)
    }
  }

  const handleUnFollow = async () => {
    const dataRes = await unFollowUser(videoData.user_id)
    if (dataRes) {
      setUserData(dataRes)
    }
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

  const handlePostComment = async () => {
    if (comment.trim() === '') {
      modal.setTitle('Error')
      modal.setMessage('Adding a new comment failed')
      modal.setIsShow(true)
      return
    }
    const data = await createComment(uuid, comment.trim())
    if (data) {
      modal.setTitle('Done')
      modal.setMessage('Adding a new comment successfully')
      modal.setIsShow(true)
      setDataComment((prev) => [data, ...prev])
      setComment('')
    }
  }

  const handleDeleteComment = async (idComment) => {
    if (window.confirm('Are you sure to delete this comment?')) {
      await deleteComment(idComment)
      setDataComment((prev) => prev.filter(comment => comment.id !== idComment))
    }
  }

  return (
    <div className={cx('wrapper')}>
      <VideoItem data={videoData} />
      <div className={cx('right')}>
        <div className={cx('container')} ref={containerRef}>
          <div className={cx('content')}>
            <div className={cx('info')}>
              <div className={cx('user')}>
                <Link to={`/@${videoData.user?.nickname}`} className={cx('user-profile')}>
                  <Image src={videoData.user?.avatar} alt={videoData.user?.nickname} className={cx('avatar')} />
                  <div className={cx('name')}>
                    <p className={cx('nickname')}>{videoData.user?.nickname}</p>
                    <div className={cx('more')}>
                      <p className={cx('fullname')}>{`${videoData.user?.first_name}  ${videoData.user?.last_name}`}</p>
                      <span className={cx('dot')}>.</span>
                      <time>{videoData.user?.published_at}</time>
                    </div>
                  </div>
                </Link>
                {!userData?.is_followed ? (
                  <Button primary onClick={handleFollow}>
                    Follow
                  </Button>
                ) : (
                  <Button text onClick={handleUnFollow}>
                    Following
                  </Button>
                )}
              </div>
              <p className={cx('description')}>{videoData.description}</p>

              {videoData.music && (
                <p className={cx('music')}>
                  <span>
                    <MusicColorIcon />
                  </span>
                  {videoData.music}
                </p>
              )}
            </div>
            <div className={cx('actions')}>
              {videoData && Object.keys(videoData).length > 0 && (
                <ButtonList data={videoData} dnone className={cx('custom-flex')} gap small />
              )}
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
            <CommentList data={dataComment} handleDeleteComment={handleDeleteComment} />
          </div>
          <button
            ref={arrowRef}
            className={cx('scroll-top-btn')}
            onClick={() => containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUpIcon className={cx('arrow-icon')} />
          </button>
        </div>
        {userContext.isLogin ? (
          <div className={cx('write-comment')}>
            <input
              ref={inputRef}
              type="text"
              className={cx('comment-input')}
              placeholder="Add comment..."
              value={comment}
              onChange={(e) => {
                e.target.value = e.target.value.trimStart()
                setComment(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePostComment()
                }
              }}
            />
            <button className={cx('post-btn')} onClick={handlePostComment}>
              Post
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default DetailVideo
