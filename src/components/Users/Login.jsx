import React,{
    useState,useEffect
} from 'react'
import { useNavigate } from 'react-router-dom';
import {UserEndpoints} from '../../api/axios_instance'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('access_token')
    if (user) {
      navigate('/create')
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await UserEndpoints.get_token({ username, password })

      localStorage.setItem('access_token', response.data.access)
      localStorage.setItem('refresh_token', response.data.refresh)

      navigate('/create')

    } catch (error) {
      console.error('Login failed')
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} method="post">
        <input type='text' placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
       <input type='password' placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
       />
      <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
