import React, { useContext, useEffect } from 'react'
import AddProject from './AddProject'
import { useState } from 'react'
import { deleteProjectApi, userProject } from '../service/allApi'
import { addProjectContext, editProjectContext } from '../Context/ContexShare'
import EditProject from './EditProject'

function MyProject({ }) {
  //useContext is used to access the context
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectContext)
  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectContext)
  const [usersProject, setUsersProject] = useState([])

  const getUserProjects = async () => {

    const tocken = sessionStorage.getItem('tocken')

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `bearer ${tocken}`
    }

    const result = await userProject(reqHeader)
    console.log('result=', result.data);
    setUsersProject(result.data)
  }
  useEffect(() => {
    getUserProjects()
  }, [addProjectResponse, editProjectResponse])
  console.log('usersProject=', usersProject);

  

  //--------------delete--------------//
  const deleteProject = async (_id) => {

    const tocken = sessionStorage.getItem('tocken')
    const reqHeader = {
      "Authorization": `bearer ${tocken}`,
      "Content-Type": "application/json"
    }

    const deleteResult = await deleteProjectApi(_id, reqHeader)
    console.log('deleteResult=', deleteResult);
    if(deleteResult.status ===200){
      getUserProjects()
    }else{
      console.log('deleteResult=',deleteResult.response.data);
    }

  }
  return (
    <>
      <div className='card row shadow rounded p-2 ms-5 me-5 mb-3' style={{ overflowY: 'hidden' }}>
        <div className='col-sm-12'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h4 className='text-success' style={{ overflowY: 'hidden' }}>My Project</h4>
            <div className='ms-auto'>
              <AddProject />
            </div>
          </div>
          {usersProject?.length > 0 ?
            usersProject.map(item => (
              <div className='row border rounded mt-2'>
                <div className='col-sm-12  p-2 d-flex'>
                  <h5 style={{ overflowY: 'hidden' }}>{item.title}</h5>
                  <div className='icons ms-auto  d-flex '>
                    <EditProject project={item} />
                    <a href={item.github} target='_blanck'><i class="fa-brands fa-github text-success"></i></a>
                    <button className='btn' ><i class="fa-solid fa-trash text-danger" onClick={() => deleteProject(item._id)}></i></button>

                  </div>



                </div>

              </div>

            )) :

            <h4 style={{ overflowY: 'hidden' }} className='text-danger mt-3 '>No project uploaded yet !!</h4>}
        </div>
      </div>
    </>

  )
}

export default MyProject
