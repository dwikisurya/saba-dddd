import axios from 'axios'

export default async (reqBody) => {
    try {
        let res = await axios({
            method: 'post',
            url: 'http://192.168.1.152:5000/task/tambah',
            data: reqBody
        })

        console.log(`Status code: ${res.status}`);
        console.log(`Status text: ${res.statusText}`);

    } catch (error) {
        console.log(error)
    }
}