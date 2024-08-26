import PropTypes from 'prop-types'
import VideoItem from './VideoItem'
import {useState } from 'react'

function VideoList({data}) {
  const [muted, setMuted] = useState(true)
  const handleMute = () => {
    setMuted(true)
  }

  const handleUnmute = () => {
    setMuted(false)
  }
  return data.map((item) => <VideoItem key={item.id} data={item} handleMute={handleMute} handleUnmute={handleUnmute} muted={muted}/>)
}

VideoList.propTypes = {
  data: PropTypes.array.isRequired,
}
export default VideoList
