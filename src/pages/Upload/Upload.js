import styles from './Upload.module.scss'
import classNames from 'classnames/bind'
import { useCallback, useState } from 'react'
import NewVideo from '~/components/NewVideo/NewVideo'
import UploadVideo from '~/components/UploadVideo/UploadVideo'

const cx = classNames.bind(styles)
function Upload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [duration, setDuration] = useState(0)

  const handleSelectedVideo = useCallback((file) => {
    setSelectedFile(file)

    const videoElement = document.createElement('video')
    videoElement.src = URL.createObjectURL(file) 
    videoElement.onloadedmetadata = () => {
      setDuration(videoElement.duration) 
    }
  }, [])

  return (
    <div className={cx('wrapper')}>
      {!selectedFile && <UploadVideo onSelectVideo={handleSelectedVideo}></UploadVideo>}
          {selectedFile && <NewVideo data={selectedFile} duration={duration} />}
    </div>
  )
}

export default Upload
