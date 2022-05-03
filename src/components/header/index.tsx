/*
 * @Description: header component
 * @Author: hayato
 * @Date: 2022-02-04 18:45:42
 * @LastEditors: hayato
 * @LastEditTime: 2022-05-02 23:46:41
 */

import styles from './index.less';
import { Layout } from 'antd';
const { Header } = Layout;

export default function HaHeader() {
  return (
    <div>
      <Header className={styles.headerContainer}>
        <div className={styles.headerLeft}>Axis Studio</div>
        <div></div>
      </Header>
    </div>
  );
}
