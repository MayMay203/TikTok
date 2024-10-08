import styles from './NewVideo.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import Video from './Video'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import { postNewVideo } from '~/services/postNewVideo'
import { toast } from 'react-toastify'
import { ThemeContext } from '../Context/ThemeContext'

const cx = classNames.bind(styles)
function NewVideo({ data, duration }) {
  const navigate = useNavigate()

  const [src, setSrc] = useState(URL.createObjectURL(data))
  const [description, setDescription] = useState('')
  const [music, setMusic] = useState('')
  const [viewable, setViewAble] = useState('public')
  const [allows, setAllows] = useState([])
  // const [thumbnailTime, setThumbnailTime] = useState(0)
  const themeContext = useContext(ThemeContext)

  const handleClickAllows = (e) => {
    const { id, checked } = e.target
    if (checked) {
      setAllows((prev) => [...prev, id])
    } else {
      setAllows((prev) => prev.filter((allow) => allow !== id))
    }
  }

  const handleChangeView = (e) => {
    setViewAble(e.target.value)
  }

  const handlePostVideo = async () => {
    console.log('Vo day!')
    const formData = new FormData()
    formData.append('description', description)
    formData.append('upload_file', data.name)
    formData.append('thumbnail_time', 5)
    formData.append('viewable', viewable)
    formData.append('allows', JSON.stringify(allows))
    const dataRes = await postNewVideo(formData)
    if (dataRes) {
      console.log(dataRes)
    } else {
      toast.error('Failed to post a new video', {
        theme: themeContext.theme ? 'dark' : 'light',
      })
    }
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content-top')}>
        <p className={cx('name')}>{data.name}</p>
        <div className={cx('duration')}>
          <p className={cx('duration-item')}>
            Size:
            <span className={cx('number')}>{(data.size / (1024 * 1024)).toFixed(2)}MB</span>
          </p>
          <p className={cx('duration-item')}>
            Duration:
            <span className={cx('number')}>{new Date(duration * 1000).toISOString().substring(14, 19)}</span>
          </p>
        </div>
      </div>
      <div className={cx('content-main')}>
        <Video src={src}></Video>
        <div className={cx('content-right')}>
          <div className={cx('content-item')}>
            <span className={cx('sub-title')}>Description</span>
            <div className={cx('text-description')}>
              <textarea
                rows={2}
                cols={65}
                className={cx('text')}
                value={description}
                maxLength={100}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              ></textarea>
              <span className={cx('count')}>{description.length}/100</span>
            </div>
          </div>
          <div className={cx('content-item')}>
            <span className={cx('sub-title')}>Music</span>
            <div className={cx('text-description')}>
              <textarea
                rows={1}
                cols={65}
                className={cx('text')}
                value={music}
                maxLength={50}
                onChange={(e) => {
                  setMusic(e.target.value)
                }}
              ></textarea>
              <span className={cx('count')}>{music.length}/50</span>
            </div>
          </div>
          <div className={cx('content-item')}>
            <span className={cx('sub-title')}>Who can watch this video?</span>
            <div className={cx('option-select')}>
              <select className={cx('select')} onChange={handleChangeView}>
                <option value="public">Public</option>
                <option value="friends">Friends</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          <div className={cx('content-item')}>
            <span className={cx('sub-title')}>Allow users to: </span>
            <div className={cx('options')}>
              <div className={cx('option-item')}>
                <input className={cx('checkbox')} type="checkbox" id="comment" hidden onChange={handleClickAllows} />
                <label className={cx('label')} htmlFor="comment" onClick={handleClickAllows}>
                  Comment
                </label>
              </div>
              <div className={cx('option-item')}>
                <input className={cx('checkbox')} type="checkbox" id="duet" hidden onChange={handleClickAllows} />
                <label className={cx('label')} htmlFor="duet">
                  Duet
                </label>
              </div>
              <div className={cx('option-item')}>
                <input className={cx('checkbox')} type="checkbox" id="stitch" hidden onChange={handleClickAllows} />
                <label className={cx('label')} htmlFor="stitch">
                  Stitch
                </label>
              </div>
            </div>
          </div>
          <div className={cx('actions')}>
            <Button text className={cx('btn')} onClick={() => navigate('/')}>
              Discard
            </Button>
            <Button primary className={cx('btn')} onClick={handlePostVideo}>
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

NewVideo.propTypes = {
  data: PropTypes.object.isRequired,
  duration: PropTypes.number.isRequired,
}

export default NewVideo
