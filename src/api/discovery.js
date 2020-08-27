/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-27 14:44:35
 */
import { request } from '@/utils';

export const getPersonalizedMv = () => {
    console.log('调用了getPersonalizedMv:', );
    request.get(`/personalized/mv`);
}