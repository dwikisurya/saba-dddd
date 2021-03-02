import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Swal from 'sweetalert2'
import './App.css'
import _ from 'lodash'

import hittask from '../client/tasks.get'
import posttask from '../client/tasks.post'
import putstatustask from '../client/task.put.status'
import postuser from '../client/auth.register'
import gantipassuser from '../client/auth.gantipassword'

import hituser from '../client/auth.get'


const Dashboard = () => {
    const namaUser = localStorage.getItem('namaUser') || null
    const idUser = localStorage.getItem('id') || null
    const [taskData, setTaskData] = useState([])

    const getTasks = async () => {
        const taskq = await hittask()
        if (taskq.status === 200) {
            setTaskData(taskq.data)
        } else {
            console.log(taskq)
        }
    }

    const [userData, setUserData] = useState([])
    const getUser = async () => {
        const userq = await hituser()
        if (userq.status === 200) {
            setUserData(userq.data)
        } else {
            console.log(userq)
        }
    }

    const [formdata, setformData] = useState({})
    const [formuserbaru, setUserBaruData] = useState({})
    const [formgantipassword, setGantiPasswordData] = useState({})
    const [filepath, setFilePathData] = useState({})

    const handlerChange = (e) => {
        setformData(formdata => ({ ...formdata, [e.target.name]: e.target.value }))
    }

    const handlerUserBaruChange = (e) => {
        setUserBaruData(formdata => ({ ...formdata, [e.target.name]: e.target.value }))
    }

    const handlerFilePathChange = (e) => {
        setFilePathData({
            selectedFileName: e.target.files[0].name
        });
    }

    const handlerGantiPasswordChange = (e) => {
        setGantiPasswordData(formdata => ({ ...formdata, [e.target.name]: e.target.value }))
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        const a = (Object.keys(formdata).length)
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
            arr.push({ userID: idUser, keterangan: formdata.keterangan, status: formdata.status, perkiraanSelesai: formdata.tglKerja })
            posttask(arr[0])
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
                getTasks()
            })
        }
    }

    const handlerUserBaru = (e) => {
        e.preventDefault()
        let filename_path = ''
        if (filepath.selectedFileName === undefined) {
            filename_path = `100x100.jpg`
        } else {
            filename_path = filepath.selectedFileName
        }
        console.log(filename_path)

        const a = (Object.keys(formuserbaru).length)
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
            const arrUserBaru = []
            arrUserBaru.push({ userName: formuserbaru.userName, password: formuserbaru.password, pathImg: filename_path, fullName: formuserbaru.fullName })
            postuser(arrUserBaru[0])
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
                getTasks()
                getUser()
            })
        }
    }

    const handlerGantiPassword = (e) => {
        e.preventDefault()
        if (formgantipassword.password === formgantipassword.newpassword) {
            const arrGantiPass = []
            arrGantiPass.push({ id: idUser, password: formgantipassword.password })
            gantipassuser(arrGantiPass[0])
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
                title: 'Password berhasil diganti!'
            }).then(res => {
                getTasks()
                getUser()
            })
        }
    }

    const updateStatus = (id, namauserdariCard) => {
        if (namauserdariCard === namaUser) {
            putstatustask(id)
                .then(res => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: `Task id: ` + id + ` sudah selesai`
                    })
                    getTasks()
                })

        } else {
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
                text: 'Hayo nakal',
            })
        }
    }

    const selesaiPic = () => {
        const { value: file } = Swal.fire({
            title: 'Select image',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            }
        })

        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                Swal.fire({
                    title: 'Your uploaded picture',
                    imageUrl: e.target.result,
                    imageAlt: 'The uploaded picture'
                })
            }
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        getTasks()
        getUser()
    }, [])


    return (
        <div>
            <Navbar />
            <div className="container-fluid flex">
                <div style={{ marginTop: "50px" }}>
                    <center>
                        <h3>Officer Daily Activity Plan</h3>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Tambah</button>
                    </center>
                </div>

                <div className="containter-fluid flex">
                    <div class="row">
                        {
                            userData.map(ud => {
                                if (ud.userName !== 'admin' && ud.userName !== 'root') {
                                    return <div className="col-md-4" style={{ marginTop: '50px', marginLeft: '0px', marginBottom: '5px', border: 'ridge' }}>
                                        <center><img src={'images/' + ud.pathImg} width="150" height="150" style={{ marginTop: '10px' }} alt="Card image cap"></img></center>
                                        <center><h5 style={{ marginTop: '10px' }}>{ud.fullName}</h5></center>
                                        <div className="card" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                            <div class="card-header">
                                                Apa yang dikerjakan?
                                                    </div>
                                            {taskData.map(td => {
                                                const formatDistanceToNow = require('date-fns/formatDistanceToNow')
                                                const result = formatDistanceToNow(
                                                    new Date(td.created_at),
                                                    { includeSeconds: true }
                                                )
                                                const format = require('date-fns/format')
                                                const resultFormat = format(new Date(td.perkiraanSelesai), 'dd MMMM yyyy')
                                                if (ud.userName === td.userID.userName && td.status !== 'Selesai') {
                                                    return <div className="card-body">
                                                        <ul className="list-group list-group-flush">
                                                            <p><li className="list-group-item" style={{ marginTop: '10px' }}>{td.keterangan}
                                                                <span className="pull-right" style={{ display: 'block' }} onClick={() => updateStatus(td._id, td.userID.userName)}>
                                                                    <span className="btn btn-xs btn-default" style={{ display: 'block' }} onClick={() => updateStatus(td._id, td.userID.userName)}>
                                                                        <span className="fa fa-check" onClick={() => updateStatus(td._id, td.userID.userName)} style={{ display: 'block' }}></span>
                                                                    </span>
                                                                </span>
                                                            </li></p>
                                                            <div className="card-footer">
                                                                <span className="pull-left" style={{ marginTop: '10px', marginLeft: '10px' }}>
                                                                    <p>{'Target : ' + resultFormat}</p>
                                                                </span>
                                                                <span className="pull-right" style={{ marginTop: '10px', marginLeft: '10px' }}>
                                                                    <p>{`Posted ` + result + ` ago`}</p>
                                                                </span>
                                                            </div>
                                                        </ul>
                                                    </div>
                                                }
                                            })}
                                        </div>
                                    </div>

                                }
                            })
                        }
                    </div>
                </div>
            </div>


            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-m" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Info</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handlerSubmit}>
                                <div className="form-group">
                                    <label for="inp_status">Keterangan</label>
                                    <input type="text" className="form-control" name="keterangan" onInput={handlerChange.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label for="inp_status">Target</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="tglKerja"
                                        name="tglKerja"
                                        onInput={handlerChange.bind(this)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ float: 'right' }}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-s" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Ganti Password</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handlerGantiPassword}>
                                <div className="form-group">
                                    <label for="inp_status">New Password</label>
                                    <input type="password" className="form-control" name="password" onInput={handlerGantiPasswordChange.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label for="inp_status">Confirm Password</label>
                                    <input type="password" className="form-control" name="newpassword" onInput={handlerGantiPasswordChange.bind(this)} />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ float: 'right' }}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalCreateNewUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-s" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Tambah User Baru</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handlerUserBaru}>
                                <div className="form-group">
                                    <label for="inp_status">Nama Lengkap</label>
                                    <input type="text" className="form-control" name="fullName" onInput={handlerUserBaruChange.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label for="inp_status">Username</label>
                                    <input type="text" className="form-control" name="userName" onInput={handlerUserBaruChange.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label for="inp_status">Password</label>
                                    <input type="password" className="form-control" name="password" onInput={handlerUserBaruChange.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label for="inp_status">File Upload</label><br />
                                    <input type="file" id="myfile" name="myfile" onInput={handlerFilePathChange.bind(this)} />
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

export default Dashboard