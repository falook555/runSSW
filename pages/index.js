
import React from "react"
import Check from "./check"
import { useRouter } from 'next/router'
import Main from "./main"
import Contact from "./contact"
import Register from "./register"

export default function Home() {

  const router = useRouter()
  const { path } = router.query

  const check = () => {
    router.push({
      pathname: '/',
      query: {
        path: 'check'
      },
    })
  }

  const home = () => {
    router.push({
      pathname: '',
      query: {
        path: 'home'
      },
    })
  }

  const register = () => {
    router.push({
      pathname: '',
      query: {
        path: 'register'
      },
    })
  }

  const contact = () => {
    router.push({
      pathname: '/',
      query: {
        path: 'contact'
      },
    })
  }

  const login = () => {
    router.push({
      pathname: '/login',
      query: {
        path: 'login'
      },
    })
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand pointer" onClick={home}>รพ.ศรีสังวร RUN</a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto my-2 my-lg-0">
              <li className="nav-item"><a className="nav-link pointer" onClick={home}>หน้าแรก</a></li>
              <li className="nav-item"><a className="nav-link pointer" onClick={register}>สมัครวิ่ง</a></li>
              <li className="nav-item"><a className="nav-link pointer" onClick={check}>ตรวจสอบสถานะ</a></li>
              <li className="nav-item"><a className="nav-link pointer" onClick={contact}>ติดต่อ</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Content */}
      {
        path == 'check' ? <Check />
          : path == 'contact' ? <Contact />
            : path == 'register' ? <Register />
              : <Main />
      }
      {/* Content */}

      <footer className="bg-light py-5">
        <div className="container px-4 px-lg-5">
          <div className="text-center">
            Copyright © 2022 - Srisangworn Sukhothai Hospital - Dev :
            <a href="https://www.facebook.com/profile.php?id=100080703297745" target="_blank" rel="noreferrer">
              &nbsp;กนต์ธร โทนทรัพย์
            </a>
            {/* <a onClick={login}>
              &nbsp;- [ admin :
              &nbsp;<i className="bi bi-shield-lock-fill" /> ]
            </a> */}
          </div>
        </div>
      </footer>

    </div>
  )
}
