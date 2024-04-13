/*
 * @Description: Description
 * @Author: hayato
 * @Date: 2021-03-06 16:20:25
 * @LastEditors: hayato
 * @LastEditTime: 2022-11-17 15:17:34
 */
import styles from './index.less'
import request from 'umi-request'
import React, { useState, useEffect } from 'react'
import { Layout, Button } from 'antd'
const { Footer, Content, Header } = Layout
import { history, NavLink, Route, Switch } from 'umi'
import { createFromIconfontCN } from '@ant-design/icons'
import About from '@/pages/about'
import Scroll from '@/components/scroll'
import MasonryScroll from '@/components/masonry'
const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3168987_9kwbsb35jhc.js',
})

export default function IndexPage() {
  const [mode, setMode] = useState('triple')
  const [columns, setColumns] = useState(3)
  const [currentRoute, setCurrentRoute] = useState('/')
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const singleMode = () => {
    console.log('change to single mode')
    // history.push('/home')
    setMode('single')
  }

  const tripleMode = () => {
    console.log('change to triple mode')
    // history.push('/home')
    setMode('triple')
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 根据设备宽度来判断 mode，大屏幕显示三列，小屏幕显示一列
  useEffect(() => {
    if (screenWidth > 431) {
      console.log('screenWidth > 430')
      setColumns(3)
    } else {
      setColumns(1)
    }
  }, [screenWidth])

  const isDivVisible = screenWidth > 768 // 设置屏幕宽度阈值来控制显示与隐藏

  return (
    <Layout>
      <Header className={styles.headerContainer}>
        <div
          className={styles.headerLeft}
          onClick={() => {
            history.push('/')
          }}
        >
          Axis Studio
        </div>
        <div className={styles.headerRight}>
          <Button
            type='link'
            style={{
              color: '#505050',
            }}
            onClick={() => {
              // jump to about page
              history.push('/about')
            }}
          >
            关于
          </Button>
          {/* <NavLink to='/about'>About</NavLink> */}
          {/* <Button
            size='large'
            icon={<Icon type='icon-daliebiao'></Icon>}
            onClick={singleMode}
          ></Button> */}
          {/* {
            isDivVisible && (
              <Button
                size='large'
                icon={<Icon type='icon-dasuolvetuliebiao'></Icon>}
                onClick={tripleMode}
              ></Button>
            )
          } */}
        </div>
      </Header>
      <Route>
        <Route path='/about' component={About}></Route>
        <Route
          path='/'
          render={() => (
            <MasonryScroll mode={mode} columns={columns}></MasonryScroll>
          )}
        ></Route>
      </Route>
    </Layout>
  )
}
