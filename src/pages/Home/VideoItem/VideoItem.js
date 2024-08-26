import styles from './VideoItem.module.scss'
import { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Image from '~/components/Image'
import Button from '~/components/Button'
import { MusicIcon, NoVolumeIcon, PauseIcon, PlayVideoIcon, VolumeIcon } from '~/components/Icon/Icon'

const cx = classNames.bind(styles)
function VideoItem({ data, handleMute, handleUnmute, muted}) {

  const videoRef = useRef(null)
  const playRef = useRef(null)
  const pauseRef = useRef(null)

  const { thumb_url, file_url, description, music } = data
  const { nickname, avatar } = data.user

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

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <video ref={videoRef} src={file_url} poster={thumb_url} className={cx('video')} muted={muted === true}></video>
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
            <div>
              <input type="range" min={0} max={100} step={1} className={cx('input-volume')} />
            </div>
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
      {/* <div className={cx('actions')}> */}
      {/* <div className={cx('post-user')}>
                    <Link to={`/@${nickname}`}>
                        <Image src={avatar} alt={nickname} />
                    </Link>
                    <Button circle></Button>
               </div> */}
      {/* </div> */}
    </div>
  )
}

VideoItem.propTypes = {
  data: PropTypes.object.isRequired,
}

export default VideoItem
