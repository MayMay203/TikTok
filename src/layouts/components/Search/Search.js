import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'

import styles from './Search.module.scss'
import { SearchIcon } from '~/components/Icon'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountItem from '~/components/AccountItem'

const cx = classNames.bind(styles)
function Search() {
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    // setTimeout(() => {
    //   setSearchResult([1, 2, 3])
    // }, 0)
  }, [])

  return (
    <Tippy
      interactive
      visible={searchResult.length > 0}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx('search-title')}>Accounts</h4>
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
          </PopperWrapper>
        </div>
      )}
    >
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
    </Tippy>
  )
}

export default Search
