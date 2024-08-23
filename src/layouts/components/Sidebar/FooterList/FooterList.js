import styles from './FooterList.module.scss'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import {memo, useState } from 'react';
import FooterItem from './FooterItem';

const cx = classNames.bind(styles);
function FooterList({ dataList }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const handleOpenMenu = ((index) => {
       setActiveIndex(prev => prev === index? setActiveIndex(null): setActiveIndex(index))
    })
    return (<div className={cx('wrapper')}>
        {dataList.map((data,index) => (
            <FooterItem
                key={index}
                data={data}
                onClick={() => handleOpenMenu(index)}
                isActive = {activeIndex === index}
            />
        ))}
    </div>);
}

FooterList.propTypes = {
    dataList: PropTypes.array.isRequired
}
export default memo(FooterList)