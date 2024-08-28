import styles from './VideoItem.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import Button from '~/components/Button'
import { CloseIcon, NoVolumeIcon, VolumeIcon } from '~/components/Icon'

const cx = classNames.bind(styles)
function VideoItem({ data, muted }) {
  const { file_url, thumb_url } = data
  const videoRef = useRef()
  return (
    <div className={cx('wrapper')}>
      <video ref={videoRef} src={file_url} poster={thumb_url} className={cx('video')} muted={muted}></video>
      {/* <Button circle className={cx('close-btn')}>
        <CloseIcon />
      </Button>
      {muted || (
        <Button circle className={cx('volume-btn')}>
          <VolumeIcon />
        </Button>
      )}
      {muted && (
        <Button circle className={cx('novolume-btn')}>
          <NoVolumeIcon />
        </Button>
      )} */}
    </div>
  )
}

VideoItem.propTypes = {
  data: PropTypes.object.isRequired,
  // handleVolume: PropTypes.func.isRequired,
}

export default VideoItem
