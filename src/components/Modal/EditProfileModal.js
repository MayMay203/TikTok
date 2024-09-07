import styles from './Modal.module.scss'
import classNames from 'classnames/bind'
import { useContext, useEffect, useState } from 'react'
import Form from '../Form'
import FormInput from '../Form/FormInput'
import { createContext } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import Button from '../Button'
import FormTextArea from '../Form/FormTextArea'
import FormImage from '../Form/FormImage'
import { UserContext } from '../Context/UserContext'
import { updateCurrentUser } from '~/services/updateCurrentUser'
import { toast } from 'react-toastify'
import { ThemeContext } from '../Context/ThemeContext'

const EditContext = createContext()
const cx = classNames.bind(styles)
function EditProfileProvider({ children }) {
  const userContext = useContext(UserContext)
  const themeContext = useContext(ThemeContext)

  const [avatar, setAvatar] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    if (userContext.currentUser) {
      setAvatar(userContext.currentUser.avatar)
      setFirstName(userContext.currentUser.first_name)
      setLastName(userContext.currentUser.last_name)
      setBio(userContext.currentUser.bio)
    }
  }, [userContext.currentUser])

  useEffect(() => {
    setIsFormValid(firstName?.length >= 2 && firstName?.length >= 2)
  }, [firstName, lastName])

  const handleShowEditModal = () => {
    setIsShow(true)
  }

  const handleCloseEditModal = () => {
    setIsShow(false)
  }

  const value = {
    handleShowEditModal,
    handleCloseEditModal,
  }

  const handleUpdateProfile = async () => {
    const formData = new FormData()

    formData.append('first_name', firstName)
    formData.append('last_name', lastName)
    formData.append('bio', bio)
    if (selectedFile) {
      formData.append('avatar', selectedFile)
    }

    const data = await updateCurrentUser(formData)
    if (data) {
      toast.success('Your profile has been updated', { theme: themeContext.theme ? 'dark' : 'light' })
      setIsShow(false)
    } else {
      toast.error("Failed to update current user's info", {
        theme: themeContext.theme ? 'dark' : 'light',
      })
    }
  }

  const handleImageChange = (file) => {
    setSelectedFile(file)
    setAvatar(URL.createObjectURL(file))
  }

  return (
    <EditContext.Provider value={value}>
      <Modal show={isShow} onHide={handleShowEditModal} size="md" centered>
        <Modal.Header className={cx('custom-background', 'custom-border-bg')}>
          <h2 className={cx('modal-title')}>Edit profile</h2>
          <Button className={cx('btn-close')} size="small" onClick={handleCloseEditModal}>
            &times;
          </Button>
        </Modal.Header>
        <Form onSubmit={handleUpdateProfile} className={cx('custom-background')}>
          <Modal.Body>
            <FormImage
              src={avatar}
              alt="avatar"
              className={cx('inline')}
              title="Profile photo"
              id="photo"
              customWidth
              onImageChange={handleImageChange}
            ></FormImage>
            <FormInput
              className={cx('inline')}
              title="First name"
              id="firstName"
              type="text"
              placeholder="first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              customWidth
            ></FormInput>
            <p className={cx('notice')}>Enter first name must have at least 2 characters</p>
            <FormInput
              className={cx('inline')}
              title="Last name"
              id="lastName"
              type="text"
              placeholder="last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              customWidth
            ></FormInput>
            <p className={cx('notice')}>Enter last name must have at least 2 characters</p>
            <FormTextArea
              className={cx('inline')}
              title="Bio"
              id="bio"
              type="text"
              placeholder="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              customWidth
            ></FormTextArea>
            <p className={cx('notice')}>{bio?.length}/80</p>
          </Modal.Body>
        </Form>
        <Modal.Footer className={cx('custom-background', 'custom-border-bg')}>
          <div className="d-flex justify-content-end gap-3 p-3">
            <Button type="button" outline onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button type="submit" primary onClick={handleUpdateProfile} disabled={!isFormValid}>
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {children}
    </EditContext.Provider>
  )
}
EditContext.propTypes = {
  children: PropTypes.node.isRequired,
}

export { EditProfileProvider, EditContext }
