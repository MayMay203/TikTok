import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useState, useEffect, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import Button from '~/components/Button'
import Form from '~/components/Form'
import FormInput from '~/components/Form/FormInput'
import { login } from '~/services/loginService'
import { register } from '~/services/registerService'
import { createContext } from 'react'
import PropTypes from 'prop-types'
import { UserContext } from '../Context/UserContext'
import { getCurrentUser } from '~/services/getCurrentUser'
import { toast } from 'react-toastify'
import { ThemeContext } from '../Context/ThemeContext'
// import 'react-toastify/dist/ReactToastify.css'

const cx = classNames.bind(styles)
const AuthContext = createContext()
function AuthProvider({ children }) {
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isConfirm, setIsConfirm] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const userContext = useContext(UserContext)
  const themeContext = useContext(ThemeContext)

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsFormValid(emailRegex.test(email) && password.length >= 8)
  }, [email, password])

  useEffect(() => {
    setIsConfirm(password === confirmPass)
  }, [confirmPass, , password])

  const handleShowSignUp = () => setShowSignUp(true)
  const handleShowLogin = () => setShowLogin(true)
  

  const handleCloseSignUp = () => {
    setShowSignUp(false)
    setEmail('')
    setPassword('')
  }

  const handleCloseLogin = () => {
    setShowLogin(false)
    setEmail('')
    setPassword('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await login(email, password)
    if (res) {
      toast.success('Login successfully', {
        theme: themeContext.theme ? 'dark' : 'light',
      })
      handleCloseLogin()
      userContext.toggleLogin()
      localStorage.setItem('token', res.meta.token)
      localStorage.setItem('isLogin', true)
      // Get current user
      userContext.setCurrentUser(await getCurrentUser())
    } else {
      toast.error('Email or password is not correct', {
        theme: themeContext.theme ? 'dark' : 'light',
      })
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    const data = await register(email, password)
    if (data) {
      handleCloseSignUp()
      setEmail('')
      setPassword('')
      handleShowLogin()
      toast.success('Sign up a new account successfully', {
        theme: themeContext.theme ? 'dark' : 'light',
      })
    } else {
      toast.error('Failed to sign up a new account', {
        theme: themeContext.theme ? 'dark' : 'light',
      })
    }
  }

  const value = {
    showLogin,
    showSignUp,
    handleCloseSignUp,
    handleCloseLogin,
    handleShowLogin,
    handleShowSignUp,
  }

  return (
    <AuthContext.Provider value={value}>
      {/* Login modal */}
      <Modal show={showLogin} onHide={handleCloseLogin} size="md" centered>
        <Modal.Header className={cx('custom-background', 'custom-border-bg')}>
          <h2 className={cx('modal-title')}>Log in to TikTok</h2>
          <Button className={cx('btn-close')} size="small" onClick={handleCloseLogin}>
            &times;
          </Button>
        </Modal.Header>
        <Form onSubmit={handleLogin} className={cx('custom-background')}>
          <Modal.Body>
            <FormInput
              title="Email"
              error="Email không đúng định dạng"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormInput>
            <FormInput
              title="Password"
              error="Mật khẩu có ít nhất 8 kí tự"
              id="password"
              type="password"
              minLength="8"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormInput>
            <div className="d-flex mt-4 justify-content-center gap-2">
              <p className={cx('text')}>Don't have an account?</p>
              <button
                type="button"
                className={cx('link')}
                onClick={() => {
                  handleCloseLogin()
                  handleShowSignUp()
                }}
              >
                Sign up
              </button>
            </div>
            <div className="d-flex mt-5 mb-4 justify-content-end gap-3">
              <Button type="button" outline onClick={handleCloseLogin}>
                Close
              </Button>
              <Button type="submit" primary onClick={handleLogin} disabled={!isFormValid}>
                Login
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
      {/* Sign up modal */}
      <Modal show={showSignUp} onHide={handleCloseSignUp} size="md" centered>
        <Modal.Header className={cx('custom-background', 'custom-border-bg')}>
          <h2 className={cx('modal-title')}>Sign up for TikTok</h2>
          <Button className={cx('btn-close')} size="small" onClick={handleCloseSignUp}>
            &times;
          </Button>
        </Modal.Header>
        <Form onSubmit={handleSignUp} className={cx('custom-background')}>
          <Modal.Body className={cx('custom-modal-background')}>
            <FormInput
              value={email}
              title="Email"
              error="Email is not in correct format"
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></FormInput>
            <FormInput
              value={password}
              title="Password"
              error="Password has at least 8 characters"
              id="password"
              type="password"
              minLength="8"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></FormInput>
            <FormInput
              value={confirmPass}
              title="Confirm password"
              error="Confirm password is not correct"
              id="confirm-password"
              type="password"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPass(e.target.value)}
              minLength="8"
              show={!isConfirm}
            ></FormInput>
            <div className="d-flex mt-4 justify-content-center gap-2">
              <p className={cx('text')}>Already have an account?</p>
              <button
                className={cx('link')}
                onClick={() => {
                  handleCloseSignUp()
                  handleShowLogin()
                }}
              >
                Login
              </button>
            </div>
            <div className="d-flex mt-5 mb-4 justify-content-end gap-3">
              <Button type="button" outline onClick={handleCloseSignUp}>
                Close
              </Button>
              <Button
                type="submit"
                primary
                className={cx('submit-btn')}
                disabled={!isFormValid || !isConfirm}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { AuthContext, AuthProvider }
