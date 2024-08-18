import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'

import styles from './Search.module.scss'
import { SearchIcon } from '~/components/Icon'

const cx = classNames.bind(styles)
function Search() {
  return (
    <div className={cx('search')}>
      <input type="text" className={cx('search-input')} placeholder="Search" spellCheck="false"></input>
      {/* Clear */}
      <button className={cx('clear')}>
        <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
      </button>
      {/* Loading */}
      <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
      <span className={cx('search-line')}></span>
      {/* Search Icon */}
      <button className={cx('search-btn')}>
        <SearchIcon className={cx('search-icon')} />
      </button>
    </div>
  )
}

export default Search
