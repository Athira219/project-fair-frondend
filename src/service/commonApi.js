import axios from "axios"

export const commonApi = async(httprequest, url, body, header) => {

    const requestConfig = {
        method: httprequest,
        url: url,
        data: body,
        headers: header ?header: { "Content-Type":"application/json"}
    }
    
     return  await axios(requestConfig).then((result)=>{
        return result
       }).catch((err)=>{
        console.log(err);
        return err

})

}