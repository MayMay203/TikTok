import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './DetailVideo.module.scss'
import classNames from 'classnames/bind'
import { useContext, useEffect, useRef, useState } from 'react'
import { getAVideo } from '~/services/getAVideo'
import Image from '~/components/Image'
import Button from '~/components/Button'
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
import { getVideosList } from '~/services/getVideosList'
import VideoList from '~/components/VideoList'
import { ThemeContext } from '~/components/Context/ThemeContext'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)
function DetailVideo() {
  const location = useLocation()
  const navigate = useNavigate()
  const { uuid } = location.state || {}

  const [videosList, setVideosList] = useState([])
  const [page, setPage] = useState(1)

  const [videoData, setVideoData] = useState({})
  const [videoIndex, setVideoIndex] = useState(-1)
  const [userData, setUserData] = useState({})
  const [dataComment, setDataComment] = useState([])
  const [comment, setComment] = useState('')

  const containerRef = useRef(null)
  const arrowRef = useRef(null)
  const userContext = useContext(UserContext)
  const inputRef = useRef(null)

  const themeContext = useContext(ThemeContext)
  // Get list data
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getVideosList('for-you', page)
      if (result) {
        setVideosList((prev) => [...prev, ...result])
      }
    }
    fetchApi()
  }, [page])

  const handleScrollbar = () => {
    window.addEventListener('scroll', () => {
      if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
        setPage(page + 1)
      }
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollbar)
    return () => {
      window.removeEventListener('scroll', handleScrollbar)
    }
  }, [])

  useEffect(() => {
    const getVideo = async () => {
      const data = await getAVideo(uuid)
      if (data) {
        setVideoData(data)
        const index = videosList.findIndex((video) => video.id === videoData.id)
        setVideoIndex(index)
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
      toast.error('Failed to add a new comment', {
        theme: themeContext.theme ? 'dark' : 'light',
      })
      return
    }
    const data = await createComment(uuid, comment.trim())
    if (data) {
      toast.success('A new comment has been posted', {
        theme: themeContext.theme ? 'dark' : 'light',
      })
      setDataComment((prev) => [data, ...prev])
      setComment('')
    }
  }

  const handleDeleteComment = async (idComment) => {
    if (window.confirm('Are you sure to delete this comment?')) {
      await deleteComment(idComment)
      setDataComment((prev) => prev.filter((comment) => comment.id !== idComment))
    }
  }

  const handleBackVideo = () => {
    if (videoIndex > 0) {
      navigate(`/@${videosList[videoIndex - 1].user.nickname}/video/${videosList[videoIndex].uuid}`, {
        state: {
          uuid: videosList[videoIndex - 1].uuid,
        },
        replace: true,
      })
    }
  }

  const handleNextVideo = () => {
    if (videoIndex < videosList.length - 1) {
      navigate(`/@${videosList[videoIndex + 1].user.nickname}/video/${videosList[videoIndex].uuid}`, {
        state: {
          uuid: videosList[videoIndex + 1].uuid,
        },
        replace: true,
      })
    }
  }

  return (
    <div className={cx('wrapper')}>
      {videoIndex !== -1 && (
        <VideoList
          data={[videoData]}
          dnone
          customWidth
          customBg
          customHeight
          customBorderRadius
          customBtn
          customMargin
          isDetail
          play
          handleNextVideo={handleBackVideo}
          handleBackVideo={handleNextVideo}
          customObjectFit
        />
      )}
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
