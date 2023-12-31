import React, { useState } from 'react';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import projectImg from '../Assests/pro.png';
import { BASE_URL } from '../Services/baseurl';

function ProjectCard({ project }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cardHeight = "300px"; 

  return (
    <>
      {project && (
        <Card className='shadow mb-5 btn' style={{ height: cardHeight, overflowY: "hidden" }} onClick={handleShow}>
          <Card.Img variant="top" src={project ? `${BASE_URL}/uploads/${project?.projectImage}` : projectImg} className="img-fluid" style={{ height: cardHeight }} />
          <Card.Body style={{ overflowY: "hidden" }}>
            <Card.Title>{project?.title}</Card.Title>
          </Card.Body>
        </Card>
      )}

      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img className='img-fluid' src={project ? `${BASE_URL}/uploads/${project?.projectImage}` : projectImg} alt="project image" style={{ maxHeight: cardHeight }} />
            </Col>
            <Col md={6}>
              <h2>{project?.title}</h2>
              <p>Project Overview: {project?.overview}</p>
              <p>Language Used: <span className='fw-bolder'>{project?.languages}</span></p>
              <p>Created by: <span>{project?.userName}</span></p>
            </Col>
            <div className="mt-3">
              <a href={project?.github} target='_blank' rel="noopener noreferrer" className='me-3 btn'><i className="fa-brands fa-github fa-2x"></i></a>
              <a href={project?.website} target='_blank' rel="noopener noreferrer" className='me-5 btn'><i className="fa-solid fa-link fa-2x"></i></a>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProjectCard;
