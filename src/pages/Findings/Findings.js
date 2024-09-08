import {useEffect, useState } from 'react'
import styles from './Findings.module.scss'
import classNames from 'classnames/bind'
import { useSearchParams } from 'react-router-dom'
import { search } from '~/services/searchService'
import UserItem from './UserItem'

const cx = classNames.bind(styles)
function Findings() {
  const [searchParames] = useSearchParams()
  const q = searchParames.get('q')
  console.log(q)

  const [dataSearch, setDataSearch] = useState([])
  useEffect(() => {
    const fetchApi = async () => {
      const data = await search(q, 'more')
      if (data) {
        setDataSearch(data)
      }
    }
    fetchApi()
  }, [q])
  return (
    <div className={cx('wrapper')}>
      {dataSearch.map((user) => (
        <UserItem data={user}></UserItem>
      ))}
    </div>
  )
}

export default Findings
