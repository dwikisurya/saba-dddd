import axios from 'axios'

export default async (id, reqBody) => {
    let str_reqbod = JSON.stringify(reqBody)
    const c = `{"imgPath":`
    const d = str_reqbod + "}"
    const e = c + d


    try {
        let res = await axios({
            method: 'PUT',
            url: `http://192.168.1.152:5000/proyek/${id}`,
            data: e,
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        })
        console.log(`Status code: ${res.status}`);
        console.log(`Status text: ${res.statusText}`);

    } catch (error) {
        return error
    }
}