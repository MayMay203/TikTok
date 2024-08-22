import styles from './FooterList.module.scss'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles)
function FooterItem({ data, onClick, isActive}) {
    return (<div className={cx('footer-item')}>
        <h4 className={cx('footer-title')} onClick={onClick}>{data.title}</h4>
        <ul className={cx('footer-links', {isActive})}>
            {data.items.map((item, index) => (
                <li key={index}>
                    <a href={item.href} className={cx('footer-link')}>{item.title}</a>
                </li>
            ))}
        </ul>
    </div> );
}

FooterItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
}

export default FooterItem;