import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Swal from 'sweetalert2'
import './App.css'
import _ from 'lodash'
import * as XLSX from 'xlsx';

import hitupload from '../client/upload.post'

const TestUpload = () => {
    const namaUser = localStorage.getItem('namaUser') || null
    const idUser = localStorage.getItem('id') || null

    const [formdata, setformData] = useState({
        selectedFile: null
    })
    const [testq, settestq] = useState({})

    const onChangeHandler = event => {
        setformData({
            selectedFile: event.target.files[0],
            selectedFileName: event.target.files[0].name,
            lastModified: event.target.files[0].lastModified,
            loaded: 0,
        })
    }

    const dtask1 = []
    const dtask2 = []
    const dtask3 = []
    const dtask4 = []

    const dataArea = []
    const dataRing = []
    const dataValue = []
    console.log(dataArea)
    const onClickHandler = () => {
        const files = formdata.selectedFile
        const reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            let readedData = XLSX.read(data, { type: 'binary' });
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];

            /* Tarik Kabel*/
            const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1, range: 'A3:J8', defval: 0 })
            const dataParseJudul = XLSX.utils.sheet_to_json(ws, { header: 1, range: 'C1:Z1' })

            // test new
            const dataParseArea = XLSX.utils.sheet_to_json(ws, { header: 1, range: 'A3:A50', })
            const dataParseRing = XLSX.utils.sheet_to_json(ws, { header: 1, range: 'B3:B50', })
            const dataParseValueData = XLSX.utils.sheet_to_json(ws, { header: 1, range: 'C3:Z50' })

            // Area Ring

            for (let bc = 0; bc < dataParseArea.length; bc++) {
                if (dataParseArea[bc].length !== 0) {
                    dataArea.push({ area: dataParseArea[bc] })
                }
            }


            for (let bd = 0; bd < dataParseRing.length; bd++) {
                if (dataParseRing[bd].length !== 0) {
                    dataRing.push(dataParseRing[bd])
                }
            }
            const res_arearing = dataArea.map((e, i) => [e, dataRing[i]])

            //  Value Data + Ring

            for (let i = 0; i < dataParseValueData.length; i++) {
                if (dataParseValueData[i].length !== 0) {

                }
            }

            for (let k = 0; k < dataParseJudul.length; k++) {
                for (let i = 0; i < dataParse.length; i++) {
                    // Tarik Kabel
                    let task = dataParseJudul[0][2]
                    let sites = dataParse[i][0]
                    let ringlink = dataParse[i][1]
                    let harapan = dataParse[i][2]
                    let realitas = dataParse[i][3]

                    // Ke 2
                    let task2 = dataParseJudul[0][4]
                    let sites2 = dataParse[i][0]
                    let ringlink2 = dataParse[i][1]
                    let harapan2 = dataParse[i][4]
                    let realitas2 = dataParse[i][5]

                    // Ke 3
                    let task3 = dataParseJudul[0][6]
                    let sites3 = dataParse[i][0]
                    let ringlink3 = dataParse[i][1]
                    let harapan3 = dataParse[i][6]
                    let realitas3 = dataParse[i][7]

                    // Ke 4
                    let task4 = dataParseJudul[0][8]
                    let sites4 = dataParse[i][0]
                    let ringlink4 = dataParse[i][1]
                    let harapan4 = dataParse[i][8]
                    let realitas4 = dataParse[i][9]

                    dtask1.push({ task: task, site: sites, ringlink: ringlink, rencana: harapan, realitas: realitas })
                    dtask2.push({ task: task2, site: sites2, ringlink: ringlink2, rencana: harapan2, realitas: realitas2 })
                    dtask3.push({ task: task3, site: sites3, ringlink: ringlink3, rencana: harapan3, realitas: realitas3 })
                    dtask4.push({ task: task4, site: sites4, ringlink: ringlink4, rencana: harapan4, realitas: realitas4 })
                }
            }

            settestq({ task1: dtask1, task2: dtask2, task3: dtask3, task4: dtask4 })
        };
        reader.readAsBinaryString(files)
        // const data = new FormData()
        // data.append('file', formdata.selectedFile)
        // hitupload(data)
    }


    const testClick = () => {
        alert('Doc-' + formdata.selectedFileName)
    }
    // useEffect(() => {
    // }, [])
    console.log(dataArea)
    const renderTestRender = () => {
        console.log(dataArea)
        // dataArea
        // dataRing
        // dataValue
        return dataArea.map((dArea, i) => {
            console.log(dArea)
            return (
                <tr key={i}>
                    <td>{i}</td>
                </tr>
            )

        })
    }


    return (
        <div>
            <Navbar />
            <div className="container-fluid flex">
                <div style={{ marginTop: "50px" }}>
                    <center>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Upload File</button>
                        <button type="button" className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={() => testClick()}>AA</button>
                    </center>
                    <div className="col-md-5">
                        <h5>Test Render</h5>
                        <table className="table table-bordered" id="SDM">
                            <thead>
                                <tr>
                                    <th>Area</th>
                                    <th>Ring/Link</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{renderTestRender()}</tbody>
                        </table>
                    </div>
                </div>

                <div className="containter-fluid flex">
                    <div class="row">

                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-m" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Upload Capture</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="file" name="file" onChange={onChangeHandler} />
                            <button type="button" class="btn btn-success btn-block" style={{ marginTop: '50px' }} onClick={onClickHandler}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default TestUpload