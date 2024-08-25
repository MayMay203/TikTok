import styles from './TabList.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import { memo, useEffect, useRef, useState } from 'react'

const cx = classNames.bind(styles)
function TabList({ icon, className, tablist = [], children, hasVideo }) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [type, setType] = useState(tablist[0])
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

  const handleClickTab = (index) => {
    setSelectedTab(index)
    setType(tablist[index])
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
              onClick={() => handleClickTab(index)}
            >
              {index === 0 ? undefined : icon}
              <span className={cx({ [className]: className })}>{tab}</span>
            </p>
          ))}
          <div ref={lineRef} className={cx('tab-line')}></div>
        </div>
        {children}
      </div>
    </div>
  )
}

TabList.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  classNames: PropTypes.string,
  tablist: PropTypes.array.isRequired,
  hasVideo: PropTypes.bool,
}

export default memo(TabList)
