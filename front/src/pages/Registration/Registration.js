import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useHttp} from '../../hooks/http.hook'

const Registration = () => {
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({
    name: '' , email: '', password: ''
  })
  const [warning, setWarning] = useState('')
  const [message, setMessage] = useState('')

  useEffect(()=> {
    setWarning(error)
    setTimeout(() => {
      clearError()
    }, 3000)
  }, [error])
  

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('api/auth/register', 'POST', {...form})
      setMessage('You was registrate')

      setTimeout(() => {
        setMessage('')
      }, 2000)
    } catch (e) {}
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h1 className='text-secondary'>Registration</h1>
      <div className='text-success'>{message}</div>
      <form className='d-flex flex-column justify-content-center align-items-center border p-3 rounded shadow-lg mb-5'>

        <input 
          className='m-2 p-2 shadow-sm border border-light rounded' 
          style={{height: '40px'}} 
          type={'text'} 
          placeholder='Name'
          name='name'
          onChange={changeHandler}
        />
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
          style={{width: '80%'}}
          type='submit'
          onClick={registerHandler}
          disabled={loading}
        >
          Registration
        </button>
      </form>
      <p>Do you have account? <Link to='/'>Login</Link></p>
    </div>
  )
}

export default Registration