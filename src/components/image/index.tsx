/*
 * @Description: A component for Image
 * @Author: hayato
 * @Date: 2022-01-16 15:55:23
 * @LastEditors: hayato
 * @LastEditTime: 2022-01-16 16:54:36
 */
import styles from './index.less'
import request from 'umi-request'
import React, { useState, useEffect } from 'react'
import { Image } from 'antd'

interface HaImageProps {
  src: string;
  onClick?: () => void | undefined;
}

export default function HaImage(props: HaImageProps) {
  const { src, onClick } = props
  return (
    <div>
      <Image
        src = {src}
        preview = {false}
        onClick={onClick}
      ></Image>
    </div>
  )
}