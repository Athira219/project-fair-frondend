import { baseURL } from "./baseURL";
import { commonApi } from "./commonApi";

//----------register---------//
export const registerApi = (reqBody) => {
  return commonApi('POST', `${baseURL}/user/register`, reqBody, "")
}
//----------login---------//
export const loginApi = (reqBody) => {
  return commonApi('POST', `${baseURL}/user/login`, reqBody, "")
}
//----------add project details----------//
export const addProjectApi = (body, header) => {
  return commonApi('POST', `${baseURL}/project/addProject`, body, header)
}

//-----------------home project-----------//
export const homeProject = async () => {
  return await commonApi('GET', `${baseURL}/project/home-project`)
}

//-----------------All Project ----------------//
export const allProject = async (searchkey, reqHeader) => {

  //que ryparameter  = path?key=value
  return await commonApi('GET', `${baseURL}/project/all-project?search=${searchkey}`, "", reqHeader)

}

//-----------------User Project ----------------//
export const userProject = async (reqHeader) => {
  return await commonApi('GET', `${baseURL}/user/userproject`, "", reqHeader)

}
//----------edit project details----------//
export const editProjectApi = (projectId, reqbody, reqHeader) => {
  return commonApi('PUT', `${baseURL}/project/edit/${projectId}`, reqbody, reqHeader)
}
//--------------------delete project --------------------------------//
export const deleteProjectApi =  (projectId,reqHeader) => {
  return  commonApi('DELETE', `${baseURL}/project/delete/${projectId}`, {}, reqHeader)

}

//-----------edit profile-------------------------//
export const editprofileApi = ( reqbody, reqHeader) => {
  return commonApi('PUT', `${baseURL}/profile/edit`, reqbody, reqHeader)
}