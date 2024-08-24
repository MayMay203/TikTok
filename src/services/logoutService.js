import * as request from '~/utils/httpRequest'
export const logout = async () => {
  const res = request.post(
    '/auth/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
  return res.data
}
