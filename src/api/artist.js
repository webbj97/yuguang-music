/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-14 14:36:51
 */
import { request } from '@/utils';

export const getArtists = id => request.get(`/artists?id=${id}`);