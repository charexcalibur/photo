/*
 * @Description: A component for Image
 * @Author: hayato
 * @Date: 2022-01-16 15:55:23
 * @LastEditors: hayato
 * @LastEditTime: 2022-05-03 00:16:54
 */
import styles from './index.less';
import { FC } from 'react';
import { Image } from 'antd';

interface HaImageProps {
  src: string;
  onClick?: () => void | undefined;
  mode: string;
}

const HaImage: FC<HaImageProps> = (props) => {
  const { src, onClick, mode } = props;
  return (
    <div className={mode === 'triple' ? styles.imageZoom : null}>
      <Image src={src} preview={false} onClick={onClick}></Image>
    </div>
  );
};

export default HaImage;
