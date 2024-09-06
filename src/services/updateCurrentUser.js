import * as request from '~/utils/httpRequest'

const updateCurrentUser = async (formData) => {
  try {
    formData.forEach((key, value) => console.log(key, value))
    const res = await request.post('auth/me?_method=PATCH', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return res.data
  } catch (error) {
    console.log('Error update current user: ', error)
  }
}

export { updateCurrentUser }
