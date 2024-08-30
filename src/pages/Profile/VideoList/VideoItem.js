import { PlayIcon } from '../../../components/Icon'
import styles from './VideoList.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
const cx = classNames.bind(styles)
function VideoItem({ data }) {
  const handlePlay = async (e) => {
    await e.target.play()
  }

  const handlePause = async (e) => {
    await e.target.pause()
  }
  return (
    <div className="col">
      <div className={cx('container')}>
        <video
          src={data.file_url}
          poster={data.thumb_url}
          className={cx('video')}
          onMouseOver={handlePlay}
          onMouseOut={handlePause}
          muted
          loop
        ></video>
        <div className={cx('interact')}>
          <PlayIcon />
          <p className={cx('number')}>{`${
            data.likes_count + data.comments_count + data.shares_count + data.views_count
          }`}</p>
        </div>
      </div>
      <p className={cx('title')}>{data.description.substring(0, 15)}</p>
    </div>
  )
}

VideoItem.propTypes = {
  data: PropTypes.object.isRequired,
}

export default VideoItem
