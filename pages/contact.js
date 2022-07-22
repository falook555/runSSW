import React from 'react'

const Contact = () => {

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
                        <div className="col-lg-8 align-self-end">
                            <h1 className="text-white font-weight-bold">ติดต่อ</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 mb-5">ข้อมูลการติดต่อแอดมินดูแลเรื่องการสมัครวิ่ง...</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact