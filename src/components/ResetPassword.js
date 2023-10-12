import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
  let params = useParams()

  let navigate = useNavigate()

  let handleresetpassword = async (e) => {
    e.preventDefault()

    let data = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    try {
      let res = await axios.post(`${process.env.REACT_APP_API_URL}/reset-password/${params.id}`, data)

      if (res.status === 200) {
        toast.success(res.data.message)
        navigate('/main')
      }

    } catch (error) {
      toast.error(error.response.data.error || error.response.data.message)
    }
  }

  return <>
    <div className='reset-title'>
      <h2>Reset Password</h2>
    </div>
    <div className='password-wrapper'>
      
      <Form onSubmit={handleresetpassword}>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="ttext" placeholder="Enter New Password" name='password' />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ borderRadius: '10px', marginLeft: '100px', width: '100px', cursor: 'pointer' }} >Submit</Button>

      </Form>
    </div>
  </>
}

export default ResetPassword
