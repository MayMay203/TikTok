import PropTypes from 'prop-types'
import VideoItem from './VideoItem'
import {useState } from 'react'

function VideoList({data}) {
  const [volume, setVolume] = useState(0)

  const handleMute = () => {
    setVolume(0)
  }

  const handleUnmute = () => {
    setVolume(0.4)
  }

  const handleVolume = (newVolume, videoRef) => {
    videoRef.current.volume = newVolume
    setVolume(newVolume)
  }

  return data.map((item, index) => (
    <VideoItem
      key={index}
      data={item}
      handleMute={handleMute}
      handleUnmute={handleUnmute}
      muted={volume === 0}
      handleVolume={handleVolume}
      volume = {volume}
    />
  ))
}

VideoList.propTypes = {
  data: PropTypes.array.isRequired,
}
export default VideoList
