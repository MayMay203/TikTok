import styles from './CommentList.module.scss'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import { memo } from 'react';

const cx = classNames.bind(styles)
function CommentList({ data }) {
    return (<div className={cx('wrapper')}>
        {data.map((item) => (
            <CommentItem key={item.id} data={item}/>
        ))}
    </div> );
}

CommentList.propTypes = {
    data: PropTypes.array,
}
export default memo(CommentList);