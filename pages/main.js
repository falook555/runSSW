import React from 'react'
import { useRouter } from 'next/router'

const Main = () => {

    const router = useRouter()

    const check = () => {
        router.push({
            pathname: '/',
            query: {
                path: 'check'
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


    const styling = {
        paddingTop: '10rem',
        paddingBottom: 'calc(10rem - 4.5rem)',
        background: `linear-gradient(to bottom, rgba(92, 77, 66, 0.8) 0%, rgba(92, 77, 66, 0.8) 100%), url('../assets/img/bg-masthead.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'scroll',
        backgroundRepeat: 'no-repeat',
        height: '51rem'
    }


    return (
        <div>
            <section className="page-section" style={styling}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-12 align-self-end">
                            <h1 className="text-white font-weight-bold text-center">หน้าแรก</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-12 align-self-baseline">
                            <p className="text-white-75 mb-5">
                                กรณีรับเสื้อ และ BIB สามารถรับได้ที่หน้างาน ตั้งแต่เวลา 15:00 - 19:00 น. ของวันที่ 17 กันยายน 2565 และเวลา 04:00 - 05:00 น. ของวันที่ 18 กันยายน 2565
                            </p>
                            <div className='row'>
                                <div className='col-lg-6 col-5' style={{ textAlign: 'right' }}>
                                    <a className="btn btn-primary btn-xl" onClick={register}>สมัครวิ่ง</a>
                                </div>
                                {/* <div className='col-lg-6 col-5' style={{ textAlign: 'right' }}>
                                    <a className="btn btn-primary btn-xl" href="https://docs.google.com/forms/d/e/1FAIpQLSf5GVq8yhLRcky-tGeLDgBTPxheG_Gzn3vcXK5UGOYUDmzxoQ/viewform" target={'_blank'} rel="noreferrer">สมัครวิ่ง</a>
                                </div> */}
                                <div className='col-lg-6 col-7' style={{ textAlign: 'left' }}>
                                    <a className="btn btn-info btn-xl" onClick={check}>ตรวจสอบสถานะ</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Main