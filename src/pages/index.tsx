/*
 * @Description: Description
 * @Author: hayato
 * @Date: 2021-03-06 16:20:25
 * @LastEditors: hayato
 * @LastEditTime: 2022-01-11 00:00:10
 */
import styles from './index.less'
import request from 'umi-request'
import React, { useState, useEffect } from 'react'
import { Layout, PageHeader, Image, List, message, Spin, Skeleton, Divider } from 'antd'
const { Header, Footer, Content } = Layout;
import InfiniteScroll from 'react-infinite-scroll-component';

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

  const getContentHeight = () => {
    return window.innerHeight - 70 - 64
  }

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    request
      .get('https://api.axis-studio.org/wallpaper/wallpapers/', {
        params: {
          page: page,
          limit: 10
        }
      })
      .then(function(response: WallpaperResponse) {
        setWallpaperList([...wallpaperList, ...response.results])
        if(response.count < 3) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }
        setTotal(response.count)
        setPage(page+1)
        setLoading(false)

      })
      .catch(function(error) {
        setHasMore(false)
        setLoading(false);
      });
  }

  useEffect(() => {
    loadMoreData()
  }, []);


  return (
    <Layout>
      <Header>Header</Header>
      <Content className={styles.contentContainer}>
        <div
          id="scrollableDiv"
          style={{
            height: getContentHeight(),
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          <InfiniteScroll
            dataLength={wallpaperList.length}
            next={loadMoreData}
            hasMore={hasMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              itemLayout="vertical"
              grid={{ gutter: 12, column: 3 }}
              size="small"
              dataSource={wallpaperList}
              renderItem = {(item: any) => (
                <List.Item>
                  <Image
                    width={400}
                    src={item.image_sizes[1].cdn_url}
                    preview={{
                      src: item.image_sizes[0].cdn_url
                    }}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>

        </div>

      </Content>
      <Footer>Footer</Footer>
    </Layout>

  );
}
