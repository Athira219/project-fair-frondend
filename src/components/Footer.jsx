import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='container-fluid bg-success'>
      <div className='container py-5'>
        <div className='row'>

          <div className='col-lg-3 col-md-6 col-sm-12 mb-4'>
            <h4 className='text-white'>
              <i className="fab fa-stack-overflow text-white fs-2 me-3"></i>
              Project Fair
            </h4>
            <p className='text-white'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eum, distinctio nihil consequatur aperiam molestiae velit officiis ducimus assumenda similique.
            </p>
            <p style={{ color: 'white' }}>Lorem ipsum, dolor sit amet consectetur </p>
          </div>

          <div className='col-lg-3 col-md-6 col-sm-12 mb-4'>
            <h4 className='text-white'>Links</h4>
            <ul className='list-unstyled'>
              <li><Link to={'/'} className='text-white text-decoration-none'>Home</Link></li>
              <li><Link to={'/login'} className='text-white text-decoration-none'>Login</Link></li>
              <li><Link to={'/register'} className='text-white text-decoration-none'>Register</Link></li>
              <li><Link to={'/dashboard'} className='text-white text-decoration-none'>DashBoard</Link></li>
              <li><Link to={'/project'} className='text-white text-decoration-none'>Project</Link></li>
            </ul>
          </div>

          <div className='col-lg-3 col-md-6 col-sm-12 mb-4'>
            <h4 className='text-white'>Guides</h4>
            <ul className='list-unstyled'>
              <li><a href='https://bootswatch.com/' className='text-white text-decoration-none'>React</a></li>
              <li><a href='https://react-bootstrap.netlify.app/' className='text-white text-decoration-none'>React Bootstrap</a></li>
              <li><a href='https://bootswatch.com/' className='text-white text-decoration-none'>React Watch</a></li>
            </ul>
          </div>

          <div className='col-lg-3 col-md-6 col-sm-12 mb-4'>
            <h4 className='text-white'>Contact Us</h4>
            <div className='d-flex mb-2'>
              <input type="text" placeholder='Enter Your Email ID' className='form-control' />
              <button className='btn btn-warning ms-2'>Subscribe</button>
            </div>
            <div className='d-flex justify-content-evenly align-items-center'>
              <a href='https://www.instagram.com/' className='text-white me-3' target='_blank' rel='noopener noreferrer'>
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a href='https://twitter.com/i/flow/login' className='text-white me-3' target='_blank' rel='noopener noreferrer'>
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href='https://in.linkedin.com/' className='text-white me-3' target='_blank' rel='noopener noreferrer'>
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
              <a href='https://www.facebook.com/campaign/landing.php?campaign_id=14884913640' className='text-white' target='_blank' rel='noopener noreferrer'>
                <i className="fab fa-facebook fa-2x"></i>
              </a>
            </div>
          </div>

        </div>
      </div>
      <p className='text-white text-center py-3 mb-0'>Copyright &#64; 2023 Project Fair Built with React.</p>
    </div>
  );
}

export default Footer;
