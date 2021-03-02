import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Swal from 'sweetalert2'
import './App.css'
import _ from 'lodash'
import * as XLSX from 'xlsx';

import hitupload from '../client/upload.post'
import hitproyek from '../client/proyek.post'
import getproyek from '../client/proyek.get'
import putproyek from '../client/proyek.put'
import deleteproyek from '../client/proyek.delete'

const UploadPic = () => {
    const namaUser = localStorage.getItem('namaUser') || null
    const idUser = localStorage.getItem('id') || null

    // Get Proyek
    const [proyekData, setProyekData] = useState([])
    const getProyek = async () => {
        const proyekq = await getproyek()
        if (proyekq.status === 200) {
            setProyekData(proyekq.data)
        } else {
            console.log(proyekq)
        }
    }

    const [formdata, setformData] = useState({
        selectedFile: null
    })
    const [formproyekbaru, setProyeBaru] = useState({})
    const [idproyek, setidproyek] = useState({})

    const onChangeHandler = event => {
        setformData({
            selectedFile: event.target.files[0],
            selectedFileName: event.target.files[0].name,
            lastModified: event.target.files[0].lastModified,
            loaded: 0,
        })
    }

    const changeHandler = (e) => {
        setidproyek(formdata => ({ ...formdata, [e.target.name]: e.target.value }))
    }

    const onClickHandler = () => {
        let proyekq = idproyek.proyekID
        let imgPath = formdata.selectedFileName
        const data = new FormData()
        data.append('file', formdata.selectedFile)
        hitupload(data)
        putproyek(proyekq, imgPath)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: 'Data telah ditambah'
        }).then(res => {
            getProyek()
        })
    }

    const handleProyeBaru = (e) => {
        setProyeBaru(formdata => ({ ...formdata, [e.target.name]: e.target.value }))
    }
    const handlerProyekBaru = (e) => {
        e.preventDefault()
        const a = (Object.keys(formproyekbaru).length)
        if (a < 1) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'error',
                title: 'Error',
                text: 'Harap isi Field yang kosong',
            })
        } else {
            const arr = []
            arr.push({ namaProyek: formproyekbaru.namaProyek, provinsi: formproyekbaru.provinsi })
            hitproyek(arr[0])
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Data telah ditambah'
            }).then(res => {

            })
        }
    }

    useEffect(() => {
        getProyek()
    }, [])


    const renderPilihanProyek = () => {
        return proyekData.map(pd => {
            return <option key={pd._id} value={pd._id} name={pd.namaProyek}>{pd.namaProyek}</option>
        })
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid flex">
                <div style={{ marginTop: "50px" }}>
                    <center>
                        <h3>Monitoring Progress Project</h3>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Upload File</button>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalProyekbaru" style={{ marginLeft: '10px' }}>Proyek Baru</button>
                    </center>

                    <div className="containter-fluid flex">
                        <div class="row">
                            {
                                proyekData.map(pd => {
                                    const format = require('date-fns/format')
                                    const resultFormatCat = format(new Date(pd.created_at), 'dd MMMM yyyy')
                                    if (pd.updated_at != null) {
                                        const resultFormatUat = format(new Date(pd.updated_at), 'dd MMMM yyyy')
                                        return <div className="col-md-6" style={{ marginTop: '50px', marginLeft: '0px', marginBottom: '5px', border: 'ridge' }}>
                                            <center>
                                                <h5 style={{ marginTop: '10px' }}>{pd.namaProyek}</h5>
                                                <h3 style={{ marginTop: '10px' }}>{pd.provinsi}</h3>
                                            </center>
                                            <div className="card" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                <div class="card-header">Progress</div>
                                                <div className="card-body">
                                                    <center><img src={'images/capture/Pic-' + pd.imgPath || null} width="650" height="275" style={{ marginTop: '10px' }} alt="Card image cap"></img></center>
                                                </div>
                                                <div className="card-footer">
                                                    <span className="pull-left" style={{ marginTop: '10px', marginLeft: '10px' }}>
                                                        <p>{'Created at : ' + resultFormatCat}</p>
                                                    </span>
                                                    <span className="pull-right" style={{ marginTop: '10px', marginLeft: '10px' }}>
                                                        <p>{`Updated at ` + resultFormatUat}</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    } else {
                                        return <div className="col-md-6" style={{ marginTop: '50px', marginLeft: '0px', marginBottom: '5px', border: 'ridge' }}>
                                            <center>
                                                <h5 style={{ marginTop: '10px' }}>{pd.namaProyek}</h5>
                                                <h3 style={{ marginTop: '10px' }}>{pd.provinsi}</h3>
                                            </center>
                                            <div className="card" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                <div class="card-header">Progress</div>
                                                <div className="card-body">
                                                    <center><img src={'images/capture/Pic-' + pd.imgPath || null} width="650" height="275" style={{ marginTop: '10px' }} alt="Card image cap"></img></center>
                                                </div>
                                                <div className="card-footer">
                                                    <span className="pull-left" style={{ marginTop: '10px', marginLeft: '10px' }}>
                                                        <p>{'Created at : ' + resultFormatCat}</p>
                                                    </span>
                                                    <span className="pull-right" style={{ marginTop: '10px', marginLeft: '10px' }}>
                                                        <p>{`Updated at ` + pd.updated_at}</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                })
                            }
                        </div>
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
                            <label>Pilih Proyek</label>
                            <select className="form-control" name="proyekID" onChange={changeHandler.bind(this)}  >
                                <option>     </option>
                                {renderPilihanProyek()}
                            </select>

                            <input type="file" name="file" style={{ marginTop: '50px' }} onChange={onChangeHandler} />
                            <button type="button" class="btn btn-success btn-block" style={{ marginTop: '50px' }} onClick={onClickHandler}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalProyekbaru" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-m" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Upload Capture</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handlerProyekBaru}>
                                <div className="form-group">
                                    <label for="inp_status">Nama Proyek</label>
                                    <input type="text" className="form-control" name="namaProyek" onInput={handleProyeBaru.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label for="inp_status">Provinsi</label>
                                    <input type="text" className="form-control" name="provinsi" onInput={handleProyeBaru.bind(this)} />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ float: 'right' }}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>






        </div>


    )
}

export default UploadPic