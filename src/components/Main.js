import React from 'react'
import { useNavigate } from 'react-router-dom'

function Main() {

    let navigate = useNavigate()

    return <>

        <div className='main-wrapper'>
            <h4>You'll have changed your password successfully</h4>
            <p onClick={() => navigate('/sign-in')} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} >Sign-in</p>
        </div>

    </>
}

export default Main
