/*
 * @Description: comment
 * @Author: hayato
 * @Date: 2022-05-08 20:24:28
 * @LastEditors: hayato
 * @LastEditTime: 2022-05-28 20:53:35
 */
import { FC, useState } from 'react'
import { Comment, Button, List, Divider, Form, Input, message } from 'antd'
import styles from './index.less'
import request from 'umi-request'

interface CommentItem {
  id: number
  add_time: string
  modify_time: string
  name: string
  e_mail_address: string
  comment: string
  verify_status: number
  pid: number | null
  photo: number | undefined
}

interface HaCommentProps {
  comments: CommentItem[]
  photo: number | undefined
}

const { TextArea } = Input

const Editor = ({
  onSubmit,
  submitting,
}: {
  onSubmit: any
  submitting: boolean
}) => {
  const [form] = Form.useForm()

  return (
    <>
      <Form layout='vertical' form={form} onFinish={onSubmit}>
        <Form.Item label='昵称' name='name'>
          <Input placeholder='请输入昵称, 如果未输入, 则会显示匿名用户'></Input>
        </Form.Item>
        <Form.Item label='评论内容' name='comment'>
          <TextArea rows={4} placeholder='评论将在审核后展示' />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' loading={submitting}>
            提交评论
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

const HaComment: FC<HaCommentProps> = (props) => {
  const { comments, photo } = props

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [showButton, setShowButton] = useState<boolean>(false)

  const handleSubmit = (value: any) => {
    console.log('handleSubmit: ', value)
    const postData = {
      name:
        value.name === '' || value.name === undefined ? '匿名用户' : value.name,
      photo: photo,
      comment: value.comment,
    }
    console.log('postData: ', postData)
    setSubmitting(true)
    request
      .post('https://api.axis-studio.org/wallpaper/comments/', {
        data: postData,
      })
      .then((res) => {
        console.log('res: ', res)
        message.success('评论成功, 待审核后才能显示')
        setShowButton(!showButton)
        setSubmitting(false)
      })
      .catch((err) => {
        message.error(err)
        setShowButton(!showButton)
        setSubmitting(false)
      })
      .finally(() => {
        setShowButton(!showButton)
        setSubmitting(false)
      })
  }

  const handleShowComment = () => {
    setShowButton(!showButton)
  }

  return (
    <div className={styles.commentListContainer}>
      {!showButton ? (
        <div className={styles.commentButtonContainer}>
          <Button size='large' onClick={handleShowComment}>
            编写评论
          </Button>
        </div>
      ) : (
        <Comment
          content={<Editor onSubmit={handleSubmit} submitting={submitting} />}
        />
      )}

      <List
        header={`${comments.length} replies`}
        itemLayout='horizontal'
        dataSource={comments}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.name}
              content={item.comment}
              // datetime={item.add_time.format('YYYY-MM-DD HH:mm:ss')}
            />
            <Divider></Divider>
          </li>
        )}
      />
    </div>
  )
}

export default HaComment
