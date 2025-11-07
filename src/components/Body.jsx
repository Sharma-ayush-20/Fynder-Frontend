import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { baseUrl } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

function Body() {
  const dispatch = useDispatch();
  const user = useSelector(store => store?.user)
  const navigate = useNavigate()

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/profile/view`, {withCredentials: true})
      if(response.status === 200){
        console.log(response)
        dispatch(addUser(response.data.user))
      }
    } catch (error) {
      if(error.status === 401){
        toast.error(error.response.data.message)
        navigate("/login")
      }
      console.log(error)
    }
  }

  useEffect(() => {
    if(!user) fetchUser();
  }, [user])

  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Body