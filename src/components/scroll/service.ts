/*
 * @Description: scroll request
 * @Author: hayato
 * @Date: 2022-05-14 01:43:38
 * @LastEditors: hayato
 * @LastEditTime: 2022-05-14 01:48:17
 */
import request from 'umi-request'

export async function queryPhotos(params: any) {
  return request('https://api.axis-studio.org/wallpaper/wallpapers/', {
    method: 'GET',
    params,
  })
}
