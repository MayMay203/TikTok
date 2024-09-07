import * as request from '~/utils/httpRequest'

const postNewVideo = async (formData) => {
  try {
    const res = await request.post('/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return res.data
  } catch (error) {
    console.log('Error post new video: ', error)
  }
}

export { postNewVideo }
