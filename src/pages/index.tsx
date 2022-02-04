/*
 * @Description: Description
 * @Author: hayato
 * @Date: 2021-03-06 16:20:25
 * @LastEditors: hayato
 * @LastEditTime: 2022-02-04 18:51:15
 */
import styles from './index.less'
import request from 'umi-request'
import React, { useState, useEffect } from 'react'
import { Layout, PageHeader, Image, List, message, Spin, Skeleton, Divider } from 'antd'
const { Footer, Content } = Layout;
import InfiniteScroll from 'react-infinite-scroll-component';
import HaImage from '@/components/image'
import HaImageDetail from '@/components/imageDetail'
import HaHeader from '@/components/header'

interface WallpaperResponseResultItem {
  add_time: string;
  aperture: string;
  categories: number[];
  des: string;
  equipment: string;
  focal_length: string;
  image_sizes: string[],
  iso: string;
  lens: string;
  location: string;
  modify_time: string;
  name: string;
  rate: number;
  shutter: string;
  tags: number[];
  uid: string;
}

interface WallpaperResponse {
  next: string;
  results: WallpaperResponseResultItem[];
  previous: string;
  count: number;
}

export default function IndexPage() {

  const [wallpaperList, setWallpaperList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isModelVisible, setIsModelVisible] = useState(false)
  const [haDetailImageUrl, setHaDetailImageUrl] = useState('')

  const getContentHeight = () => {
    return window.innerHeight - 64
  }

  const calculateLimit = (containerHeight: number) => {
    return Math.round(containerHeight/250)
  }

  const loadMoreData = () => {
    const limit = calculateLimit(getContentHeight())*3*3 // 以三倍缓存
    if (!hasMore) {
      return
    }
    setLoading(true);
    request
      .get('https://api.axis-studio.org/wallpaper/wallpapers/', {
        params: {
          page: page,
          limit
        }
      })
      .then(function(response: WallpaperResponse) {
        setWallpaperList([...wallpaperList, ...response.results])
        if (response.next != null) {
          setPage(page+1)
          setHasMore(true)
          setLoading(false)
        } else {
          setHasMore(false)
          setLoading(false)
        }
      })
      .catch(function(error) {
        console.log(error)
        setHasMore(false)
        setLoading(false)
      });
  }

  const onScroll = () => {
    console.log('scrolling')
  }

  useEffect(() => {
    loadMoreData()
  }, []);

  const handleImageClick = (uid?: string, preview_url?: string) => {
    console.log('click image: ', uid)
    console.log('click preview_url: ', preview_url)
    setHaDetailImageUrl(preview_url || '')
    setIsModelVisible(true)
  }

  const handleOk = () => {
    setIsModelVisible(false);
  };

  const handleCancel = () => {
    setIsModelVisible(false);
  };

  return (
    <Layout>
      <HaHeader></HaHeader>
      <Content className={styles.contentContainer}>
        <div
          id='scrollableDiv'
          style={{
            height: getContentHeight(),
            overflow: 'auto'
          }}
          className={styles.scrollContainer}
        >
          <InfiniteScroll
            dataLength={wallpaperList.length}
            next={loadMoreData}
            onScroll={onScroll}
            hasMore={hasMore}
            loader={<div className={styles.loaderSpin}><Spin /></div>}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget='scrollableDiv'
          >
            <List
              itemLayout='vertical'
              grid={{ gutter: 0, column: 3, xs: 1, sm: 1, md: 3, lg: 3 }}
              size='small'
              dataSource={wallpaperList}
              renderItem={(item: any) => (
                <div
                  className={styles.listItem}
                >
                  <HaImage
                    src={item.image_sizes[1].cdn_url}
                    onClick={() => handleImageClick(item.uid, item.image_sizes[0].cdn_url)}
                  ></HaImage>
                </div>
              )}
            />
          </InfiniteScroll>
        </div>
      </Content>
      <HaImageDetail
        visible={isModelVisible}
        onCancel={handleCancel}
        src={haDetailImageUrl}
      ></HaImageDetail>
    </Layout>
  );
}
