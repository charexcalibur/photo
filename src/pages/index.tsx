/*
 * @Description: Description
 * @Author: hayato
 * @Date: 2021-03-06 16:20:25
 * @LastEditors: hayato
 * @LastEditTime: 2022-05-08 18:37:09
 */
import styles from './index.less'
import request from 'umi-request'
import React, { useState, useEffect } from 'react'
import {
  Layout,
  PageHeader,
  Image,
  List,
  message,
  Spin,
  Skeleton,
  Divider,
  Card,
  Button,
} from 'antd'
const { Footer, Content, Header } = Layout
import InfiniteScroll from 'react-infinite-scroll-component'
import HaImage from '@/components/image'
import HaImageDetail from '@/components/imageDetail'
import HaHeader from '@/components/header'
import { PicInfo, WallpaperResponse } from './index.d'
import HaPicInfo from '@/components/picInfo'

import { createFromIconfontCN } from '@ant-design/icons'

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3168987_9kwbsb35jhc.js',
})

export default function IndexPage() {
  const [wallpaperList, setWallpaperList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isModelVisible, setIsModelVisible] = useState(false)
  const [haDetailImageUrl, setHaDetailImageUrl] = useState('')
  const [picInfo, setPicInfo] = useState<PicInfo>({
    aperture: '',
    equipments: [],
    focal_length: '',
    iso: '',
    shutter: '',
    location: '',
    rate: 0,
    shooting_date: '',
  })
  const [mode, setMode] = useState('single')
  const [loadedImageList, setLoadedImageList] = useState<any[]>([])

  const getContentHeight = () => {
    console.log('getContentHeight')
    return window.innerHeight - 64
  }

  const calculateLimit = (containerHeight: number) => {
    return Math.round(containerHeight / 250)
  }

  const loadMoreData = () => {
    const limit = calculateLimit(getContentHeight()) * 3 * 3 // 以三倍缓存
    if (!hasMore) {
      return
    }
    setLoading(true)
    request
      .get('https://api.axis-studio.org/wallpaper/wallpapers/', {
        params: {
          page: page,
          limit,
        },
      })
      .then(function (response: WallpaperResponse) {
        setWallpaperList([...wallpaperList, ...response.results])
        if (response.next != null) {
          setPage(page + 1)
          setHasMore(true)
          setLoading(false)
        } else {
          setPage(page)
          setHasMore(false)
          setLoading(false)
        }
      })
      .catch(function (error) {
        console.log(error)
        setPage(page)
        setHasMore(false)
        setLoading(false)
      })
  }

  const onScroll = () => {
    console.log('scrolling')
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  const handleImageClick = (
    picInfo: PicInfo,
    uid?: string,
    preview_url?: string,
  ) => {
    console.log('handleImageClick')
    setHaDetailImageUrl(preview_url || '')
    setIsModelVisible(true)
    setPicInfo(picInfo)
  }

  const handleOk = () => {
    setIsModelVisible(false)
  }

  const handleCancel = () => {
    setIsModelVisible(false)
  }

  const singleMode = () => {
    console.log('change to single mode')
    setMode('single')
  }

  const tripleMode = () => {
    console.log('change to triple mode')
    setMode('triple')
  }

  return (
    <Layout>
      {/* <HaHeader></HaHeader> */}
      <Header className={styles.headerContainer}>
        <div className={styles.headerLeft}>Axis Studio</div>
        <div>
          <Button
            size='large'
            icon={<Icon type='icon-daliebiao'></Icon>}
            onClick={singleMode}
          ></Button>
          <Button
            size='large'
            icon={<Icon type='icon-dasuolvetuliebiao'></Icon>}
            onClick={tripleMode}
          ></Button>
        </div>
      </Header>
      <Content className={styles.contentContainer}>
        <div
          id='scrollableDiv'
          style={{
            height: getContentHeight(),
            overflow: 'auto',
          }}
          className={styles.scrollContainer}
        >
          <InfiniteScroll
            dataLength={wallpaperList.length}
            next={loadMoreData}
            onScroll={onScroll}
            hasMore={hasMore}
            loader={
              <div className={styles.loaderSpin}>
                <Spin />
              </div>
            }
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget='scrollableDiv'
          >
            <List
              itemLayout='vertical'
              grid={
                mode === 'single'
                  ? { gutter: 0, column: 1, xs: 1, sm: 1, md: 1, lg: 1 }
                  : { gutter: 0, column: 3, xs: 3, sm: 3, md: 3, lg: 3 }
              }
              size='large'
              dataSource={wallpaperList}
              renderItem={(item: any) => (
                <>
                  <Card
                    bordered={false}
                    hoverable={mode === 'single' ? false : true}
                    className={
                      mode === 'single' ? styles.singleItem : styles.listItem
                    }
                    bodyStyle={{ padding: 0 }}
                  >
                    <HaImage
                      mode={mode}
                      src={
                        mode === 'single'
                          ? item.image_sizes[0].cdn_url
                          : item.image_sizes[1].cdn_url
                      }
                      onClick={() => {
                        if (mode === 'triple') {
                          const picInfo = {
                            aperture: item.aperture,
                            equipments: item.equipments,
                            focal_length: item.focal_length,
                            iso: item.iso,
                            shutter: item.shutter,
                            rate: item.rate,
                            location: item.location,
                            shooting_date: item.shooting_date,
                          }
                          return handleImageClick(
                            picInfo,
                            item.uid,
                            item.image_sizes[0].cdn_url,
                          )
                        }
                      }}
                      onLoad={() =>
                        setLoadedImageList([...loadedImageList, item.id])
                      }
                    ></HaImage>
                    {mode === 'single' && loadedImageList.includes(item.id) ? (
                      <HaPicInfo
                        className={styles.HaPicInfoLayout}
                        picInfo={{
                          aperture: item.aperture,
                          equipments: item.equipments,
                          focal_length: item.focal_length,
                          iso: item.iso,
                          shutter: item.shutter,
                          rate: item.rate,
                          location: item.location,
                          shooting_date: item.shooting_date,
                        }}
                      ></HaPicInfo>
                    ) : null}
                  </Card>
                </>
              )}
            />
          </InfiniteScroll>
        </div>
      </Content>
      <HaImageDetail
        visible={isModelVisible}
        onclose={handleCancel}
        src={haDetailImageUrl}
        picInfo={picInfo}
      ></HaImageDetail>
    </Layout>
  )
}
