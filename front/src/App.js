import { useRoutes } from './routes/routes'
import {useAuth} from './hooks/auth.hook'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { AuthContext } from './context/authContext'


const App = () => {
  const {token, login, logout, userId} = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuth
    }}>
      <div className='bg-light position-fixed fixed-top fixed-right fixed-bottom fixed-left d-flex flex-column justify-content-center'>
        <Container className='p-3'>
          {routes}
        </Container>
      </div>
    </AuthContext.Provider>
  )
}

export default App