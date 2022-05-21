/*
 * @Description: interfaces
 * @Author: hayato
 * @Date: 2022-02-04 19:23:14
 * @LastEditors: hayato
 * @LastEditTime: 2022-05-12 20:21:11
 */

export interface Equipments {
  name: string
  type: string
  brand: string
}

export interface PicInfo {
  aperture: string
  equipments: Equipments[]
  focal_length: string
  iso: string
  rate: number
  shutter: string
  location: string
  shooting_date: string
}

export interface WallpaperResponseResultItem {
  add_time: string
  aperture: string
  categories: number[]
  des: string
  equipment: string
  focal_length: string
  image_sizes: string[]
  iso: string
  lens: string
  location: string
  modify_time: string
  name: string
  rate: number
  shutter: string
  tags: number[]
  uid: string
}

export interface WallpaperResponse {
  next: string
  results: WallpaperResponseResultItem[]
  previous: string
  count: number
}
