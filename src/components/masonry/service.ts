import request from 'umi-request'

export async function queryPhotos(params: any) {
  return request('https://api.axis-studio.org/wallpaper/wallpapers/', {
    method: 'GET',
    params,
  })
}
