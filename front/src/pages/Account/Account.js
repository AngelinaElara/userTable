import { useHttp } from '../../hooks/http.hook'
import { useAuth } from '../../hooks/auth.hook'
import {useState, useEffect, useContext, useCallback} from 'react'
import { AuthContext } from '../../context/authContext'
import Table from './components/Table'

const Account = () => {
  const {loading, error, request, clearError} = useHttp()
  const [data, setData] = useState([])

  const {token, login, logout, userId} = useAuth()

  // Getting all users from the database
  const fetchUsers = useCallback(async () => {
    try {
      let data = await request('/api/auth', 'GET')
      setData(data)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <>
      {!loading && <Table users={data} />}
    </>
  )
}

export default Account