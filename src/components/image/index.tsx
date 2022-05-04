/*
 * @Description: A component for Image
 * @Author: hayato
 * @Date: 2022-01-16 15:55:23
 * @LastEditors: hayato
 * @LastEditTime: 2022-05-04 21:27:25
 */
import styles from './index.less'
import { FC } from 'react'
import { Image } from 'antd'

interface HaImageProps {
  src: string
  onClick?: () => void | undefined
  onLoad?: () => void | undefined
  mode: string
}

const HaImage: FC<HaImageProps> = (props) => {
  const { src, onClick, mode, onLoad } = props
  return (
    <div className={mode === 'triple' ? styles.imageZoom : null}>
      <Image
        className={mode === 'single' ? styles.imageStyle : null}
        src={src}
        preview={false}
        onClick={onClick}
        onLoad={onLoad}
      ></Image>
    </div>
  )
}

export default HaImage
