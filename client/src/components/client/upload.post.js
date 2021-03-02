import axios from 'axios'

export default async (data) => {
    console.log(data)
    try {
        let res = await axios({
            method: 'post',
            url: 'http://192.168.1.152:5000/upload/tambah',
            data: data
        })

        console.log(`Status code: ${res.status}`);
        console.log(`Status text: ${res.statusText}`);

    } catch (error) {
        console.log(error.response.data)
    }
}