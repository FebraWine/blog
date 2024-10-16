import { Alert } from 'antd'

export default function notAuthorization() {
  return <Alert message="Ошибка" description="Вы не зарегестрированны !" type="warning" />
}
