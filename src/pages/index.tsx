/*
 * @Description: Description
 * @Author: hayato
 * @Date: 2021-03-06 16:20:25
 * @LastEditors: hayato
 * @LastEditTime: 2022-02-05 22:32:48
 */
import styles from './index.less';
import request from 'umi-request';
import React, { useState, useEffect } from 'react';
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
} from 'antd';
const { Footer, Content } = Layout;
import InfiniteScroll from 'react-infinite-scroll-component';
import HaImage from '@/components/image';
import HaImageDetail from '@/components/imageDetail';
import HaHeader from '@/components/header';
import { PicInfo, WallpaperResponse } from './index.d';

export default function IndexPage() {
  const [wallpaperList, setWallpaperList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [haDetailImageUrl, setHaDetailImageUrl] = useState('');
  const [picInfo, setPicInfo] = useState<PicInfo>({
    aperture: '',
    equipments: [],
    focal_length: '',
    iso: '',
    shutter: '',
    location: '',
    rate: 0,
    shooting_date: '',
  });

  const getContentHeight = () => {
    console.log('getContentHeight');
    return window.innerHeight - 64;
  };

  const calculateLimit = (containerHeight: number) => {
    return Math.round(containerHeight / 250);
  };

  const loadMoreData = () => {
    const limit = calculateLimit(getContentHeight()) * 3 * 3; // 以三倍缓存
    if (!hasMore) {
      return;
    }
    setLoading(true);
    request
      .get('https://api.axis-studio.org/wallpaper/wallpapers/', {
        params: {
          page: page,
          limit,
        },
      })
      .then(function (response: WallpaperResponse) {
        setWallpaperList([...wallpaperList, ...response.results]);
        if (response.next != null) {
          setPage(page + 1);
          setHasMore(true);
          setLoading(false);
        } else {
          setHasMore(false);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setHasMore(false);
        setLoading(false);
      });
  };

  const onScroll = () => {
    console.log('scrolling');
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const handleImageClick = (
    picInfo: PicInfo,
    uid?: string,
    preview_url?: string,
  ) => {
    console.log('handleImageClick');
    setHaDetailImageUrl(preview_url || '');
    setIsModelVisible(true);
    setPicInfo(picInfo);
  };

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
          id="scrollableDiv"
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
            loader={
              <div className={styles.loaderSpin}>
                <Spin />
              </div>
            }
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              itemLayout="vertical"
              grid={{ gutter: 0, column: 3, xs: 3, sm: 3, md: 3, lg: 3 }}
              size="small"
              dataSource={wallpaperList}
              renderItem={(item: any) => (
                <Card bordered={false} hoverable className={styles.listItem}>
                  <HaImage
                    src={item.image_sizes[1].cdn_url}
                    onClick={() => {
                      const picInfo = {
                        aperture: item.aperture,
                        equipments: item.equipments,
                        focal_length: item.focal_length,
                        iso: item.iso,
                        shutter: item.shutter,
                        rate: item.rate,
                        location: item.location,
                        shooting_date: item.shooting_date,
                      };
                      return handleImageClick(
                        picInfo,
                        item.uid,
                        item.image_sizes[0].cdn_url,
                      );
                    }}
                  ></HaImage>
                </Card>
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
  );
}
