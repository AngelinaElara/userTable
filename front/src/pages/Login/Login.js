import {useState, useEffect, useContext, useCallback} from 'react'
import {Link} from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/authContext'
import { useAuth } from '../../hooks/auth.hook'

const Login = () => {
  const auth = useContext(AuthContext)
  const {loading, error, request} = useHttp()
  const [form, setForm] = useState({
    email: '', password: '', logDate: new Date().toLocaleString()
  })
  const [warning, setWarning] = useState('')
  const [data, setData] = useState([])

  const {token} = useAuth()

  useEffect(()=> {
    setWarning(error)
    setTimeout(() => {
      setWarning('')
    }, 3000)
  }, [error])

  const changeHandler = (event) => {
    setForm({...form, [event.target.name] : event.target.value})
  }

  // getting data
  const fetchUsers = useCallback(async () => {
    try {
      let data = await request('/api/auth', 'GET')
      setData(data)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const loginHandler = async (e) => {
    // checking if the user is blocked
    if(data.find(item => item.email === form.email).status) {
      e.preventDefault()
      setWarning('Account was disabled')
      setTimeout(() => {
        setWarning('')
      }, 2000)
    } else {
      try {
        const data = await request('/api/auth/login', 'POST', {...form})
        auth.login(data.token, data.UserId)  
        const updDate = await request(`/api/auth/login/`, 'PUT', {id: data.UserId})
      } catch (e) {} 
    }  
  } 

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h1 className='text-secondary'>Login</h1>
      <form className='d-flex flex-column justify-content-center align-items-center border p-3 rounded shadow-lg mb-5'>
        <input 
          className='m-2 p-2 shadow-sm border border-light rounded' 
          style={{height: '40px'}} 
          type={'email'} 
          placeholder='E-mail'
          name='email'
          onChange={changeHandler}
        />
        <input 
          className='m-2  p-2 shadow-sm border border-light rounded' 
          style={{height: '40px'}} 
          type={'password'} 
          placeholder='Password'
          name='password'
          onChange={changeHandler}
        />

        <div style={{color: 'red'}}>{warning}</div>

        <button 
          className='btn btn-outline-secondary m-2' 
          type='submit'
          disabled={loading}
          onClick={loginHandler}
        >
          Login
        </button>
      </form>
      <p>Don't have an account? <Link to='/registration'>Registration</Link></p>
    </div>
  )
}

export default Login