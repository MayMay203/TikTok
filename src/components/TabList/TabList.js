import styles from './TabList.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { memo, useEffect, useRef, useState } from 'react'
import VideoList from '../VideoSmallList'
import { LockBigIcon } from '../Icon'

const cx = classNames.bind(styles)
function TabList({ icon, className, tablist = [], dataVideo = [], dataLikedVideo = [], children, nickname }) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedCtl, setSelectedCtl] = useState('0')

  const tabRefs = useState([])
  const lineRef = useRef()

  useEffect(() => {
    const tabItemRef = tabRefs[0].getBoundingClientRect()
    lineRef.current.style.width = `${tabItemRef.width}px`
    lineRef.current.style.left = `${tabItemRef.left - 264}px`
  }, [])

  const handleHoverTab = (e) => {
    const tabItemRect = e.currentTarget.getBoundingClientRect()
    lineRef.current.style.width = `${tabItemRect.width}px`
    lineRef.current.style.left = `${tabItemRect.left - 264}px`
  }

  const handleLeaveTab = () => {
    const tabItemRect = tabRefs[selectedTab].getBoundingClientRect()
    lineRef.current.style.width = `${tabItemRect.width}px`
    lineRef.current.style.left = `${tabItemRect.left - 264}px`
  }

  const handleClickTab = (index) => {
    setSelectedTab(index)
    const tabItemRect = tabRefs[index].getBoundingClientRect()
    lineRef.current.style.width = `${tabItemRect.width}px`
    lineRef.current.style.left = `${tabItemRect.left - 264}px`
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('tab-wrapper')}>
        <div className={cx('tab')}>
          {tablist.map((tab, index) => (
            <p
              ref={(el) => (tabRefs[index] = el)}
              key={index}
              className={cx('tab-item', { selected: selectedTab === index })}
              onMouseEnter={handleHoverTab}
              onMouseLeave={handleLeaveTab}
              onClick={() => handleClickTab(index)}
            >
              {index === 0 ? undefined : icon}
              <span className={cx({ [className]: className })}>{tab}</span>
            </p>
          ))}
          <div ref={lineRef} className={cx('tab-line')}></div>
        </div>

        {/* Controls */}
        {selectedTab === 0 ? (
          <div className={cx('control')}>
            <button
              data-index={0}
              className={cx('control-btn', { active: selectedCtl === '0' })}
              onClick={(e) => setSelectedCtl(e.target.dataset.index)}
            >
              Latest
            </button>
            <button
              data-index={1}
              className={cx('control-btn', { active: selectedCtl === '1' })}
              onClick={(e) => {
                setSelectedCtl(e.target.dataset.index)
              }}
            >
              Popular
            </button>
            <button
              data-index={2}
              className={cx('control-btn', { active: selectedCtl === '2' })}
              onClick={(e) => setSelectedCtl(e.target.dataset.index)}
            >
              Oldest
            </button>
          </div>
        ) : undefined}
      </div>
      {selectedTab === 0 ? (
        dataVideo && <VideoList dataVideo={dataVideo} />
      ) : selectedTab === 2 ? (
        dataLikedVideo && <VideoList dataVideo={dataLikedVideo} />
      ) : (
        <div className={cx('private-wrapper')}>
          <LockBigIcon />
          <p className={cx('private-title')}>This user's liked videos are private</p>
          <p className={cx('private-desc')}>
            Videos liked by <strong>{nickname}</strong> are currently hidden
          </p>
        </div>
      )}
    </div>
  )
}

TabList.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  classNames: PropTypes.string,
  tablist: PropTypes.array.isRequired,
  dataVideo: PropTypes.array,
  nickname: PropTypes.string,
}

export default memo(TabList)
