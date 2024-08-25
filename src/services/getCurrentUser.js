import * as request from '~/utils/httpRequest'

export const getCurrentUser = async () => {
  try {
    const res = await request.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')} `,
      },
    })
      return res.data;
  } catch (error) {
    // console.log(error) 
  }
}
