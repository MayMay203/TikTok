import images from '~/assets/images'
import Image from '../Image'
import styles from './Form.module.scss'
import classNames from 'classnames/bind'
import { useRef } from 'react'

const cx = classNames.bind(styles)
function FormImage({ id, title, className, customWidth = false, alt, src, onImageChange }) {
  const inputRef = useRef(null)
  const handleClickAvatar = () => {
    inputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onImageChange(file)
    }
  }

  return (
    <div className={cx('form-group', { [className]: className })}>
      <label className={cx('form-label')} htmlFor={id}>
        {title}
      </label>
      <div id={id} className={cx('form-image', { customWidth })}>
        <input type='file' accept='image/*' ref={inputRef} hidden
        onChange={handleFileChange}></input>
        <Image
          src={src}
          alt={alt}
          className={cx('avatar')}
          onClick={handleClickAvatar}
        ></Image>
      </div>
    </div>
  )
}

export default FormImage
