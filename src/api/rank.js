// 排行榜
import { request } from '@/utils'

export const getRankList = () => request.get('/toplist')