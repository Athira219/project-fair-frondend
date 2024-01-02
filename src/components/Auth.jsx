import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImage from '../asset/login_page-removebg-preview.png'
import Form from 'react-bootstrap/Form';
import { commonApi } from '../service/commonApi';
import { loginApi, registerApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isTockenContextShare } from '../Context/ContexShare';



function Auth({ register }) {
    const {isTocken, setIsTocken} = useContext(isTockenContextShare)
 
    const navigate = useNavigate()
    const [registered, setRegistered] = useState({
        username: '',
        email: '',
        password: ''
    })
    console.log('registered=', registered);
    //-----------------Register section---------------------//
    const registerFunction = async (e) => {
        e.preventDefault()
        const { username, email, password } = registered
        if (!username || !email || !password) {
            toast.info('Please fill the form')
        } else {

            const result = await registerApi(registered)
            console.log('result=', result);

            if (result.status === 200) {
                toast.success(`${result.data.username} registed`)
                setRegistered({
                    username: '',
                    email: '',
                    password: ''
                })
                navigate('/login')

            } else {
                toast.error(`${result.response.data}`)
            }


        }
    }
    //-----------------login section---------------------//
    const loginFunction = async (e) => {
        e.preventDefault()
        const { email, password } = registered
        if (!email || !password) {
            toast.info('Please Fill the Form')
        } else {
            const loginResult = await loginApi(registered)
            console.log("loginResult=", loginResult);
            //session storage
            if(loginResult.status===200){
                sessionStorage.setItem("existLoginUser",JSON.stringify(loginResult.data.existLoginUser))
                sessionStorage.setItem("tocken",loginResult.data.tocken)
                toast.success('Login successfully')
                setIsTocken(true)
                setRegistered({
                    email: '',
                    password: ''
                })
                setTimeout(()=>{
                    navigate('/')

                },3000)
                
            }else{
                toast.error(loginResult.response.data)
            }

        }

    }

    const registerForm = register ? true : false
    return (
        <div className='d-flex justify-content-center align-items-center w-100'>
            <div className='container w-75 '>
                <Link to={'/'} style={{ color: 'blue', textDecoration: 'none' }}><i class="fa-solid fa-arrow-left me-2 " style={{ color: 'blue' }}></i>Back to Home</Link>

                <div className='bg-success shadow p-5 rounded mb-5'>
                    <div className='row d-flex align-items-center'>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            
                                <img className='bg-success w-100 img-fluid' src={loginImage} alt="" />
                           
                            

                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            <h2 className='text-center text-light'> <i class="fa-brands fa-stack-overflow text-light  fs-1 me-3 "></i>Project Fair</h2>
                            <h6 className='text-light text-center mb-4'>{registerForm ? 'sign up your Register' : 'sign in your Account'}</h6>
                            <Form className='p-3'>
                                {registerForm &&
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" value={registered.username} onChange={(e) => setRegistered({ ...registered, username: e.target.value })} placeholder=" Enter Username" />
                                    </Form.Group>}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="email" value={registered.email} onChange={(e) => setRegistered({ ...registered, email: e.target.value })} placeholder=" Enter Email Id" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="password" className='form-control' value={registered.password}  onChange={(e) => setRegistered({ ...registered, password: e.target.value })} placeholder=" Enter Password" />
                                </Form.Group>

                                {registerForm ?
                                    <div>
                                        <button className='btn btn-warning' onClick={registerFunction}>Register</button>
                                        <p className='text-light mt-3'>Alreaddy a User ?Click here to <Link to={'/login'}>Login</Link></p>
                                    </div> :
                                    <div>
                                        <button className='btn btn-warning' onClick={loginFunction}>Login</button>
                                        <p className='text-light mt-3'>New User ?Click here to <Link to={'/Register'}>Register</Link></p>
                                    </div>}

                            </Form>

                        </div>

                    </div>

                </div>
            </div>
            <ToastContainer position="top-center" theme="colored" autoClose={2000} />

        </div>
    )
}

export default Auth
