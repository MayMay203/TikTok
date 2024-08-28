import styles from './CommentList.module.scss'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const cx = classNames.bind(styles)
function CommentList({data}) {
    return (<div className={cx('wrapper')}>
        {data.map((item, index) => (
            <CommentItem key={index} data={item}/>
        ))}
    </div> );
}

CommentList.propTypes = {
    data: PropTypes.array,
}
export default CommentList;