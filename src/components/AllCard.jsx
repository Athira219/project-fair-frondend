import React from 'react'

import Card from 'react-bootstrap/Card';
import mediaPlayer from '../asset/Media Player.png'
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { baseURL } from '../service/baseURL';



function AllCard({projects}) {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Card className='shadow rounded btn mb-4' onClick={handleShow} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={projects?`${baseURL}/uploads/${projects.projectImage}`:mediaPlayer} />
      <Card.Body>
        <Card.Title className='text-center'>{projects.title}</Card.Title>
        
      </Card.Body>
    </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{projects.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                <img  width={'100%'} height={'200px'} src={projects?`${baseURL}/uploads/${projects.projectImage}`:mediaPlayer} alt="" />
                </Col>

                <Col>
                <h3 className='text-center'>{projects.title}</h3>
                <p>{projects.overview}</p>
               <p>{projects.language}</p>
                </Col>
            </Row>
           < Row>
          <Col>
          <a href={projects.github} target='_blank'><i class="fa-brands fa-github ms-2 fa-1x"></i></a>
          <a href={projects.website} target='_blank'><i class="fa-solid fa-link ms-2 fa-1x"></i></a>
          </Col>
           </Row>
         
        </Modal.Body>
       
      </Modal>


    </div>
  )
}

export default AllCard
