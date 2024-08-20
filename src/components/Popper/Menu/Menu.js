import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'

import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItems'
import Header from './Header'
import { useState } from 'react'

const cx = classNames.bind(styles)

const defaultFn = () => {}
function Menu({ children, items = [], onChange = defaultFn, hideOnClick = false}) {
  const [history, setHistory] = useState([{ data: items }])
  const current = history[history.length - 1]

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children
      return (
        <MenuItem
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
  return (
    <Tippy
      onHide={() => {
        setHistory(prev => prev.slice(0,1))
      }}
      delay={[0, 700]}
      interactive
      placement="bottom-end"
      offset={[10, 8]}
      hideOnClick = {hideOnClick}
      render={(attrs) => (
        <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx('menu-popper')}>
            {history.length > 1 && (
              <Header
                title={current.title}
                onBack={() => {
                  setHistory((prev) => prev.slice(0, prev.length - 1))
                }}
              />
            )}
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  )
}

export default Menu
