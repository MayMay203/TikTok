import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'
import PropTypes from 'prop-types';

import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItems'
import Header from './Header'
import { useState } from 'react'

const cx = classNames.bind(styles)

const defaultFn = () => {}
function Menu({ children, items = [], onChange = defaultFn, hideOnClick = false, customHover=false}) {
  const [history, setHistory] = useState([{ data: items }])
  const current = history[history.length - 1]

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children
      return (
        <MenuItem
          customHover={customHover}
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children])
            } else {
              onChange(item)
            }
          }}
        />
      )
    })
  }

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1))
  }

  const renderResult = (attrs) => (
    <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
      <PopperWrapper className={cx('menu-popper')}>
        {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
        <div className={cx('menu-body')}> {renderItems()}</div>
      </PopperWrapper>
    </div>
  )

  // Rest to first page
  const handleReset = () => {
    setHistory((prev) => prev.slice(0, 1))
  }

  return (
    <div>
      <Tippy
        onHide={handleReset}
        delay={[0, 700]}
        interactive
        placement="bottom-end"
        offset={[10, 8]}
        hideOnClick={hideOnClick}
        render={renderResult}
      >
        {children}
      </Tippy>
    </div>
  )
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  hideOnClick: PropTypes.bool,
  customHover: PropTypes.bool
}
export default Menu
