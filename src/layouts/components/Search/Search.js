import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'

import styles from './Search.module.scss'
import { SearchIcon } from '~/components/Icon'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountItem from '~/components/AccountItem'
import useDebounce from '~/hook/useDebounce'
import * as searchService from '~/apiServices/searchService'

const cx = classNames.bind(styles)
function Search() {
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [showResult, setShowResult] = useState(true)
  const [loading, setLoading] = useState(false)

  const debounced = useDebounce(searchValue, 500)

  const inputRef = useRef()
  useEffect(() => {
    if (!searchValue) {
      setSearchResult([])
      return
    }

    const fetchApi = async () => {
      setLoading(true)

      const data = await searchService.search(debounced)
      setSearchResult(data)

      setLoading(false)
    }

    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

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
            {searchResult.map((data) => (
              <AccountItem key={data.id} data={data} />
            ))}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          value={searchValue}
          onChange={(e) => {
            e.target.value = e.target.value.trimStart()
            setSearchValue(e.target.value)
          }}
          type="text"
          className={cx('search-input')}
          placeholder="Search"
          spellCheck="false"
          onFocus={() => setShowResult(true)}
        ></input>
        {/* Clear */}
        {!!searchValue && !loading && (
          <button className={cx('clear')} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
          </button>
        )}
        {/* Loading */}
        {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />}
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
