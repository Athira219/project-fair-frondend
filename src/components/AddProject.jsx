import React, {  useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import camera from '../asset/project-fair-camera.jpeg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../service/allApi';
import { useContext } from 'react';
import { addProjectContext } from '../Context/ContexShare';



function AddProject() {
//useContext is used to access the context
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectContext)

  const [project,setProject] =useState({
    title:'',
    language:'',
    github:'',
    website:'',
    overview:'',
    projectImage:''
  })
  console.log('project=',project);
    const [show, setShow] = useState(false);

    //hold tocken
    const [ tocken,setTocken] = useState('')

    useEffect(()=>{
      if(sessionStorage.getItem('tocken')){
        setTocken(sessionStorage.getItem('tocken'))

      }
    },[])
    console.log('tocken=',tocken);

    //---------state to hold url of the file------------//
    const [preview,setPreview] = useState('')


  //------------------display image-------------------//
  //url is predefined method in js which has createObjectURL method which can convert file into url
    useEffect(()=>{
      project.projectImage &&
      setPreview(URL.createObjectURL(project.projectImage))
    },[project.projectImage])
    console.log('preview=',preview);
    

  const handleClose = () => {
    setShow(false)
    setProject( {
    title:'',
    language:'',
    github:'',
    website:'',
    overview:'',
    projectImage:''
  })
  setPreview('')

  };
  const handleCloseTop = () =>{
    handleClose()
  }
  const handleShow = () => setShow(true);
  const handleProject = async(e) =>{
     e.preventDefault()
     const {title,language,github,website,overview,projectImage} = project
     if(!title || !language || !github || !website || !overview ||!projectImage){
      toast.info('Please Fill Form')
     }else{
      //REQBODY
      //create an object of formdata class - since we have uploaded content
      //multipart/form-data
      const body = new FormData()
     // 2) add data - append()
     body.append("title",title)
     body.append("language",language)
     body.append("github",github)
     body.append("website",website)
     body.append("overview",overview)
     body.append("projectImage",projectImage)

     if(tocken) {
      const  header = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${tocken}`
       }

        const result = await addProjectApi(body,header)
        console.log(result);
       

       if(result.status === 200){
        console.log('add success=',result.data);
      toast.success('Project added Successfully  ')
      handleCloseTop()
      setAddProjectResponse(result.data)
       }else{
        console.log('err add project=',result.response.data);
        toast.error('Try again')
        handleClose()
       }
      }
     }
  }

  

  return (
    <>
     <Button variant="success" onClick={handleShow}>
        Add Project
      </Button>

     <div className='w-100'>
     <Modal show={show} onHide={handleCloseTop}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='row'>
                <div className='col-sm-12 col-md-6  '>
                <label htmlFor="search">
                    <input id='search' style={{display:'none'}} type="file"  onChange={(e)=>setProject({...project,projectImage:e.target.files[0]})} />
                    <img className='w-100 shadow img-fluid rounded mt-4'  src={preview ? preview : camera} alt="" />
                    </label>

                </div>
                <div className='col-sm-12 col-md-6 '>
                    <div className='w-100 mt-3'>
                    <input className='form-control ' value={project.title} onChange={(e)=>setProject({...project,title:e.target.value})} placeholder='Project Title' type="text" />

                    </div>
                    <div className='w-100 mt-2'>
                    <input className='form-control' value={project.language} onChange={(e)=>setProject({...project,language:e.target.value})} placeholder='Language used' type="text" />

                    </div>
                    <div className='w-100 mt-2'>
                    <input className='form-control' value={project.github} onChange={(e)=>setProject({...project,github:e.target.value})} placeholder='Github Link' type="text" />

                    </div>
                    <div className='w-100 mt-2'>
                    <input className='form-control' value={project.website} onChange={(e)=>setProject({...project,website:e.target.value})} placeholder='Website Link' type="text" />

                    </div>
                    <div className='w-100 mt-2'>
                        <textarea className='form-control' value={project.overview} onChange={(e)=>setProject({...project,overview:e.target.value})} placeholder='Project Overview' name="" id="" cols="24" rows="2"></textarea>
                    </div>
                   
                   

                </div>

            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleProject}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
     </div>
     <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default AddProject
