import styles from './index.less'
import React, { FC, useState, useEffect } from 'react'
import { Modal, Image, Comment, List, Tooltip, Row, Col, Drawer } from 'antd'
import moment from 'moment'
import { PicInfo } from '@/pages/home/index.d'
import HaPicInfo from '@/components/picInfo'
import HaComment from '@/components/comment'
import { useParams } from 'react-router-dom'
import request from 'umi-request'

const Share = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [photo, setPhoto] = useState()

  const { id } = useParams()

  console.log(id)

  if (!id) {
    return <>no uid</>
  }

  useEffect(() => {
    setIsLoaded(false)
    request('https://api.axis-studio.org/wallpaper/wallpapers/', {
      method: 'GET',
      params: {
        uid: id,
      },
    }).then((res) => {
      console.log(res)
      setPhoto(res.results[0])
      setIsLoaded(true)
    })
  }, [id])

  if (!photo) {
    return <>no photo</>
  }

  return (
    <>
      <div className={styles.modelImageContainer}>
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <Image
              className={styles.modelImage}
              preview={false}
              src={photo.image_sizes.find((item) => item.type === 2).cdn_url}
            ></Image>
            {isLoaded ? (
              <HaPicInfo
                className={styles.HaPicInfoLayout}
                picInfo={photo}
              ></HaPicInfo>
            ) : (
              <div></div>
            )}
          </Col>
          <Col span={4}></Col>
        </Row>
      </div>
    </>
  )
}

export default Share
