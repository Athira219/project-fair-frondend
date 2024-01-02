import React, { createContext, useState } from 'react'

export const addProjectContext = createContext()
export const editProjectContext = createContext()
export const isTockenContextShare = createContext()


function ContextShare({ children }) {
  //children is predefined props used to share data between all components
  //data share
  const [addProjectResponse, setAddProjectResponse] = useState({})
  //edit
  const [editProjectResponse, setEditProjectResponse] = useState({})
  const [isTocken, setIsTocken] = useState(true)

  return (
    <div>
      {/*
        Provider => provide the data to the components
        children => provide  data to every component
        value =>data to be provided, 
        if there is more than one value it should be given as an object 
          */}
      <addProjectContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
        <editProjectContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>
          <isTockenContextShare.Provider value={{isTocken, setIsTocken}}>
          {children}
          </isTockenContextShare.Provider>

        </editProjectContext.Provider>

      </addProjectContext.Provider>

    </div>
  )
}

export default ContextShare
