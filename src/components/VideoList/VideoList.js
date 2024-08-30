import PropTypes from 'prop-types'
import VideoItem from './VideoItem'
import { useState } from 'react'

function VideoList({
  data,
  dnone,
  customWidth,
  customBg,
  customHeight,
  customBorderRadius,
  customBtn,
  customMargin,
  isDetail,
  play,
  handleNextVideo,
  handleBackVideo,
  handleFollow,
  handleUnFollow,
  customObjectFit
}) {
  const [volume, setVolume] = useState(0)
  const [prevVolume, setPrevVolume] = useState(localStorage.getItem('volume'))

  const handleMute = () => {
    localStorage.setItem('volume', 0)
    setPrevVolume(volume)
    setVolume(0)
  }

  const handleUnmute = () => {
    localStorage.setItem('volume', prevVolume)
    setVolume(prevVolume)
  }

  const handleVolume = (newVolume, videoRef) => {
    videoRef.current.volume = newVolume
    localStorage.setItem('volume', newVolume)
    setVolume(newVolume)
  }

  return data.map((item, index) => {
    return (
      <VideoItem
        key={index}
        data={item}
        handleMute={handleMute}
        handleUnmute={handleUnmute}
        muted={volume === 0}
        handleVolume={handleVolume}
        volume={volume}
        dnone={dnone}
        customWidth={customWidth}
        customBg={customBg}
        customHeight={customHeight}
        customBorderRadius={customBorderRadius}
        customBtn={customBtn}
        customMargin={customMargin}
        isDetail={isDetail}
        play={play}
        handleBackVideo={handleBackVideo}
        handleNextVideo={handleNextVideo}
        handleFollow={handleFollow}
        handleUnFollow={handleUnFollow}
        customObjectFit={customObjectFit}
      />
    )
  })
}

VideoList.propTypes = {
  data: PropTypes.array.isRequired,
  dnone: PropTypes.bool,
  customWidth: PropTypes.bool,
  customBg: PropTypes.bool,
  customHeight: PropTypes.bool,
  customBorderRadius: PropTypes.bool,
  customBtn: PropTypes.bool,
  mleft: PropTypes.bool,
  isDetail: PropTypes.bool,
  play: PropTypes.bool,
  handleBackVideo: PropTypes.func,
  handleNextVideo: PropTypes.func,
  handleFollow: PropTypes.func,
  handleUnFollow: PropTypes.func,
  customObjectFit: PropTypes.bool
}
export default VideoList
