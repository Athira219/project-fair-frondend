import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import camera from '../asset/project-fair-camera.jpeg'
import { baseURL } from '../service/baseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectApi } from '../service/allApi';
import { editProjectContext } from '../Context/ContexShare';

function EditProject({ project }) {
    const {editProjectResponse,setEditProjectResponse} = useContext(editProjectContext)
    const [show, setShow] = useState(false);

    const [projectDetail, setProjectDetail] = useState({
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ''
    })
    console.log('projectDetail=', projectDetail);

    const handleCloseTop = () => {
        handleClose()
    }
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        


    };
    //---------state to hold url of the file------------//
    const [preview, setPreview] = useState('')
    useEffect(() => {
        if (projectDetail.projectImage) {
            setPreview(URL.createObjectURL(projectDetail.projectImage))
        }
    }, [projectDetail.projectImage])
    console.log(preview);


    const handleProject = async (e) => {
        e.preventDefault()
        const id = project._id
        console.log(id);

        const { title, language, github, website, overview, projectImage } = projectDetail

        if (!title || !language || !github || !website || !overview || !projectImage) {
            toast.info('Fill the Form')
        } else {

            const reqbody = new FormData()

            reqbody.append('title', title)
            reqbody.append('language', language)
            reqbody.append('github', github)
            reqbody.append('website', website)
            reqbody.append('overview', overview)


            preview ? reqbody.append('projectImage', projectImage) : reqbody.append('projectImage', project.projectImage)

            const tocken = sessionStorage.getItem('tocken')
            console.log(tocken);

            if (tocken) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${tocken}`
                }

                const result = await editProjectApi(id,reqbody,reqHeader)
                console.log('edit result=', result);
                if (result.status === 200) {
                    toast.success('Successfully Updated')
                    setEditProjectResponse(result)
                    handleClose()
                } else {
                    console.log(result.response.data);
                }
            } else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${tocken}`
                }
                const result = await editProjectApi(id,reqbody,reqHeader)
                console.log('edit result=', result);
                if (result.status === 200) {
                    toast.success('Successfully Updated')
                    setEditProjectResponse(result)
                    handleClose()

                } else {
                    console.log(result.response.data);
                }
            }



        }


    }

    return (
        <div>
            <button className='btn' onClick={handleShow}><i class="fa-regular fa-pen-to-square text-info"></i></button>


            <div className='w-100'>
                <Modal show={show} onHide={handleCloseTop}>
                    <Modal.Header closeButton>
                        <Modal.Title>Project Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6  '>
                                <label htmlFor="search">
                                    <input id='search' style={{ display: 'none' }} type="file" onChange={(e) => setProjectDetail({ ...projectDetail, projectImage: e.target.files[0] })} />
                                    <img className='w-100 shadow img-fluid rounded mt-4' src={preview ? preview : `${baseURL}/uploads/${project.projectImage}`} alt="" />
                                </label>

                            </div>
                            <div className='col-sm-12 col-md-6 '>
                                <div className='w-100 mt-3'>
                                    <input className='form-control ' value={projectDetail.title} onChange={(e) => setProjectDetail({ ...projectDetail, title: e.target.value })} placeholder='Project Title' type="text" />

                                </div>
                                <div className='w-100 mt-2'>
                                    <input className='form-control' value={projectDetail.language} onChange={(e) => setProjectDetail({ ...projectDetail, language: e.target.value })} placeholder='Language used' type="text" />

                                </div>
                                <div className='w-100 mt-2'>
                                    <input className='form-control' value={projectDetail.github} onChange={(e) => setProjectDetail({ ...projectDetail, github: e.target.value })} placeholder='Github Link' type="text" />

                                </div>
                                <div className='w-100 mt-2'>
                                    <input className='form-control' value={projectDetail.website} onChange={(e) => setProjectDetail({ ...projectDetail, website: e.target.value })} placeholder='Website Link' type="text" />

                                </div>
                                <div className='w-100 mt-2'>
                                    <textarea className='form-control' value={projectDetail.overview} onChange={(e) => setProjectDetail({ ...projectDetail, overview: e.target.value })} placeholder='Project Overview' name="" id="" cols="24" rows="2"></textarea>
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

        </div>
    )
}

export default EditProject
