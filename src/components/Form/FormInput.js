import styles from './Form.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function FormInput({ id, title, error, name, className, ...props }) {
  return (
    <div className={cx('form-group', { [className]: className })}>
      <label className={cx('form-label')} htmlFor={id}>
        {title}
      </label>
      <input id={id} className={cx('form-input')} name={name} {...props} required></input>
      <p className={cx('form-error')}>{error}</p>
    </div>
  )
}

export default FormInput
