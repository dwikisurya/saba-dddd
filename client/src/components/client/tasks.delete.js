import axios from 'axios'

export default async (id) => {
    try {
        const URL = `http://192.168.1.152:5000/task/${id}`
        return await axios.delete(URL, {
            data: id
        })
    } catch (error) {
        return error
    }
}