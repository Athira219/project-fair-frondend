import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import AllCard from '../components/AllCard'
import { allProject } from '../service/allApi'
import { Link } from 'react-router-dom'

function Project() {
  const [allprojects, setAllprojects] = useState([])

//search
  const[searchkey,setSearchkey]= useState('')

  const [isTocken,setIsTocken] = useState(false)

  
  const getallProject = async () => {
    if (sessionStorage.getItem('tocken')) {
      const tocken = sessionStorage.getItem('tocken')

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `bearer ${tocken}`
      }
      const result = await allProject(searchkey,reqHeader)
      console.log(result);
      if (result.status === 200) {
        setAllprojects(result.data)
      } else {
        console.log('error=', result.response.data);
      }
    }
  }
  console.log('allprojects=',allprojects);
  console.log('searchkey=',searchkey);
    
    useEffect(() => {
      getallProject()
    }, [searchkey])

    useEffect(()=>{
      if(sessionStorage.getItem('tocken')){
        setIsTocken (true)
      }
    })
  
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header />



      <div className="container mb-5" >
        <h1 className="text-center">All Projects</h1>
        <div className="row justify-content-center align-items-center" >
          <div className="col-sm-12 col-md-6 col-lg-4">

            <div className='d-flex'>
              <input type="text" value={searchkey} onChange={(e)=>setSearchkey(e.target.value)} placeholder='Search' className='form-control' />
              <i className="fa-solid fa-magnifying-glass fa-rotate-90" style={{ marginLeft: '-40px' }}></i>
            </div>
          </div>
        </div>
      </div>








      <Row>
       
       {
       allprojects?.length>0?
       allprojects?.map(item=>(
        <Col xs={12} sm={6} md={6} lg={4} xl={3} xxl={2}>
         <AllCard projects={item} />
       </Col>

       ))
         
       :
       <div>

        {isTocken?<p className='fs-3 text-center'>Sorry no such Project currently Avaliable</p>
        : <div className='d-flex justify-content-center align-items-center flex-column'>
          <img src="https://assets-v2.lottiefiles.com/a/84126908-1151-11ee-98df-6f2a63f9f7b8/AO1Rz3SGv5.gif" alt="No Image"
          height={'300rem'} width={'300rem'} />
          <p className='fs-3'>Please <Link to={'/login'} style={{textDecoration:'none'}} >login</Link> to see more Project</p>
         </div>}
       </div>
       
       }

      </Row>



    </div>




  )
}

export default Project
