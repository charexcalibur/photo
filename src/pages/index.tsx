/*
 * @Description: Description
 * @Author: hayato
 * @Date: 2021-03-06 16:20:25
 * @LastEditors: hayato
 * @LastEditTime: 2021-04-22 23:05:34
 */
import styles from './index.less'
import request from 'umi-request'
import React, { useState, useEffect } from 'react'
import { Layout, PageHeader, Image, List, message, Spin } from 'antd'

const { Header, Footer, Content } = Layout;

export default function IndexPage() {

  const [wallpaperList, setWallpaperList] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    request
      .get('https://api.axis-studio.org/wallpaper/wallpapers/', {
        params: {
          page: page,
          limit: 1
        }
      })
      .then(function(response) {
        setWallpaperList(response.results)
        if(response.count < 10) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }
        setTotal(response.count)
        setLoading(false)
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  console.log('loading: ', loading)
  console.log('hasMore: ', hasMore)

  const handleChangePage = (page: number) => {
    request
      .get('https://api.axis-studio.org/wallpaper/wallpapers/', {
        params: {
          page: page,
          limit: 1
        }
      })
      .then(function(response) {
        setWallpaperList(response.results)
        if(response.count < 10) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }
        setTotal(response.count)
        setLoading(false)
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  return (
    <Layout>
      <Header>Header</Header>
      <Content className={styles.contentContainer}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: handleChangePage,
            total: total,
            pageSize: 1,
          }}
          dataSource={wallpaperList}
          footer={
            <div>
              <b>ant design</b> footer part
            </div>
          }
          renderItem = {item => (
            <Image
              width={1200}
              src={item.wallpaper_url}
              preview={{
                src: item.wallpaper_url,
              }}
            />
          )}
        />
      </Content>
      <Footer>Footer</Footer>
    </Layout>

  );
}
