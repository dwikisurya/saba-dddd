import axios from 'axios'

export default async (reqBody) => {
    
    try {
        let res = await axios({
            method: 'PUT',
            url: `http://192.168.1.152:5000/task/status/${reqBody}`,
            data: reqBody
        })

    } catch (error) {
        return error, console.log(error)
    }
}