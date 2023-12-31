import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import titleImg from '../Assests/unix1.png';
import ProjectCard from '../Components/ProjectCard';
import { Link } from 'react-router-dom';
import { homeProjectAPI } from '../Services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [loggedin, setLoggedin] = useState(false);
  const [homeProjects, setHomeProjects] = useState([]);

  const getHomeProjects = async () => {
    const result = await homeProjectAPI();
    if (result.status === 200) {
      setHomeProjects(result.data);
    } else {
      toast.error(result.response.data);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
    //api call home page
    getHomeProjects();
  }, []);

  return (
    <>
      {/* landing section */}
      <div style={{ width: '100%', height: '100vh', backgroundColor: 'rgb(106, 27, 154)' }} className='container-fluid rounded'>
        <Row className='align-items-center'>
          <Col sm={12} md={6}>
            <h1 style={{ fontSize: '80px' }} className='fw-bolder text-light'> <i className="fa-brands fa-stack-overflow fa-bounce"></i> UniX-HuB </h1>
            <p style={{ color: 'white' }}>One Stop Destination for all software development projects. Users can add and manage their projects, as well as access all projects available on our website... What are you waiting for!!!!</p>

            {loggedin ?
              <Link to={'/dashboard'} className='btn btn-warning'> Manage Your Projects <i className="fa-solid fa-right-long fa-beat ms-2"></i></Link> :

              <Link to={'/login'} className='btn btn-warning'> Start to Explore <i className="fa-solid fa-right-long fa-beat ms-2"></i></Link>
            }
          </Col>
          <Col sm={12} md={6}>
            <img src={titleImg} alt="" style={{ marginTop: '50px' }} className='w-100' />
          </Col>
        </Row>
      </div>

      {/* all projects */}
      <div className="all-projects mt-5 ms-3 me-3">
        <h1 className='text-center mb-5'>Explore Our Projects</h1>
        <Row xs={1} md={2} lg={3} className='d-flex justify-content-center'>
          {homeProjects?.length > 0 ? homeProjects.map(project => (
            <Col key={project.id} className='mb-4'>
              <ProjectCard project={project} />
            </Col>
          )) : null}
        </Row>
        <div className="text-center mt-4 fs-3"><Link style={{ textDecoration: "none" }} to={'/projects'}> View More Projects</Link></div>
      </div>

      <ToastContainer position='top-right' autoClose={2000} theme='colored' />
    </>
  );
}

export default Home;
