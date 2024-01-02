import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editprofileApi } from '../service/allApi';
import { baseURL } from '../service/baseURL';


function Profile() {
    const [open, setOpen] = useState(false);

    const [value, setValue] = useState({
        username: '',
        email: '',
        password: '',
        github: '',
        linkedin: '',
        profile: ''
    })
    console.log('profile value=', value);
    //preview
    const [preview, setPreview] = useState('')
    console.log('preview=', preview);
    //editProfile
    const [editProfile,setEditProfile] = useState('')

    useEffect(() => {
        if (value.profile) {
            setPreview(URL.createObjectURL(value.profile))
        } else {
            setPreview('')
        }
    }, [value.profile])

    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem('existLoginUser'))
        console.log(user);
        setValue({...value,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin,profile:''})
        setEditProfile(user.profile)
    },[])
    //--------updateProfile--------------//
    const updateProfile = async () => {

        const { username, email, password, github, linkedin, profile } = value
        if (!github || !linkedin) {
            toast.info('Fill the Form')
        } else {
            const reqbody = new FormData()
            reqbody.append('username', username)
            reqbody.append('email', email)
            reqbody.append('password', password)
            reqbody.append('github', github)
            reqbody.append('linkedin', linkedin)
            preview?reqbody.append('profile', profile):reqbody.append('profile', editProfile)
            

            const tocken = sessionStorage.getItem('tocken')
            console.log(tocken);
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${tocken}`
                }
                const resultupdate = await editprofileApi(reqbody, reqHeader)
                console.log(resultupdate);
                if(resultupdate.status ===200){
                    toast.success('Successfully Updated')

                }

            } else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${tocken}`
                }
                const resultupdate = await editprofileApi(reqbody, reqHeader)
                console.log(resultupdate);
                if(resultupdate.status ===200){
                    toast.success('Successfully Updated')

                }

            }


        }



    }
    return (
        <div className=' card row shadow p-5 rounded'>
            <div className='col-sm-12 '>
                <div className='d-flex justify-content-between  '>
                    <h2 style={{ overflowY: 'hidden' }}>Profile</h2>
                    <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-arrow-up-from-bracket fa-rotate-180"></i></button>




                </div>
                <Collapse in={open}>
                    <div className='w-100 justify-content-center align-items-center flex-column'>
                        <label htmlFor="profile">
                            <input id='profile' type="file" style={{ display: 'none' }} onChange={(e) => setValue({ ...value, profile: e.target.files[0] })} />
                            {editProfile==''?
                            <img className='rounded-circle' width={'180rem'} height={'180rem'} src={preview ? preview : "https://fadcdn.s3.ap-south-1.amazonaws.com/media/539/Lead_image_avatar_co_girl.jpg"} alt="no image" />
                            :<img className='rounded-circle' width={'180rem'} height={'180rem'} src={preview ? preview :`${baseURL}/uploads/${editProfile}`} alt="no image" />
                       }
                        </label>
                        <div className='mb-3 mt-5 w-100 p-2'>
                            <input type="text" value={value.github} onChange={(e) => setValue({ ...value, github: e.target.value })} placeholder='GitHub' className='form-control ' />

                        </div>
                        <div className='mb-3 w-100 p-2'>
                            <input type="text" placeholder='Linkdin' value={value.linkedin} onChange={(e) => setValue({ ...value, linkedin: e.target.value })} className='form-control ' />

                        </div>
                        <div className='mb-3 '>

                            <button className='btn btn-success w-100' onClick={updateProfile}>Update</button>

                        </div>

                    </div>
                </Collapse>
            </div>
            {/* <div className='col-sm-12 '> */}

            {/* </div> */}
            <ToastContainer position='center-top' theme='colored' autoClose={2000} />

        </div>
    )
}

export default Profile
