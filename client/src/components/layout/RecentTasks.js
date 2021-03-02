import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Swal from 'sweetalert2'
import './App.css'
import MaterialTable from "material-table"

import hittask from '../client/tasks.get'
import posttask from '../client/tasks.post'
import hituser from '../client/auth.get'

const RecentTasks = () => {
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
    const handlerChange = (e) => {
        setformData(formdata => ({ ...formdata, [e.target.name]: e.target.value }))
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        const a = (Object.keys(formdata).length)
        if (a < 2) {
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
            arr.push({ userID: idUser, keterangan: formdata.keterangan, status: formdata.status })
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

    let arr = []
    taskData.map(td => {
        if (td.status === 'Selesai') {
            const format = require('date-fns/format')
            const resultCreated = format(new Date(td.created_at), 'dd/MM/yyyy')
            const resultUpdated = format(new Date(td.updated_at), 'dd/MM/yyyy') || null
            const resultDurasi = format(new Date(td.perkiraanSelesai), 'dd/MM/yyyy')
            arr.push({ id: td._id, keterangan: td.keterangan, userName: td.userID.userName, status: td.status, created_at: resultCreated, updated_at: resultUpdated, durasi: resultDurasi })
        }
    })

    useEffect(() => {
        getTasks()
        getUser()
    }, [])


    return (
        <div>
            <Navbar />
            <div className="container-fluid flex">
                <div style={{ marginTop: "50px" }}>
                    <center><h5>Recent Tasks</h5></center>
                </div>
                <div className="row clearfix">
                    <div className="container-fluid flex">
                        <MaterialTable
                            title="Data Recent Tasks"
                            columns={[
                                { title: "ID", field: "id", hidden: true },
                                { title: "Nama User", field: "userName" },
                                { title: "Keterangan", field: "keterangan" },
                                { title: "Status", field: "status" },
                                { title: "Dibuat tgl", field: "created_at" },
                                { title: "Target Selesai", field: "durasi" },
                                { title: "Selesai tgl", field: "updated_at" },
                            ]}
                            data={(arr)}
                            options={{
                                grouping: true
                            }}
                        />
                    </div>
                </div>
            </div>


            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
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
                                    <label for="inp_deskripsikategori">Status</label>
                                    <select className="form-control" name="status" onInput={handlerChange.bind(this)}>
                                        <option>     </option>
                                        <option value="Dikerjakan" label="Dikerjakan"></option>
                                        <option value="Selesai" label="Selesai"></option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default RecentTasks