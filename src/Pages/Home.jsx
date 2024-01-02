import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import animationImage from '../asset/project fair.jpg'

import AllCard from '../components/AllCard'
import { Link } from 'react-router-dom'
import { homeProject } from '../service/allApi'

function Home() {
    const [islogin, setIsLogin] = useState(false)
    const [homeProjects, setHomeProjects] = useState([])
    useEffect(() => {
        if (sessionStorage.getItem('tocken')) {
            setIsLogin(true)

        }
        //  const tocken =   sessionStorage.getItem('tocken')
        //  setIsLogin(tocken?true:false)

    }, [])

    //---------get home project------//

    const getHomeProject = async () => {
        const homeResult = await homeProject()
        console.log('homeResult=', homeResult);
        setHomeProjects(homeResult.data)
    }
    console.log('homeProject=', homeProjects);
    useEffect(() => {
        getHomeProject()

    }, [])


    return (
        <div>
            <div className='w-100 bg-success' style={{ height: '100vh' }}>
                <div className='container-fluid rounded'>
                    <Row className='align-items-center p-5'>
                        <Col sm={12} md={6}>
                            <h1 style={{ color: 'white' }}> <i class="fa-brands fa-stack-overflow text-white fs-2 me-3 "></i>Project Fair</h1>
                            <p style={{ color: 'white' }}>One step designstion for all software developer Project</p>
                            {islogin ?
                                <Link to={'/Dashboard'}><button className='btn btn-warning rounded'>Manage Project <i class="fa-solid fa-arrow-right me-3 text-white"></i></button></Link>
                                :
                                <Link to={'/login'}><button className='btn btn-warning rounded'>Get started <i class="fa-solid fa-arrow-right me-3 text-white"></i></button></Link>

                            }
                        </Col>

                        <Col sm={12} md={6}>
                            <img className='w-75 img-fluid bg-success' src={animationImage} alt="" style={{ marginTop: '100px', borderRadius: '40%' }} />
                        </Col>
                    </Row>

                </div>

            </div>
            <div className='container-fluid'>

                <div className=" mt-5 mb-5">
                    <h1 className='text-center'>All projects</h1>


                </div>
                <marquee scrollAmount={20}>
                    <div className="row mt-5 mb-5 ">

                        {
                        homeProjects?.length > 0 ?
                        homeProjects?.map(item => (
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <AllCard  projects={item}/>
                                </div>

                            ))

                            : null
                            }


                    </div>
                </marquee>


            </div>

            <div className='text-center mt-5 mb-5'>
                <Link to={'/Project'} >See All Project</Link>
            </div>

        </div>
    )
}

export default Home
