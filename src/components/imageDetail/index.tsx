/*
 * @Description: A components to show image detail
 * @Author: hayato
 * @Date: 2022-01-16 16:14:40
 * @LastEditors: hayato
 * @LastEditTime: 2022-02-05 23:46:53
 */

import styles from './index.less';
import React, { FC, useState } from 'react';
import { Modal, Image, Comment, List, Tooltip, Row, Col, Drawer } from 'antd';
import moment from 'moment';
import { PicInfo } from '@/pages/index.d';
import HaPicInfo from '@/components/picInfo';

interface HaImageDetailProps {
  uid?: string;
  visible: boolean;
  src: string;
  picInfo: PicInfo;
  onclose?: () => void;
}

const HaImageDetail: FC<HaImageDetailProps> = (props) => {
  const [isLoad, setIsLoad] = useState(false);

  const { visible, onclose, src, picInfo } = props;

  const getContentWidth = () => {
    return window.innerWidth;
  };

  // const data = [
  //   {
  //     actions: [<span key="comment-list-reply-to-0">Reply to</span>],
  //     author: 'Han Solo',
  //     content: (
  //       <p>
  //         We supply a series of design principles, practical patterns and high
  //         quality design resources (Sketch and Axure), to help people create
  //         their product prototypes beautifully and efficiently.
  //       </p>
  //     ),
  //     datetime: (
  //       <Tooltip
  //         title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}
  //       >
  //         <span>{moment().subtract(1, 'days').fromNow()}</span>
  //       </Tooltip>
  //     ),
  //   },
  //   {
  //     actions: [<span key="comment-list-reply-to-0">Reply to</span>],
  //     author: 'Han Solo',
  //     content: (
  //       <p>
  //         We supply a series of design principles, practical patterns and high
  //         quality design resources (Sketch and Axure), to help people create
  //         their product prototypes beautifully and efficiently.
  //       </p>
  //     ),
  //     datetime: (
  //       <Tooltip
  //         title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}
  //       >
  //         <span>{moment().subtract(2, 'days').fromNow()}</span>
  //       </Tooltip>
  //     ),
  //   },
  // ];

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
          console.log('afterVisibleChange');
          isLoad ? setIsLoad(false) : setIsLoad(true);
        }}
      >
        <div className={styles.modelImageContainer}>
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
            </Col>
            <Col span={4} onClick={onclose}></Col>
          </Row>
        </div>

        <div>
          {/* <List
          className="comment-list"
          header={`${data.length} replies`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        /> */}
        </div>
      </Drawer>
    </>
  );
};

export default HaImageDetail;
