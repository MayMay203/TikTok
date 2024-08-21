import styles from './FooterList.module.scss'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { memo } from 'react';
import FooterItem from './FooterItem';

const cx = classNames.bind(styles);
function FooterList({dataList}) {
    return (<div className={cx('wrapper')}>
        {dataList.map((data,index) => (
            <FooterItem key={index} data={data} />
        ))}
    </div>);
}

FooterList.propTypes = {
    dataList: PropTypes.array.isRequired
}
export default memo(FooterList)