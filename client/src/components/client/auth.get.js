import axios from 'axios'

export default async () => {
    try {
        const URL = 'http://192.168.1.152:5000/auth/'
        return await axios.get(URL, {
            timeout: 3000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return error
    }
}

