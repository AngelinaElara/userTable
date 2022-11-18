import {useState, useContext, useEffect} from 'react'
import { useHttp } from '../../../../hooks/http.hook'
import { AuthContext } from '../../../../context/authContext'
import { useAuth } from '../../../../hooks/auth.hook'
import trash from './ui/bin.png'
import block from './ui/block.png'
import unblock from './ui/ublock.png'

const Table = ({users}) => {
  const {request} = useHttp()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [isCheck, setIsCheck] = useState([])
  const [currId, setCurrId] = useState(JSON.parse(localStorage.getItem('userData') || '{}').userId)

  const auth = useContext(AuthContext) 
  const {logout, userId} = useAuth()

  if (!users.length) {
    return <p className='m-2'>Users not found</p>
  }

  // choose all checboxes
  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll)
    setIsCheck(users.map(user => user._id))
    if (isCheckAll) {
      setIsCheck([])
    }
  } 
 
  // choose one checbox
  const handleClick = e => {
    const { id, checked } = e.target
    setIsCheck([...isCheck, id])
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id))
    }
  }

  const handleDeleteUser = (e) => {
    if(isCheck.length) {
      isCheck.map(async (userId) => {
        if (userId === currId) {
          e.preventDefault()
          auth.logout()
        } 
        const data = await request(`/api/auth`, 'DELETE', {id: isCheck})
      })
    }
    window.location.reload()
  }

  const handleBlockUser =  async (e) => {
    // window.location.reload()
    if(isCheck.length) {
      isCheck.map((userId) => {
        if (userId === currId) {
          e.preventDefault()
          auth.logout()
        }
      }) 
      window.location.reload()
      const blockUser = await request(`/api/auth`, 'PATCH', {status: true, id: isCheck})
    }
  }

  const handleUnblockUser =  async () => {
    window.location.reload()
    if(isCheck.length) {
      const blockUser = await request(`/api/auth`, 'PATCH', {status: false, id: isCheck}) 
    }
  }

  return (
    <div>
      <div className='d-flex flex-row justify-content-start align-items-center'>
        <button  
          onClick={handleDeleteUser} 
          style={{ width: "40px", height: "40px" }} 
          className='btn d-flex justify-content-center align-items-center'
        >
          <img style={{ width: "20px", height: "20px" }} src={trash} alt="trash icon"/>
        </button>
        <button 
          onClick={handleBlockUser} 
          style={{ width: "40px", height: "40px" }} 
          className='btn d-flex justify-content-center align-items-center'
        >
          <img style={{ width: "20px", height: "20px" }} src={block} alt="block icon"/>
        </button>
        <button 
          onClick={handleUnblockUser} 
          style={{ width: "40px", height: "40px" }} 
          className='btn d-flex justify-content-center align-items-center'
        >
          <img style={{ width: "20px", height: "20px" }} src={unblock} alt="unblock icon"/>
        </button>
      </div>

      <table className='table table-hover m-2' width = "100%" border = "1">
        <thead>
          <tr>
            <th scope='col' className='d-flex gap-2 flex-row justify-content-start align-items-center'>
              Check
              <input 
                id='selectAll'
                type={'checkbox'}
                onChange={handleSelectAll} 
                checked={isCheckAll}
              />
            </th>
            <th scope='col'>ID</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Date registration</th>
            <th scope='col'>Date login</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
              return ( 
                <tr key={index}>
                  <td>
                    <input id={user._id} checked={isCheck.includes(user._id)} onChange={handleClick} type={'checkbox'} />
                  </td>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt ? `${user.createdAt.slice(0, 10)} ${user.createdAt.slice(11, 19)}` : ''}</td>
                  <td>{user.updatedAt ? `${user.updatedAt.slice(0, 10)} ${user.updatedAt.slice(11, 19)}` : ''}</td>
                  <td>{!user.status ? 'Not blocked' : 'Blocked'}</td> 
                </tr>
              )
            })
          } 
        </tbody> 
		  </table>
    </div>
  )
}

export default Table