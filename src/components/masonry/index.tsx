/*
 * @Description: Description
 * @Author: hayato
 * @Date: 2021-03-06 16:20:25
 * @LastEditors: hayato
 * @LastEditTime: 2022-11-17 16:13:22
 */
import styles from './index.less'
import request from 'umi-request'
import React, { useState, useEffect } from 'react'
import { Layout, List, message, Spin, Divider, Card, Button } from 'antd'
const { Footer, Content, Header } = Layout
import InfiniteScroll from 'react-infinite-scroll-component'
import HaImage from '@/components/image'
import HaImageDetail from '@/components/imageDetail'
import { PicInfo, WallpaperResponse } from './index.d'
import HaPicInfo from '@/components/picInfo'
import HaComment from '@/components/comment'
import { createFromIconfontCN } from '@ant-design/icons'
import { queryPhotos } from './service'
import { history } from 'umi'
import Masonry from 'react-masonry-component'

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3168987_9kwbsb35jhc.js',
})

export default function MasonryScroll(props: any) {
  console.log('in masonry scroll')
  const [wallpaperList, setWallpaperList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
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
  const [loadedImageList, setLoadedImageList] = useState<any[]>([])
  const [showComment, setShowComment] = useState<number>(0)
  const [id, setId] = useState<number | undefined>(undefined)
  const [comments, setComments] = useState<any[]>([])
  const [ordering, setOrdering] = useState<string>('-rate')
  const [headerShouldHide, setHeaderShouldHide] = useState<boolean>(false)

  const { mode } = props

  const getContentHeight = () => {
    return window.innerHeight - 64 + 70
  }

  const calculateLimit = (containerHeight: number) => {
    return Math.round(containerHeight / 250)
  }

  const loadMoreData = async () => {
    console.log('load more data page: ', page)
    // const limit = calculateLimit(getContentHeight()) * 3 * 3 // 以三倍缓存
    const limit = mode === 'single' ? 3 : calculateLimit(getContentHeight()) * 3
    // const limit = 1
    if (!hasMore) {
      return
    }
    setLoading(true)
    const res = await queryPhotos({
      page: page,
      limit,
      ordering,
    }).catch((err) => {
      console.log('err: ', err)
      setPage(page)
      setHasMore(false)
      setLoading(false)
    })

    try {
      setWallpaperList([...wallpaperList, ...res.results])
      if (res.next != null) {
        setPage(page + 1)
        setHasMore(true)
        setLoading(false)
      } else {
        setPage(page)
        setHasMore(false)
        setLoading(false)
      }
    } catch {}
  }

  const initList = async () => {
    setWallpaperList([])
    const limit = mode === 'single' ? 3 : calculateLimit(getContentHeight()) * 9
    // const limit = 3
    console.log('limit: ', limit)
    setLoading(true)
    const res = await queryPhotos({
      page: 1,
      limit,
      ordering: ordering,
    }).catch((err) => {
      setPage(1)
      setHasMore(false)
      setLoading(false)
    })

    setWallpaperList([...res.results])
    if (res.next != null) {
      setPage(2)
      setHasMore(true)
      setLoading(false)
    } else {
      setPage(2)
      setHasMore(false)
      setLoading(false)
    }
  }

  const onScroll = () => {
    console.log('scrolling')
    const moveDistance = Math.max(
      document.body.scrollTop,
      document.documentElement.scrollTop,
    )
    console.log('moveDistance: ', moveDistance)
    if (moveDistance > 50) {
      setHeaderShouldHide(true)
    } else {
      setHeaderShouldHide(false)
    }
  }

  useEffect(() => {
    initList()
  }, [mode, ordering])

  const handleImageClick = (
    picInfo: PicInfo,
    uid: string,
    preview_url: string,
    comments: any[],
    id: number,
  ) => {
    console.log('handleImageClick')
    setHaDetailImageUrl(preview_url || '')
    setPicInfo(picInfo)
    setComments(comments)
    setId(id)
    setIsModelVisible(true)
  }

  const handleCancel = () => {
    setIsModelVisible(false)
    window.history.replaceState({}, '', '/')
  }

  return (
    <Layout>
      <div
        style={{
          width: '100%',
          height: headerShouldHide ? 50 : 0,
        }}
      ></div>
      <Header
        className={
          headerShouldHide
            ? `${styles.filterContainer} ${styles.filterContainerFixed} `
            : styles.filterContainer
        }
      >
        <Button
          className={styles.filterButton}
          type='link'
          style={{
            color: ordering === '-rate' ? '#505050' : '#ededed',
          }}
          onClick={() => {
            // jump to about page
            setOrdering('-rate')
          }}
        >
          精选
        </Button>
        <Button
          className={styles.filterButton}
          type='link'
          style={{
            color: ordering === '-shooting_date' ? '#505050' : '#ededed',
          }}
          onClick={() => {
            // jump to about page
            setOrdering('-shooting_date')
          }}
        >
          最新
        </Button>
      </Header>
      <Content className={styles.contentContainer}>
        <div
          id='scrollableDiv'
          style={{
            // height: getContentHeight(),
            overflow: 'auto',
          }}
          className={styles.scrollContainer}
        >
          <InfiniteScroll
            dataLength={wallpaperList.length}
            next={loadMoreData}
            onScroll={onScroll}
            hasMore={hasMore}
            scrollThreshold={0.2}
            loader={
              <div className={styles.loaderSpin}>
                <Spin />
              </div>
            }
            endMessage={<Divider plain></Divider>}
            // scrollableTarget='scrollableDiv'
          >
            <Masonry elementType={'div'} columns={3} spacing={2}>
              {wallpaperList.map((item: any) => {
                return (
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
                        name={item.name}
                        src={item.image_sizes}
                        width={
                          mode === 'single'
                            ? item.image_sizes[0].width
                            : item.image_sizes[1].width
                        }
                        height={
                          mode === 'single'
                            ? item.image_sizes[0].height
                            : item.image_sizes[1].height
                        }
                        onClick={() => {
                          if (mode === 'triple') {
                            console.log('triple')
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
                            window.history.pushState({}, '', item.uid)
                            return handleImageClick(
                              picInfo,
                              item.uid,
                              item.image_sizes[0].cdn_url,
                              item.comments,
                              item.id,
                            )
                          } else {
                            if (showComment === 0) {
                              setShowComment(item.id)
                            } else if (showComment === item.id) {
                              setShowComment(0)
                            } else {
                              setShowComment(item.id)
                            }
                          }
                        }}
                        onLoad={() =>
                          setLoadedImageList([...loadedImageList, item.id])
                        }
                      ></HaImage>
                      {mode === 'single' &&
                      loadedImageList.includes(item.id) ? (
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
                      {showComment === item.id ? (
                        <HaComment
                          comments={item.comments}
                          photo={item.id}
                        ></HaComment>
                      ) : null}
                    </Card>
                  </>
                )
              })}
            </Masonry>
            {/* <List
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
                      name={item.name}
                      src={item.image_sizes}
                      width={
                        mode === 'single'
                          ? item.image_sizes[0].width
                          : item.image_sizes[1].width
                      }
                      height={
                        mode === 'single'
                          ? item.image_sizes[0].height
                          : item.image_sizes[1].height
                      }
                      onClick={() => {
                        if (mode === 'triple') {
                          console.log('triple')
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
                          window.history.pushState({}, '', item.uid)
                          return handleImageClick(
                            picInfo,
                            item.uid,
                            item.image_sizes[0].cdn_url,
                            item.comments,
                            item.id,
                          )
                        } else {
                          if (showComment === 0) {
                            setShowComment(item.id)
                          } else if (showComment === item.id) {
                            setShowComment(0)
                          } else {
                            setShowComment(item.id)
                          }
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
                    {showComment === item.id ? (
                      <HaComment
                        comments={item.comments}
                        photo={item.id}
                      ></HaComment>
                    ) : null}
                  </Card>
                </>
              )} */}
          </InfiniteScroll>
        </div>
      </Content>
      <HaImageDetail
        visible={isModelVisible}
        onclose={handleCancel}
        src={haDetailImageUrl}
        picInfo={picInfo}
        comments={comments}
        id={id}
      ></HaImageDetail>
    </Layout>
  )
}
