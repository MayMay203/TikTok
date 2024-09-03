import { useEffect, useRef, useState } from 'react'
import { NoVolumeIcon, PlayIcon, VolumeIcon } from '../Icon'
import styles from './VideoList.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
const cx = classNames.bind(styles)
const defaultFn = () => {}
function VideoItem({
  data,
  muted = true,
  handleMute = defaultFn,
  handleUnMute = defaultFn,
  isExplore = false,
  volume,
}) {
  const videoRef = useRef(null)
  const [isValidSrc, setIsValidSrc] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.onerror = () => {
        setIsValidSrc(false)
      }
      video.onloadeddata = () => {
        setIsValidSrc(true)
      }
    }
  }, [data.file_url])

  const handlePlay = () => {
    videoRef.current.play().catch((error) => {
      console.error('Video play failed', error)
    })
  }

  const handlePause = async () => {
    videoRef.current.pause()
  }

  if (!isValidSrc) return

  return (
    <div className="col">
      <div className={cx('container')} onMouseOver={handlePlay} onMouseOut={handlePause}>
        <video
          ref={videoRef}
          src={data.file_url}
          poster={data.thumb_url}
          className={cx('video')}
          muted={muted}
          loop
          volume={volume}
        ></video>
        <div className={cx('interact')}>
          <PlayIcon />
          <p className={cx('number')}>{`${
            data.likes_count + data.comments_count + data.shares_count + data.views_count
          }`}</p>
        </div>
        {isExplore && !muted && (
          <button className={cx('volume-btn')} onClick={() => handleMute(videoRef)}>
            <VolumeIcon />
          </button>
        )}
        {isExplore && muted && (
          <button className={cx('novolume-btn')} onClick={() => handleUnMute(videoRef)}>
            <NoVolumeIcon />
          </button>
        )}
      </div>
      <p className={cx('title')}>{data.description.substring(0, 15)}</p>
    </div>
  )
}

VideoItem.propTypes = {
  data: PropTypes.object.isRequired,
  handleMute: PropTypes.func,
  handleUnMute: PropTypes.func,
}

export default VideoItem
