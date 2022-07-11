import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactInputMask from 'react-input-mask'
const Check = () => {

    // const [cidCheck, setcidCheck] = useState('')
    const [Data, setData] = useState([])
    const [Datacid, setDatacid] = useState([])
    const [textShow, settextShow] = useState('')
    const [classCss, setclassCss] = useState('form-control')
    const [endData, setendData] = useState({})

    useEffect(() => {
        getData()
    }, [])

    //---------------------------------------------------------------------------------------------------------------------------- START GET DATA
    const getData = async () => {
        try {
            let api = 'https://script.google.com/macros/s/AKfycbzc1zR_9oAGOalzF8v23kL60GX2gKHzTW3-JzofpEhGKJNN_hXMroid93x4LzRS4ozXPA/exec'
            axios.get(api).then(resp => {

                let datacid = []
                let dataRun = []
                // console.log(resp.data);
                resp.data.map((item, i) => {
                    // console.log(item)
                    datacid.push(item.cid)
                    dataRun.push(item)
                })
                setData(dataRun)
                setDatacid(datacid)
            });
        } catch (error) {
            console.log(error)
        }
    }
    //---------------------------------------------------------------------------------------------------------------------------- END GET DATA

    const check = async (cidChecks) => {
        setclassCss('form-control')
        settextShow('')
        let cidCheck = cidChecks.replaceAll('_', '')
        if (cidCheck.length > 12) {
            let cidChecks = Datacid.find(id => id === cidCheck.toString())
            if (cidChecks > 0) {
                setclassCss('form-control is-valid')
                Data.map((item, i) => {
                    if (item.cid == cidChecks) {
                        if (item.actions == 'Y') {
                            setendData(item)
                            settextShow('Y')
                        } else {
                            setendData(item)
                            settextShow('Y')
                        }
                    }
                })
            } else {
                settextShow('ไม่พบหมายเลขที่ท่านกรอกมาในเบื้องต้น กรุณาตรวจสอบใหม่อีกครั้ง...')
                setclassCss('form-control is-invalid')
            }
        }
    }

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

    return (
        <div>
            <header className="masthead">
                <div className="container px-4 px-lg-5 h-100">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end">
                            <h1 className="text-white font-weight-bold">ตรวจสอบสถานะ</h1>
                            <hr className="divider" />
                            <div className="form-group">
                                <ReactInputMask type="text" className={classCss} id="cid" placeholder="กรอกเลขประจำตัวประชน" mask="9-9999-99999-99-9"
                                    onChange={e => {
                                        let cids = e.target.value.replaceAll('-', '')
                                        check(cids)
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
                                                <td>ชื่อ-สกุล</td>
                                                <td>{endData.prefix + ' ' + endData.fullname}</td>
                                            </tr>
                                            <tr>
                                                <td>อายุ</td>
                                                <td>{endData.age != '' ? endData.age + ' ปี' : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>เบอร์โทร</td>
                                                <td>{formatPhoneNumber(endData.tel)}</td>
                                            </tr>
                                            <tr>
                                                <td>ระยะแข่งขัน</td>
                                                <td>{endData.type}</td>
                                            </tr>
                                            <tr>
                                                <td>BIB</td>
                                                <td>{endData.bib != '' ? endData.bib : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td>สถานะการสมัคร</td>
                                                <td><span className={endData.actions == 'Y' ? 'badge bg-success' : 'badge bg-danger'}>{endData.actions == 'Y' ? 'สมัครสำเร็จ' : 'รอจ่ายเงิน'}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                : <p className='text-white'>{textShow}</p>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Check



