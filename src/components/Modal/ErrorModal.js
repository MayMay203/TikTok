import { Modal } from "react-bootstrap";
import PropTypes from 'prop-types';
import styles from './Modal.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function ErrorModal({ title, message, show, onHide }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h2 className={cx('error-title')}>{title}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className={cx('error-msg')}>{message}</p>
            </Modal.Body>
        </Modal>
    );
}

ErrorModal.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired
}
export default ErrorModal;