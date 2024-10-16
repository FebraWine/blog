import { Spin } from 'antd'

import style from '../../SCSS/spin.module.scss'

export default function SpinLoading() {
  return (
    <div className={style.wrapper}>
      <div className={style.load}>
        <Spin size="large" />
      </div>
    </div>
  )
}
