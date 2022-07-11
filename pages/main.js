import React from 'react'

const Main = () => {
    return (
        <div>
            <header className="masthead">
                <div className="container px-4 px-lg-5 h-100">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end">
                            <h1 className="text-white font-weight-bold">หน้าแรก</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 mb-5">กรณีรับเสื้อ และ BIB สามารถรับได้ที่หน้างาน ตั้งแต่เวลา 15:00 - 19:00 น. ของวันที่ 17 กันยายน 2565 และเวลา 04:00 - 05:00 น. ของวันที่ 18 กันยายน 2565</p>
                            <a className="btn btn-primary btn-xl" href="https://docs.google.com/forms/d/e/1FAIpQLSf5GVq8yhLRcky-tGeLDgBTPxheG_Gzn3vcXK5UGOYUDmzxoQ/viewform" target={'_blank'}>สมัครวิ่ง</a>
                        </div>
                    </div>
                </div>
            </header>

        </div>
    )
}

export default Main