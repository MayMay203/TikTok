import PropTypes from 'prop-types';
import VideoItem from './VideoItem'
import styles from './VideoList.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function VideoList({ dataVideo, classNames }) {
  return (
    <div
      className={cx(
        'wrapper',
          'row',
        'row-cols-xl-6',
        'row-cols-lg-5',
        'row-cols-md-4',
          'row-cols-sm-2',
        'gy-3',
        classNames,
      )}
    >
      {dataVideo.map((video, index) => (
        <VideoItem key={index} data={video} />
      ))}
    </div>
  )
}

VideoList.propTypes = {
  dataVideo: PropTypes.array.isRequired,
  classNames: PropTypes.string,
}

export default VideoList
