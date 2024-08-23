import PropTypes from 'prop-types';
import styles from './Form.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function Form({children, action, method }) {
    return (
        <form action={action} className={cx('form')} method={method}>
            {children}
        </form>
    );
}

Form.propTypes = {
    children: PropTypes.node.isRequired,
    action: PropTypes.string.isRequired, 
    method: PropTypes.string.isRequired,
}

export default Form;