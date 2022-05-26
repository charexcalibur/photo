/*
 * @Description: Description
 * @Author: hayato
 * @Date: 2021-03-06 16:20:25
 * @LastEditors: hayato
 * @LastEditTime: 2022-05-26 21:51:21
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
const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3168987_9kwbsb35jhc.js',
})

export default function IndexPage() {
  const [mode, setMode] = useState('single')
  const [currentRoute, setCurrentRoute] = useState('/')

  const singleMode = () => {
    console.log('change to single mode')
    history.push('/home')
    setMode('single')
  }

  const tripleMode = () => {
    console.log('change to triple mode')
    history.push('/home')
    setMode('triple')
  }

  return (
    <Layout>
      <Header className={styles.headerContainer}>
        <div
          className={styles.headerLeft}
          onClick={() => {
            history.push('/home')
          }}
        >
          Axis Studio
        </div>
        <div>
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
          <Button
            size='large'
            icon={<Icon type='icon-daliebiao'></Icon>}
            onClick={singleMode}
          ></Button>
          <Button
            size='large'
            icon={<Icon type='icon-dasuolvetuliebiao'></Icon>}
            onClick={tripleMode}
          ></Button>
        </div>
      </Header>
      <Route>
        <Route path='/about' component={About}></Route>
        <Route
          path='/home'
          render={() => <Scroll mode={mode}></Scroll>}
        ></Route>
      </Route>
    </Layout>
  )
}
