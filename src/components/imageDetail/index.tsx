/*
 * @Description: A components to show image detail
 * @Author: hayato
 * @Date: 2022-01-16 16:14:40
 * @LastEditors: hayato
 * @LastEditTime: 2022-01-19 23:26:52
 */

import styles from './index.less'
import request from 'umi-request'
import React, { useState, useEffect } from 'react'
import { Modal, Image, Comment, List, Tooltip, Row, Col } from 'antd'
import moment from 'moment'

interface HaImageDetailProps {
  uid?: string;
  visible: boolean;
  src: string;
  onCancel?: () => void;
}

export default function HaImageDetail(props: HaImageDetailProps) {

  const { visible, onCancel, src } = props
  const getContentWidth = () => {
    return window.innerWidth
  }

  const data = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Modal
        className={styles.modelRoot}
        visible={visible}
        onCancel={onCancel}
        width={getContentWidth()}
        destroyOnClose={true}
      >
        <div className={styles.modelImageContainer}>
          <Row>
            <Col span={16} offset={4}>
              <Image
                className={styles.modelImage}
                preview={false}
                src={src}
              ></Image>
            </Col>
          </Row>

        </div>
        <div>
        <List
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
        />
        </div>
      </Modal>
    </>
  )
}