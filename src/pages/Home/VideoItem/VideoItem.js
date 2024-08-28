import styles from './VideoItem.module.scss'
import { useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'
import { MusicIcon, NoVolumeIcon, PauseIcon, PlayVideoIcon, VolumeIcon } from '~/components/Icon/Icon'
import ButtonList from '../ButtonList'

const cx = classNames.bind(styles)
const defaultFn = () => {}
function VideoItem({ data, handleMute = defaultFn, handleUnmute = defaultFn, muted, handleVolume = defaultFn, volume, uuidList, index}) {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const playRef = useRef(null)
  const pauseRef = useRef(null)

  const { thumb_url, file_url, description, music } = data
  const { nickname} = data.user

  useEffect(() => {
    const handlePlayPause = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (videoRef.current.readyState >= 3) {
              videoRef.current.play()
              playRef.current.style.display = 'none'
              pauseRef.current.style.display = 'block'
            }
          }, 200)
        } else {
          videoRef.current.pause()
          pauseRef.current.style.display = 'none'
          playRef.current.style.display = 'block'
        }
      })
    }

    const observer = new IntersectionObserver(handlePlayPause, {
      threshold: 0.5,
    })

    observer.observe(videoRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleEnded = () => {
    playRef.current.style.display = 'block'
    pauseRef.current.style.display = 'none'
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <video
          ref={videoRef}
          src={file_url}
          poster={thumb_url}
          className={cx('video')}
          muted={muted}
          onEnded={handleEnded}
          volume={volume}
          onClick={() => {
            navigate(`/@${data.user.nickname}/video/${data.uuid}`, {
              state: {
                uuidList,
                currentIndex: index,
                data,
              }
            })
          }}
        ></video>
        <div className={cx('control')}>
          <button
            ref={playRef}
            className={cx('play-btn')}
            onClick={() => {
              videoRef.current.play()
              pauseRef.current.style.display = 'block'
              playRef.current.style.display = 'none'
            }}
          >
            <PlayVideoIcon className={cx('custom-icon')} />
          </button>
          <button
            ref={pauseRef}
            className={cx('pause-btn')}
            onClick={() => {
              videoRef.current.pause()
              playRef.current.style.display = 'block'
              pauseRef.current.style.display = 'none'
            }}
          >
            <PauseIcon className={cx('custom-icon')} />
          </button>
          <div className={cx('volume')}>
            {!muted && (
              <input
                value={volume}
                type="range"
                min={0}
                max={1}
                step={0.01}
                className={cx('input-volume')}
                onChange={(e) => handleVolume(e.target.value, videoRef)}
              />
            )}
            {muted || (
              <button className={cx('volume-btn')} onClick={handleMute}>
                <VolumeIcon className={cx('custom-icon')} />
              </button>
            )}
            {muted && (
              <button className={cx('novolume-btn')} onClick={handleUnmute}>
                <NoVolumeIcon className={cx('custom-icon')} />
              </button>
            )}
          </div>
        </div>
        <div className={cx('info')}>
          <Link to={`/@${nickname}`}>
            <h2 className={cx('author')}>{nickname}</h2>
          </Link>
          <p className={cx('desc')}>{description}</p>
          {music && (
            <p>
              <MusicIcon />
              <span className={cx('music-link')}>{music}</span>
            </p>
          )}
        </div>
      </div>
      <ButtonList data={data} />
    </div>
  )
}

VideoItem.propTypes = {
  data: PropTypes.object.isRequired,
  handleMute: PropTypes.func.isRequired,
  handleUnmute: PropTypes.func.isRequired,
  muted: PropTypes.bool.isRequired,
  handleVolume: PropTypes.func.isRequired,
  uuidList: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired
}

export default VideoItem
