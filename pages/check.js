import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config'
import ReactInputMask from 'react-input-mask'
import moment from 'moment'

const api = config.api

const Check = () => {

    const [textShow, settextShow] = useState('')
    const [classCss, setclassCss] = useState('form-control')
    const [YearNow, setYearNow] = useState('')
    const [dataCidRegister, setdataCidRegister] = useState({})

    useEffect(() => {
        // getData()
        const dateARR = []

        dateARR = moment().add(543, 'year').format('LL').split(' ')
        setYearNow(dateARR[2])
    }, [])

    //----------------------------------------------------------------------------------------------------- START GET BY CID
    const getCidRegis = async (cid) => {
        setclassCss('form-control')
        settextShow('')
        if (cid.length > 12) {
            try {
                let res = await axios.get(`${api}/get-register-cid/${cid}`)
                // console.log(res.data)
                if (res.data.length == 1) {
                    setclassCss('form-control is-valid')
                    res.data.map((item, i) => {
                        setdataCidRegister(item)
                        settextShow('Y')
                    })
                } else {
                    settextShow('ไม่พบหมายเลขที่ท่านกรอกมาในเบื้องต้น กรุณาตรวจสอบใหม่อีกครั้งครับ...')
                    setclassCss('form-control is-invalid')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    //----------------------------------------------------------------------------------------------------- END GET BY CID

    //---------------------------------------------------------------------------------------------------------------------------- START FORMAT PHONE NUMBER
    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        // console.log(match)
        if (match) {
            return match[1] + '-' + match[2] + '-' + match[3];
        }
        return null;
    }
    //---------------------------------------------------------------------------------------------------------------------------- END FORMAT PHONE NUMBER

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
                            <h1 className="text-white font-weight-bold">ตรวจสอบสถานะ</h1>
                            <hr className="divider" />
                            <div className="form-group">
                                <ReactInputMask type="text" className={classCss} id="cid" placeholder="กรอกเลขประจำตัวประชน" mask="9-9999-99999-99-9"
                                    onChange={e => {
                                        let cids = e.target.value.replaceAll('-', '')
                                        let cid = cids.replaceAll('_', '')
                                        getCidRegis(cid)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-8 align-self-baseline mt-5">
                            {textShow == 'Y' ?
                                <div className="table-responsive-lg">
                                    <table className="table text-white">
                                        <tbody>
                                            <tr>
                                                <td style={{ textAlign: 'right' }}>ชื่อ-สกุล : </td>
                                                <td style={{ textAlign: 'left' }}>{dataCidRegister.regis_prefix + ' ' + dataCidRegister.regis_fullname}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'right' }}>อายุ : </td>
                                                <td style={{ textAlign: 'left' }}>{dataCidRegister.regis_year != '' ? YearNow - dataCidRegister.regis_year + ' ปี' : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'right' }}>เบอร์โทร : </td>
                                                <td style={{ textAlign: 'left' }}>{formatPhoneNumber(dataCidRegister.regis_tel)}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'right' }}>ระยะแข่งขัน : </td>
                                                <td style={{ textAlign: 'left' }}>
                                                    {
                                                        dataCidRegister.regis_type == 'funrun' ? 'Fun run 5 km' :
                                                            dataCidRegister.regis_type == 'mini' ? 'Mini 12.5 km' :
                                                                dataCidRegister.regis_type == 'vipfunrun' ? 'VIP Fun run 5 km' :
                                                                    dataCidRegister.regis_type == 'vipmini' ? 'VIP Mini 12.5 km' : '-'
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'right' }}>BIB : </td>
                                                <td style={{ textAlign: 'left' }}>{dataCidRegister.regis_bib != null ? dataCidRegister.regis_bib : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'right' }}>สถานะการสมัคร : </td>
                                                <td style={{ textAlign: 'left' }}><span className={dataCidRegister.regis_status == '1' ? 'badge bg-success' : 'badge bg-danger'}>{dataCidRegister.regis_status == '1' ? 'สมัครสำเร็จ' : 'รอตรวจสอบ'}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                : <p className='text-white'>{textShow}</p>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Check



