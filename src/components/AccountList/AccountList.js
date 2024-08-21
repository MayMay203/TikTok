import PropTypes from 'prop-types';
import { memo } from 'react'
import AccountItem from '../AccountItem';

function AccountList({ data }) {  
  return data.map((acc) => <AccountItem key={acc.id} data={acc} />)
}

AccountList.propTypes = {
    data: PropTypes.array.isRequired
}

export default memo(AccountList);