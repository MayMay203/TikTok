import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MenuItem.module.scss'
import classNames from 'classnames/bind';
import { faFlag } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
function MenuItem({fontSize='1.6rem', active}) {
    return (
      <div className={cx('wrapper', { active })}>
        <FontAwesomeIcon icon={faFlag} />
        <span className={cx('title')}>Report</span>
      </div>
    )
}

export default MenuItem;