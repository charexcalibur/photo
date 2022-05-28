/*
 * @Description: Description
 * @Author: hayato
 * @Date: 2022-05-12 18:37:52
 * @LastEditors: hayato
 * @LastEditTime: 2022-05-26 22:44:29
 */
import { Layout, Typography } from 'antd'
import styles from './index.less'
const { Footer } = Layout
const { Title, Text } = Typography

const AboutPage = () => {
  const getContentHeight = () => {
    console.log('getContentHeight')
    return window.innerHeight - 64 - 168
  }

  return (
    <>
      <div
        style={{
          height: getContentHeight(),
        }}
        className={styles.content}
      >
        <Title>Hi!</Title>
        <Title>这里是 hayato 的个人摄影作品站</Title>
        <Title level={2}>分享我用相机记录下的美 ^_^</Title>
      </div>
      <Footer className={styles.footerContainer}>
        <div className={styles.licenses}>
          本站所有内容基于{' '}
          <a
            href='https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh'
            target='_blank'
          >
            CC BY-NC-ND 4.0 国际协议
          </a>{' '}
          授权
        </div>
        <div className={styles.inspiredBy}>
          Inspired by <a href='https://camarts.app/'>CAMARTS</a> and ALL
          developed by Hayato
        </div>
        <div className={styles.copyRight}>Copyright © 2022 Axis</div>
      </Footer>
    </>
  )
}

export default AboutPage
