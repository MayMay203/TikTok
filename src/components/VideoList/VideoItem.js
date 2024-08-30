import styles from './VideoItem.module.scss'
import { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'
import {
  Arrow,
  CloseIcon,
  MusicIcon,
  NoVolumeIcon,
  PauseIcon,
  PlayFillIcon,
  PlayVideoIcon,
  VolumeIcon,
} from '~/components/Icon'
import ButtonList from '../../pages/Home/ButtonList'

const cx = classNames.bind(styles)
const defaultFn = () => {}
function VideoItem({
  data,
  handleMute = defaultFn,
  handleUnmute = defaultFn,
  handleVolume = defaultFn,
  volume,
  dnone = false,
  customWidth = false,
  customBg = false,
  customHeight = false,
  customBorderRadius = false,
  customBtn = false,
  customMargin = false,
  isDetail = false,
  handleBackVideo = defaultFn,
  handleNextVideo = defaultFn,
}) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [rangeValue, setRangValue] = useState(0)

  const navigate = useNavigate()
  const videoRef = useRef(null)
  const playRef = useRef(null)
  const pauseRef = useRef(null)
  const playVideoRef = useRef(null)

  const { thumb_url, file_url, description, music } = data
  const { nickname } = data.user

  useEffect(() => {
    const video = videoRef.current
    const handleTimeUpdate = () => {
      const currentTime = video.currentTime
      setCurrentTime(currentTime)
      setRangValue((currentTime / video.duration) * 100)
    }
    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  useEffect(() => {
    const handlePlayPause = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (videoRef.current.readyState >= 3) {
              videoRef.current.play()
              setIsPlaying(true)
            }
          }, 200)
        } else {
          videoRef.current.pause()
          setIsPlaying(false)
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
    setIsPlaying(false)
  }

  const handleClose = () => {
    navigate(-1)
  }

  const handleRangeChange = (e) => {
    const video = videoRef.current
    const newValue = parseFloat(e.target.value)
    const newTime = (newValue / 100) * video.duration
    video.currentTime = newTime
    setCurrentTime(newTime)
    setRangValue(e.target.value)
  }
  return (
    <div className={cx('wrapper', { customWidth, customHeight, customBorderRadius })}>
      <div className={cx('container')}>
        <video
          ref={videoRef}
          src={file_url}
          poster={thumb_url}
          className={cx('video')}
          muted={volume === 0}
          onEnded={handleEnded}
          volume={volume}
          autoPlay
          onClick={() => {
            if (!isPlaying) {
              videoRef.current.play()
              if (playVideoRef.current) {
                playVideoRef.current.style.display = 'block'
              }
            } else {
              videoRef.current.pause()
            }
            setIsPlaying((prev) => !prev)
          }}
        ></video>
        {!isPlaying && isDetail && (
          <button
            className={cx('video-btn')}
            ref={playVideoRef}
            onClick={() => {
              videoRef.current.play()
              setIsPlaying((prev) => !prev)
            }}
          >
            <PlayFillIcon className={cx('video-play-btn')} />
          </button>
        )}
        <div className={cx({ customBg })} style={{ backgroundImage: `url(${thumb_url})` }}></div>
        <div className={cx('control')}>
          {!isPlaying && (
            <button
              ref={playRef}
              className={cx('play-btn', { dnone })}
              onClick={() => {
                videoRef.current.play()
                setIsPlaying(true)
              }}
            >
              <PlayVideoIcon className={cx('custom-icon')} />
            </button>
          )}
          {isPlaying && (
            <button
              ref={pauseRef}
              className={cx('pause-btn', { dnone })}
              onClick={() => {
                videoRef.current.pause()
                setIsPlaying(false)
              }}
            >
              <PauseIcon className={cx('custom-icon')} />
            </button>
          )}
          {isDetail && (
            <div className={cx('time-wrapper')}>
              <input
                value={rangeValue}
                type="range"
                max={100}
                min={0}
                className={cx('time-range')}
                onChange={handleRangeChange}
              ></input>
              <p className={cx('time')}>{new Date(currentTime * 1000).toISOString().substring(11, 19)}</p>
              <p className={cx('time')}>/{data.meta.playtime_string}</p>
            </div>
          )}
          <div className={cx('volume', { customMargin })}>
            {volume === 0 || (
              <input
                value={volume}
                type="range"
                min={0}
                max={1}
                step={0.01}
                className={cx('input-volume')}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value)
                  handleVolume(newVolume, videoRef)
                }}
              />
            )}
            {volume === 0 || (
              <button className={cx('volume-btn', { customBtn })} onClick={handleMute}>
                <VolumeIcon className={cx('custom-icon')} />
              </button>
            )}
            {volume === 0 && (
              <button className={cx('novolume-btn', { customBtn })} onClick={handleUnmute}>
                <NoVolumeIcon className={cx('custom-icon')} />
              </button>
            )}
          </div>
        </div>
        {isDetail && (
          <button className={cx('close-btn', { customBtn })} onClick={handleClose}>
            <CloseIcon className={cx('custom-icon')} />
          </button>
        )}

        {isDetail && (
          <button className={cx('previous-btn', { customBtn })} onClick={handleBackVideo}>
            <Arrow className={cx('custom-icon')} />
          </button>
        )}

        {isDetail && (
          <button className={cx('next-btn', { customBtn })} onClick={handleNextVideo}>
            <Arrow className={cx('custom-icon')} />
          </button>
        )}
        <div className={cx('info', { dnone })}>
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
      <ButtonList data={data} className={cx({ dnone })} />
    </div>
  )
}

VideoItem.propTypes = {
  data: PropTypes.object.isRequired,
  handleMute: PropTypes.func.isRequired,
  handleUnmute: PropTypes.func.isRequired,
  handleVolume: PropTypes.func.isRequired,
  dnone: PropTypes.bool,
  customWidth: PropTypes.bool,
  customBg: PropTypes.bool,
  customHeight: PropTypes.bool,
  customBorderRadius: PropTypes.bool,
  customBtn: PropTypes.bool,
  customMargin: PropTypes.bool,
  isDetail: PropTypes.bool,
  handleBackVideo: PropTypes.func,
  handleNextVideo: PropTypes.func,
}

export default VideoItem
