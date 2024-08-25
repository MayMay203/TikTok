import * as request from '~/utils/httpRequest'
export const getAnUser = async (nickname) => {
  try {
    const res = await request.get(`/users/@${nickname}`)
    return res.data
  } catch (error) {
    console.log('Error get an user: ', error)
  }
}
