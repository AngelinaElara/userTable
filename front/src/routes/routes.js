import {Routes, Route} from 'react-router-dom'
import Account from '../pages/Account'
import Login from '../pages/Login'
import Registration from '../pages/Registration'

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Routes>
        <Route path='/account' element={<Account />} />
        <Route path='*' element={<Account />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='*' element={<Login />} />
      <Route path='/registration' element={<Registration />} />
    </Routes>
  )
}