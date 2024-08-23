import * as request from '~/utils/httpRequest'

export const login = async (email, password) => {
    try {
      const res = await request.post('/auth/login', {
        email,
        password,
      })
        return res.data;
    } catch (error) {
      console.log('Login error: ', error)
    }
}