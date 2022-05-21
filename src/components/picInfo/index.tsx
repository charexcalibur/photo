/*
 * @Description: component for showing pic info
 * @Author: hayato
 * @Date: 2022-02-04 21:13:17
 * @LastEditors: hayato
 * @LastEditTime: 2022-05-12 18:36:45
 */
import React, { FC } from 'react'
import { PicInfo } from '@/pages/home/index.d'
import { createFromIconfontCN } from '@ant-design/icons'
import styles from './index.less'
import { Typography, Row, Col, Rate } from 'antd'

const { Text } = Typography

interface HaPicInfoProps {
  picInfo: PicInfo
  className: string
}

const CameraIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3168987_9kwbsb35jhc.js',
})

const HaPicInfo: FC<HaPicInfoProps> = (props) => {
  const { picInfo, className } = props
  const {
    aperture,
    equipments,
    focal_length,
    iso,
    shutter,
    location,
    rate,
    shooting_date,
  } = picInfo

  return (
    <div className={className}>
      <div className={styles.infoBlock}>
        <Text type='secondary'>评级</Text>
        <div>
          <Rate
            className={styles.infoRate}
            disabled
            defaultValue={rate}
            count={rate}
          ></Rate>
        </div>
      </div>
      <div className={styles.cameraBlock}>
        <Text type='secondary'>相机</Text>
        <div className={styles.infoBlockDesc}>
          <CameraIcon type='icon-xiangji'></CameraIcon>
          <Text type='secondary' className={styles.infoText}>
            {equipments[0].name}
          </Text>
        </div>
      </div>
      <div className={styles.jintouBlock}>
        <Text type='secondary'>镜头</Text>
        <div className={styles.infoBlockDesc}>
          <CameraIcon type='icon-jingtou'></CameraIcon>
          <Text type='secondary' className={styles.infoText}>
            {equipments[1].name}
          </Text>
        </div>
      </div>
      <div className={styles.infoBlock}>
        <Text type='secondary'>参数</Text>
        <div className={styles.infoBlockDesc}>
          <CameraIcon type='icon-z'></CameraIcon>
          <Text type='secondary' className={styles.infoText}>
            {aperture}
          </Text>
          <CameraIcon
            type='icon-jishiqi'
            className={styles.infoShutter}
          ></CameraIcon>
          <Text type='secondary' className={styles.infoText}>
            {shutter}
          </Text>
          <CameraIcon type='icon-iso' className={styles.infoIso}></CameraIcon>
          <Text type='secondary' className={styles.infoIso}>
            {iso}
          </Text>
          <CameraIcon
            type='icon-bim_jiaojuchangdu'
            className={styles.infoIso}
          ></CameraIcon>
          <Text type='secondary' className={styles.infoIso}>
            {focal_length}
          </Text>
        </div>
      </div>
      <div className={styles.addressBlock}>
        <Text type='secondary'>地点</Text>
        <div className={styles.infoBlockDesc}>
          <Text type='secondary'>{location}</Text>
        </div>
      </div>
      <div className={styles.dateBlock}>
        <Text type='secondary'>日期</Text>
        <div className={styles.infoBlockDesc}>
          <Text type='secondary' className={styles.infoIso}>
            {shooting_date}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default HaPicInfo
