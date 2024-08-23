import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Button from '~/components/Button'
import Form from '~/components/Form'
import FormInput from '~/components/Form/FormInput'

const cx = classNames.bind(styles)
function AuthenModal({showLogin, handleCloseLogin, handleShowLogin}) {
  const [showSignUp, setShowSignUp] = useState(false)
  const handleShowSignUp = () => setShowSignUp(true)
  const handleCloseSignUp = (e) => {
    setShowSignUp(false)
    e.preventDefault()
  }

  return (
    <>
      {/* Login modal */}
      <Modal show={showLogin} onHide={handleShowLogin} size="md" centered>
        <Modal.Header>
          <h2 className={cx('modal-title')}>Log in to TikTok</h2>
          <Button className={cx('btn-close')} size="small" onClick={handleCloseLogin}>
            &times;
          </Button>
        </Modal.Header>
        <Form action="" method="POST">
          <Modal.Body>
            <FormInput
              title="Email"
              error="Email không đúng định dạng"
              id="email"
              name="email"
              type="email"
              placeHolder="Email"
            ></FormInput>
            <FormInput
              title="Password"
              error="Mật khẩu có ít nhất 8 kí tự"
              id="password"
              name="password"
              type="password"
              minLength="8"
              placeHolder="Password"
            ></FormInput>
            <div className="d-flex mt-4 justify-content-center gap-2">
              <p className={cx('text')}>Don't have an account?</p>
              <button
                className={cx('link')}
                onClick={(e) => {
                  handleCloseLogin(e)
                  handleShowSignUp()
                }}
              >
                Sign up
              </button>
            </div>
            <div className="d-flex mt-5 justify-content-end gap-3">
              <Button
                outline
                onClick={(e) => {
                  handleCloseLogin(e)
                }}
              >
                Close
              </Button>
              <Button primary className={'submit-btn'}>Login</Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
      {/* Sign up modal */}
      <Modal show={showSignUp} onHide={handleCloseSignUp} size="md" centered>
        <Modal.Header>
          <h2 className={cx('modal-title')}>Sign up for TikTok</h2>
          <Button className={cx('btn-close')} size="small" onClick={handleCloseSignUp}>
            &times;
          </Button>
        </Modal.Header>
        <Form action="" method="POST">
          <Modal.Body>
            <FormInput
              title="Email"
              error="Email is not in correct format"
              id="email"
              name="email"
              type="email"
              placeHolder="Email"
            ></FormInput>
            <FormInput
              title="Password"
              error="Password has at least 8 characters"
              id="password"
              name="password"
              type="password"
              minLength="8"
              placeHolder="Password"
            ></FormInput>
            <FormInput
              title="Confirm password"
              error="Confirm password is not correct"
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeHolder="Confirm password"
            ></FormInput>
            <div className="d-flex mt-4 justify-content-center gap-2">
              <p className={cx('text')}>Already have an account?</p>
              <button
                className={cx('link')}
                onClick={(e) => {
                  handleCloseSignUp(e)
                  handleShowLogin()
                }}
              >
                Login
              </button>
            </div>
            <div className="d-flex mt-5 justify-content-end gap-3">
              <Button
                outline
                onClick={(e) => {
                  handleCloseSignUp(e)
                }}
              >
                Close
              </Button>
              <Button primary className={cx('submit-btn')}>Sign Up</Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  )
}

export default AuthenModal
