import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'
import { Row, Col } from 'react-bootstrap'


function DashBoard() {
  const [name, setName] = useState('')
  useEffect(() => {
    const loginedusers = JSON.parse(sessionStorage.getItem("existLoginUser")).username
    setName(loginedusers)

  }, [])
  console.log(name);
  return (
    <>
      <div>
        <Header dashboard />
        <h1 style={{overflowY:'hidden'}}>Welcome <span className='text-warning'>{name}</span></h1>

        <Row className='container-fluid mt-5 mb-5'>
          <Col sm={12} md={8}>
            <MyProject />
          </Col>
          <Col sm={12} md={4}>
            <Profile />
          </Col>
        </Row>

        {/* <div className='container'>
        <div className='row w-100'>
          <div className='col-sm-12 col-md-6 col-lg-6 w-72 shadow p-2 rounded mt-3 mb-5 d-flex justify-content-between '>
          <div>
          <h2>My projects</h2>
           
          </div>
          <button className='btn btn-success'>Add Project</button>

           

            </div>
          <div className='col-sm-12 col-md-6 col-lg-6 w-18 shadow p-2 rounded mt-3 mb-5 '>
          <div>
          
           
          </div>
          <button className='btn btn-success'>Add Project</button>

           

            </div>

          </div>

        </div> */}

      </div>





    </>
  )
}

export default DashBoard
