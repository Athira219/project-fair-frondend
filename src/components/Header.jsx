import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isTockenContextShare } from '../Context/ContexShare';


function Header({dashboard}) {
  const {isTocken, setIsTocken} = useContext(isTockenContextShare)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    sessionStorage.removeItem('tocken')
    sessionStorage.removeItem('existLoginUser')
    setIsTocken(false)
    navigate('/')


  }
  return (
    <>
    {/* <div className=' row bg-success p-3'>
      <div className="col-md-6 col-sm-12">
        <h1 className='text-white ms-5' >  <i className="fab fa-stack-overflow text-white fs-3 fa-3xs me-3"></i> Project Fair</h1>
      </div>

    </div> */}

    <Navbar className='bg-success p-3'>
      <Container>
        <Link style={{textDecoration:'none'}} to={'/'} >
        <Navbar.Brand href="#home" className='text-light '><i className="fab fa-stack-overflow text-white fs-2 me-3"></i>
        <span className='fs-3 text-light'> Project Fair</span>

        </Navbar.Brand>
       
        </Link>

        { dashboard  &&
          <button className='btn btn-warning ' onClick={handleLogout}>Logout <i class="fa-solid fa-power-off ms-2 text-light"></i></button>
          }
        
       
      </Container>
    </Navbar>
        
      
    </>
  )
}

export default Header 
