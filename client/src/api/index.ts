import axios from 'axios'
import history from 'src/util/history'
import { objectToQueryString } from 'src/util/url'
import store from 'src/redux/store'
import { logout } from 'src/redux/auth'
import { showToast } from 'src/util/toast'

const BASE_URL = '/api'

const api = (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  variables: any
) =>
  new Promise((resolve, reject) => {
    const { accessToken } = store.getState().authState
    const headers = {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    }

    axios({
      url: `${BASE_URL}${url}`,
      method,
      headers,
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      paramsSerializer: objectToQueryString,
    })
      .then((response) => {
        resolve(response.data)
      },
      (error) => {
        // TODO: refresh token handling
        if (error.response) {
          const { code, message } = error.response.data
          if (code === 404) {
            if (message === 'Access token has expired') {
              history.push('/refresh-token')
            } else {
              showToast('error', 'Session expired')
              store.dispatch(logout())
              history.push('/login')
            }
          } else {
            reject(error)
          }
        } else {
          reject(error)
        }
      }
      )
  })

export default api
