/*
 * @Description: A components to show image detail
 * @Author: hayato
 * @Date: 2022-01-16 16:14:40
 * @LastEditors: hayato
 * @LastEditTime: 2022-08-08 22:55:40
 */

import styles from './index.less'
import React, { FC, useState } from 'react'
import { Modal, Image, Comment, List, Tooltip, Row, Col, Drawer } from 'antd'
import moment from 'moment'
import { PicInfo } from '@/pages/home/index.d'
import HaPicInfo from '@/components/picInfo'
import HaComment from '@/components/comment'

interface HaImageDetailProps {
  uid?: string
  visible: boolean
  src: string
  picInfo: PicInfo
  onclose?: () => void
  comments: any[]
  id: number | undefined
}

const HaImageDetail: FC<HaImageDetailProps> = (props) => {
  const [isLoad, setIsLoad] = useState(false)

  const { visible, onclose, src, picInfo, comments, id } = props

  const getContentWidth = () => {
    return window.innerWidth
  }

  console.log('getContentWidth: ', getContentWidth())

  return (
    <>
      <Drawer
        className={styles.modelRoot}
        visible={visible}
        onClose={onclose}
        width={getContentWidth()}
        destroyOnClose={true}
        mask={false}
        afterVisibleChange={() => {
          isLoad ? setIsLoad(false) : setIsLoad(true)
        }}
      >
        <div
          className={
            getContentWidth() <= 414
              ? styles.modelImageContainerMobile
              : styles.modelImageContainer
          }
        >
          <Row>
            <Col span={4} onClick={onclose}></Col>
            <Col span={16}>
              <Image
                className={styles.modelImage}
                preview={false}
                src={src}
              ></Image>
              {isLoad ? (
                <HaPicInfo
                  className={styles.HaPicInfoLayout}
                  picInfo={picInfo}
                ></HaPicInfo>
              ) : (
                <div></div>
              )}
              <HaComment comments={comments} photo={id}></HaComment>
            </Col>
            <Col span={4} onClick={onclose}></Col>
          </Row>
        </div>
      </Drawer>
    </>
  )
}

export default HaImageDetail
