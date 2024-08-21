import PropTypes from 'prop-types';
import { memo } from 'react'
import AccountItem from '../AccountItem';
import classNames from 'classnames/bind';
import styles from './AccountList.module.scss'

const cx = classNames.bind(styles);
function AccountList({ data }) {  
  return (
    <div className={cx('account-list')}>
      {data.map((acc) => (
        <AccountItem key={acc.id} data={acc} />
      ))}
    </div>
  )
}

AccountList.propTypes = {
    data: PropTypes.array.isRequired
}

export default memo(AccountList);