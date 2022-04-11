import { request } from '@utils'

export const getSimiPlaylists = (id, option) => request.get(`/simi/playlist?id=${id}`, option)