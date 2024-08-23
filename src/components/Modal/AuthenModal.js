import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import Button from '~/components/Button'
import Form from '~/components/Form'
import FormInput from '~/components/Form/FormInput'
import { login } from '~/services/loginService'
import ErrorModal from './ErrorModal'

const cx = classNames.bind(styles)
function AuthenModal({ showLogin, handleCloseLogin, handleShowLogin }) {

  const [showSignUp, setShowSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsFormValid(emailRegex.test(email) && password.length >= 8)
  }, [email, password])

  const handleShowSignUp = () => setShowSignUp(true)
  const handleCloseSignUp = (e) => {
    setShowSignUp(false)
    e.preventDefault()
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password)
      console.log('Login successful:', data)
      handleCloseLogin()
      // Xử lý thêm sau khi login thành công (ví dụ: lưu thông tin user, chuyển hướng)
    } catch (error) {
      setIsError(true);
    }
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
        <Form onSubmit={handleLogin} method="POST">
          <Modal.Body>
            <FormInput
              title="Email"
              error="Email không đúng định dạng"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormInput>
            <FormInput
              title="Password"
              error="Mật khẩu có ít nhất 8 kí tự"
              id="password"
              name="password"
              type="password"
              minLength="8"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              <Button primary onClick={handleLogin} disabled={!isFormValid}>
                Login
              </Button>
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
        <Form action="">
          <Modal.Body>
            <FormInput
              value={email}
              title="Email"
              error="Email is not in correct format"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></FormInput>
            <FormInput
              value={password}
              title="Password"
              error="Password has at least 8 characters"
              id="password"
              name="password"
              type="password"
              minLength="8"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></FormInput>
            <FormInput
              title="Confirm password"
              error="Confirm password is not correct"
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Confirm password"
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
              <Button primary className={cx('submit-btn')}>
                Sign Up
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
      <ErrorModal title="Error Login" message="Email or password is not in correct" show={isError} onHide={()=>setIsError(false)}></ErrorModal>
    </>
  )
}

export default AuthenModal
