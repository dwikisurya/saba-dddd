import React from 'react'
import Swal from 'sweetalert2'

const Navbar = () => {
    const namaUser = localStorage.getItem('namaUser') || null
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Home</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="nav-link" href="/home">Daily Activity</a>
                            <a className="nav-link" href="/recenttasks">Activity Selesai</a>

                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/uploadpics">Monitoring Progress</a>
                    </li>

                </div>

                <div className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Account </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="nav-link">{`Halo, ` + namaUser}</a>
                            {
                                namaUser === "admin" &&
                                <a className="nav-link" href="#" data-toggle="modal" data-target="#modalCreateNewUser">Tambah User</a>
                            }
                            <a className="nav-link" href="#" data-toggle="modal" data-target="#exampleModalCenter1">Ganti Password</a>
                            <a className="nav-link" href="#" onClick={function () {
                                localStorage.clear()
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 2000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.addEventListener('mouseenter', Swal.stopTimer)
                                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                                })
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Logout Berhasil'
                                }).then(res => {
                                    window.location = '/login'
                                })
                            }}>Log Out</a>
                        </div>
                    </li>
                </div>

            </nav>
        </div>
    )
}

export default Navbar