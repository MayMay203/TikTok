import { useEffect, useState, useRef } from 'react'
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
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([1, 2, 3, 4])
  const [showResult, setShowResult] = useState(true)

  const inputRef = useRef()
  useEffect(() => {
    // setTimeout(() => {
    //   setSearchResult([1, 2, 3])
    // }, 0)
  }, [])

  const handleClear = () => {
    setSearchValue('')
    setSearchResult([])
    inputRef.current.focus()
  }

  const handleHideResult = () => {
    setShowResult(false)
  }

  return (
    <Tippy
      interactive
      visible={showResult && searchResult.length > 0}
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
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className={cx('search-input')}
          placeholder="Search"
          spellCheck="false"
          onFocus={()=> setShowResult(true)}
        ></input>
        {/* Clear */}
        {!!searchValue && (
          <button className={cx('clear')} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
          </button>
        )}
        {/* Loading */}
        {/* <FontAwesomeIcon icon={faSpinner} className={cx('loading')} /> */}
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
