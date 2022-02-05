/*
 * @Description: A component for Image
 * @Author: hayato
 * @Date: 2022-01-16 15:55:23
 * @LastEditors: hayato
 * @LastEditTime: 2022-02-04 21:52:18
 */
import styles from './index.less';
import { FC } from 'react';
import { Image } from 'antd';

interface HaImageProps {
  src: string;
  onClick?: () => void | undefined;
}

const HaImage: FC<HaImageProps> = (props) => {
  const { src, onClick } = props;
  return (
    <div>
      <Image src={src} preview={false} onClick={onClick}></Image>
    </div>
  );
};

export default HaImage;
