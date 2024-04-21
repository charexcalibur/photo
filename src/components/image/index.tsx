/*
 * @Description: A component for Image
 * @Author: hayato
 * @Date: 2022-01-16 15:55:23
 * @LastEditors: hayato
 * @LastEditTime: 2022-11-27 00:22:22
 */
import styles from './index.less'
import React, { FC } from 'react'
// import { useIntersectionObserver } from './hooks'
import { Skeleton } from 'antd'

interface HaImageProps {
  src: {
    cdn_url: string
    color_range: string
    height: string
    id: number
    type: number
    uid: string
    width: string
  }[]
  onClick?: () => void | undefined
  onLoad?: () => void | undefined
  mode: string
  width: string
  height: string
  name: string
}

const makeAspectRatio = (width: string, height: string) => {
  if (parseInt(height) / parseInt(width) > 1) {
    return (parseInt(width) / parseInt(height)) * 100
  } else {
    return (parseInt(height) / parseInt(width)) * 100
  }
}

const HaImage: FC<HaImageProps> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  // useIntersectionObserver({
  //   target: ref,
  //   onIntersect: ([{ isIntersecting }], observerElement: any) => {
  //     if (isIntersecting) {
  //       setIsVisible(true)
  //       observerElement.unobserve(ref.current)
  //     }
  //   },
  // })
  const { src, onClick, mode, onLoad, width, height, name } = props

  return (
    <div
      ref={ref}
      className={mode === 'triple' ? styles.imageZoom : styles.imageContainer}
    >
      <img
        className={`${
          width > height ? styles.horizontalImage : styles.verticalImage
        }  ${styles.imageStyle} ${styles.full}`}
        src={src[0].cdn_url}
        loading='lazy'
        onClick={onClick}
      />
    </div>
  )
}

export default HaImage
