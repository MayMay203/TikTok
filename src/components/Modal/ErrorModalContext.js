import { Modal } from "react-bootstrap";
import PropTypes from 'prop-types';
import styles from './Modal.module.scss'
import classNames from "classnames/bind";
import { createContext, useState } from "react";
import Button from "../Button";

const cx = classNames.bind(styles);
const ErrorModalContext = createContext()
function ErrorModalProvider({children}) {
    const [isShow, setIsShow] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('')
    const value = {
        setTitle,
        setMessage,
        setIsShow
    }
    
    return (
      <ErrorModalContext.Provider value={value}>
        <Modal show={isShow} onHide={() => setIsShow(false)}>
          <Modal.Header className={cx('custom-background', 'custom-border-bg')}>
            <h2 className={cx('error-title')}>{title}</h2>
            <Button className={cx('btn-close')} size="small" onClick={()=>{setIsShow(false)}}>
              &times;
            </Button>
          </Modal.Header>
          <Modal.Body className={cx('custom-background')}>
            <p className={cx('error-msg')}>{message}</p>
          </Modal.Body>
        </Modal>
        {children}
      </ErrorModalContext.Provider>
    )
}

ErrorModalProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export {ErrorModalContext, ErrorModalProvider};