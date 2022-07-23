/*
 * @Description: A component for Image
 * @Author: hayato
 * @Date: 2022-01-16 15:55:23
 * @LastEditors: hayato
 * @LastEditTime: 2022-07-23 13:40:32
 */
import styles from './index.less'
import React, { FC } from 'react'
import { useIntersectionObserver } from './hooks'
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

const HaImage: FC<HaImageProps> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState<boolean>(false)
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false)
  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement: any) => {
      if (isIntersecting) {
        setIsVisible(true)
        observerElement.unobserve(ref.current)
      }
    },
  })
  const { src, onClick, mode, onLoad, width, height, name } = props
  const aspectRatio = (parseInt(height) / parseInt(width)) * 100

  return (
    <div
      ref={ref}
      style={{
        paddingBottom: `${aspectRatio}%`,
      }}
      className={mode === 'triple' ? styles.imageZoom : styles.imageContainer}
    >
      {isVisible && (
        <React.Fragment>
          <img
            className={`${styles.image} ${styles.thumb}`}
            src={src.find((item) => item.type === 3).cdn_url}
            style={{ visibility: isLoaded ? 'hidden' : 'visible' }}
            onLoad={onLoad}
          />
          <img
            className={`${styles.image}  ${styles.imageStyle} ${styles.full}`}
            onLoad={() => {
              setIsLoaded(true)
            }}
            style={{
              opacity: isLoaded ? 1 : 0,
            }}
            src={src.find((item) => item.type === 2).cdn_url}
            loading='lazy'
            onClick={onClick}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default HaImage
