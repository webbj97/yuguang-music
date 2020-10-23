// 排行榜
import { requestLoading } from '@/utils'

export const getRankList = () => requestLoading.get('/toplist')