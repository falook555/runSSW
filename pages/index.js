
import React from "react"
import Check from "./check"
import { useRouter } from 'next/router'
import Main from "./main"
import Contact from "./contact"

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

  const contact = () => {
    router.push({
      pathname: '/',
      query: {
        path: 'contact'
      },
    })
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand pointer" onClick={home}>รพ.ศรีสังวรสุโขทัย</a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto my-2 my-lg-0">
              <li className="nav-item"><a className="nav-link pointer" onClick={home}>หน้าแรก</a></li>
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
            : <Main />
      }
      {/* Content */}

      <footer className="bg-light py-5">
        <div className="container px-4 px-lg-5"><div className="small text-center">Copyright © 2022 - Srisangworn Sukhothai Hospital - Dev : <a href="https://www.facebook.com/profile.php?id=100080703297745" target="_blank" rel="noreferrer">กนต์ธร โทนทรัพย์</a></div></div>
      </footer>

    </div>
  )
}
