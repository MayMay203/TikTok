import Button from '../Button'
import { memo, useRef } from 'react'
import { UploadVideoIcon } from '../Icon'
import styles from './UploadVideo.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types';

const cx = classNames.bind(styles)
function UploadVideo({ onSelectVideo }) {
  const inputRef = useRef(null)

  const handleSelectVideo = () => {
    inputRef.current.click()
  }

  const handleSelectedVideo = (e) => {
    const file = e.target.files[0];
    if (file) {
     onSelectVideo(file)
    }
  }

  return (
    <div className={cx('wrapper')}>
      <input type="file" ref={inputRef} onChange={handleSelectedVideo} accept='video/*' hidden></input>
      <div className={cx('content')} onClick={handleSelectVideo}>
        <span>
          <UploadVideoIcon></UploadVideoIcon>
        </span>
        <h2 className={cx('title')}>Select video to upload</h2>
        <p className={cx('desc')}>Or drag and drop it here</p>
        <Button className={cx('upload-btn')} primary>
          Select Video
        </Button>
      </div>
    </div>
  )
}


UploadVideo.propTypes = {
  onSelectVideo: PropTypes.func.isRequired,
}
export default memo(UploadVideo)
