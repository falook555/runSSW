import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactInputMask from 'react-input-mask'
import moment from 'moment'

const Check = () => {

    // const [cidCheck, setcidCheck] = useState('')
    const [Data, setData] = useState([])
    const [Datacid, setDatacid] = useState([])
    const [textShow, settextShow] = useState('')
    const [classCss, setclassCss] = useState('form-control')
    const [endData, setendData] = useState({})
    const [YearNow, setYearNow] = useState('')

    useEffect(() => {
        // getData()
        const dateARR = []

        dateARR = moment().add(543, 'year').format('LL').split(' ')
        setYearNow(dateARR[2])
    }, [])

    //---------------------------------------------------------------------------------------------------------------------------- START GET DATA
    const getData = async () => {
        try {
            let api = 'https://script.google.com/macros/s/AKfycbzuGefuTz_gMVFP719Wv-WXI74EsL9s7Ze7jqVzBCZzbOmJLS2hWGrzPAkvU9u7hNSKNg/exec'
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

    //----------------------------------------------------------------------------------------------------------------------------- START FUNCTION CHECK
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
                settextShow('???????????????????????????????????????????????????????????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????...')
                setclassCss('form-control is-invalid')
            }
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------- END FUNCTION CHECK

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
                            <h1 className="text-white font-weight-bold">????????????????????????????????????</h1>
                            <hr className="divider" />
                            <div className="form-group">
                                <ReactInputMask type="text" className={classCss} id="cid" placeholder="????????????????????????????????????????????????????????????" mask="9-9999-99999-99-9"
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
                                                <td style={{ textAlign: 'right' }}>????????????-???????????? : </td>
                                                <td style={{ textAlign: 'left' }}>{endData.prefix + ' ' + endData.fullname}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'right' }}>???????????? : </td>
                                                <td style={{ textAlign: 'left' }}>{endData.year != '' ? YearNow - endData.year + ' ??????' : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'right' }}>???????????????????????? : </td>
                                                <td style={{ textAlign: 'left' }}>{formatPhoneNumber(endData.tel)}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'right' }}>????????????????????????????????? : </td>
                                                <td style={{ textAlign: 'left' }}>{endData.type}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'right' }}>BIB : </td>
                                                <td style={{ textAlign: 'left' }}>{endData.bib != '' ? endData.bib : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'right' }}>??????????????????????????????????????? : </td>
                                                <td style={{ textAlign: 'left' }}><span className={endData.actions == 'Y' ? 'badge bg-success' : 'badge bg-danger'}>{endData.actions == 'Y' ? '?????????????????????????????????' : '???????????????????????????'}</span></td>
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



