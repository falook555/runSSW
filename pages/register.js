import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import React, { useState } from 'react'
import ReactInputMask from 'react-input-mask'
import axios from 'axios'
import config from '../config'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const api = config.api

const Register = () => {

    const [formDataRegis, setFormDataRegis] = useState({ prefix: '', fullname: '', cid: '', year: '', address: '', tel: '', type: '', size: '', typeyear: '', getshirt: '', sub_address: '', img: '' })
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([])
    const [isButton, setIsButton] = useState(true)
    const [classCss, setclassCss] = useState('form-control')

    const handleCancel = () => setPreviewVisible(false)

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewImage(file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.preview)
    }

    const handleChange = async ({ fileList: newFileList }) => {
        setFileList(newFileList)
        // console.log(newFileList)
        if (
            newFileList[0] != null && formDataRegis.prefix != '' && formDataRegis.fullname != '' && formDataRegis.cid != '' && formDataRegis.year != ''
            && formDataRegis.address != '' && formDataRegis.tel != '' && formDataRegis.type != '' && formDataRegis.size != ''
            && formDataRegis.typeyear != '' && formDataRegis.getshirt != ''
        ) {
            setIsButton(false)
        } else {
            setIsButton(true)
        }

        if (newFileList[0] != null) {
            if (newFileList[0].status == 'done') {
                newFileList.preview = await getBase64(newFileList[0].originFileObj)
            }

            setPreviewImage(newFileList.preview)
            setFormDataRegis({ ...formDataRegis, img: newFileList.preview })
        } else {
            setPreviewImage('')
            setFormDataRegis({ ...formDataRegis, img: '' })
        }
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }} >Upload</div>
        </div>
    )
    const onsubmit = async () => {
        try {
            let res = await axios.post(`${api}/add-register-run`, formDataRegis)
            // console.log(res)
            res.statusText == 'OK' ? toast.success('??????????????????????????????????????????????????????') : toast.error('?????????????????????????????????????????????????????????')
            setFormDataRegis({ prefix: '', fullname: '', cid: '', year: '', address: '', tel: '', type: '', size: '', typeyear: '', getshirt: '', sub_address: '', img: '' })
            setFileList([])
            setIsButton(true)
            setclassCss('form-control')
        } catch (error) {
            // toast.error('???????????????????????????????????????????????????????????????????????????')
            console.log(error)
        }
    }

    //----------------------------------------------------------------------------------------------------- START GET BY CID
    const getCidRegis = async (cid) => {
        setclassCss('form-control')
        if (cid.length > 12) {
            try {
                let res = await axios.get(`${api}/get-register-cid/${cid}`)
                // console.log(res.data)
                if (res.data.length == 1) {
                    setclassCss('form-control is-invalid')
                    toast.error('????????? 13 ???????????????????????????????????????????????????????????????????????????')
                    setIsButton(true)
                } else {
                    setclassCss('form-control is-valid')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    //----------------------------------------------------------------------------------------------------- END GET BY CID


    const styling = {
        paddingTop: '10rem',
        paddingBottom: 'calc(10rem - 4.5rem)',
        background: `linear-gradient(to bottom, rgba(92, 77, 66, 0.8) 0%, rgba(92, 77, 66, 0.8) 100%), url('../assets/img/bg-masthead.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'scroll',
        backgroundRepeat: 'no-repeat',
    }
    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={true}
                draggable={true}
                pauseOnHover={true}
                // transition={Flip}
                theme={'colored'}
            />

            <section className="page-section" style={styling}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center">
                        <div className="col-lg-8 align-self-end">
                            <h1 className="text-white font-weight-bold text-center">???????????????????????????</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-lg-6 mb-3'>
                                        <div className="form-group">
                                            <label htmlFor="prefix" className='text-white'>????????????????????????<span className='text-danger'>*</span></label>
                                            <select className="form-control mt-2" id="prefix" value={formDataRegis.prefix}
                                                onChange={e => {
                                                    setFormDataRegis({ ...formDataRegis, prefix: e.target.value })
                                                    if (
                                                        e.target.value != '' && formDataRegis.fullname != '' && formDataRegis.cid != '' && formDataRegis.year != '' && formDataRegis.address != ''
                                                        && formDataRegis.tel != '' && formDataRegis.type != '' && formDataRegis.size != '' && formDataRegis.typeyear != ''
                                                        && formDataRegis.getshirt != '' && formDataRegis.img != ''
                                                    ) {
                                                        setIsButton(false)
                                                    } else {
                                                        setIsButton(true)
                                                    }
                                                }}
                                            >
                                                <option>???????????????????????????????????????</option>
                                                <option value='?????????'>?????????</option>
                                                <option value='?????????'>?????????</option>
                                                <option value='??????????????????'>??????????????????</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <div className="form-group">
                                            <label htmlFor="fullname" className='text-white'>????????????-????????????<span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control mt-2" id="fullname" placeholder="????????????????????????-????????????" value={formDataRegis.fullname}
                                                onChange={e => {
                                                    setFormDataRegis({ ...formDataRegis, fullname: e.target.value })
                                                    if (
                                                        e.target.value != '' && formDataRegis.prefix != '' && formDataRegis.cid != '' && formDataRegis.year != '' && formDataRegis.address != ''
                                                        && formDataRegis.tel != '' && formDataRegis.type != '' && formDataRegis.size != '' && formDataRegis.typeyear != ''
                                                        && formDataRegis.getshirt != '' && formDataRegis.img != ''
                                                    ) {
                                                        setIsButton(false)
                                                    } else {
                                                        setIsButton(true)
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <div className="form-group">
                                            <label htmlFor="cid" className='text-white mb-2'>??????????????????????????????????????????????????????????????????<span className='text-danger'>*</span></label>
                                            <ReactInputMask type="text" className={classCss} id="cid" placeholder="??????????????????????????????????????????????????????????????????????????????" mask="9-9999-99999-99-9" value={formDataRegis.cid}
                                                onChange={e => {
                                                    let cids = e.target.value.replaceAll('-', '')
                                                    let cid = cids.replaceAll('_', '')
                                                    setFormDataRegis({ ...formDataRegis, cid: cid })
                                                    getCidRegis(cid)
                                                    if (
                                                        cid.length == 13 && formDataRegis.prefix != '' && formDataRegis.fullname != '' && formDataRegis.year != '' && formDataRegis.address != ''
                                                        && formDataRegis.tel != '' && formDataRegis.type != '' && formDataRegis.size != '' && formDataRegis.typeyear != ''
                                                        && formDataRegis.getshirt != '' && formDataRegis.img != ''
                                                    ) {
                                                        setIsButton(false)
                                                    } else {
                                                        setIsButton(true)
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <div className="form-group">
                                            <label htmlFor="year" className='text-white'>?????? ???.???. ????????????<span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control mt-2" id="year" placeholder="?????????????????? ???.???. ???????????? ???????????? 2500" maxLength={4} value={formDataRegis.year}
                                                onChange={e => {
                                                    setFormDataRegis({ ...formDataRegis, year: e.target.value })
                                                    if (
                                                        e.target.value.length == 4 && formDataRegis.prefix != '' && formDataRegis.fullname != '' && formDataRegis.cid != '' && formDataRegis.address != ''
                                                        && formDataRegis.tel != '' && formDataRegis.type != '' && formDataRegis.size != '' && formDataRegis.typeyear != ''
                                                        && formDataRegis.getshirt != '' && formDataRegis.img != ''
                                                    ) {
                                                        setIsButton(false)
                                                    } else {
                                                        setIsButton(true)
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <div className="form-group">
                                            <label htmlFor="address" className='text-white'>?????????????????????<span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control mt-2" id="address" placeholder="?????????????????????????????????" value={formDataRegis.address}
                                                onChange={e => {
                                                    setFormDataRegis({ ...formDataRegis, address: e.target.value, sub_address: e.target.value })
                                                    if (
                                                        e.target.value != '' && formDataRegis.prefix != '' && formDataRegis.fullname != '' && formDataRegis.cid != '' && formDataRegis.year != ''
                                                        && formDataRegis.tel != '' && formDataRegis.type != '' && formDataRegis.size != '' && formDataRegis.typeyear != ''
                                                        && formDataRegis.getshirt != '' && formDataRegis.img != ''
                                                    ) {
                                                        setIsButton(false)
                                                    } else {
                                                        setIsButton(true)
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <div className="form-group">
                                            <label htmlFor="tel" className='text-white'>????????????????????????<span className='text-danger'>*</span></label>
                                            <ReactInputMask type="tel" className="form-control mt-2" id="tel" placeholder="????????????????????????????????????" mask="999-999-9999" value={formDataRegis.tel}
                                                onChange={e => {
                                                    let tels = e.target.value.replaceAll('-', '')
                                                    let tel = tels.replaceAll('_', '')
                                                    // console.log(tel)
                                                    setFormDataRegis({ ...formDataRegis, tel: tel })
                                                    if (
                                                        tel != '' && formDataRegis.prefix != '' && formDataRegis.fullname != '' && formDataRegis.cid != '' && formDataRegis.year != ''
                                                        && formDataRegis.address != '' && formDataRegis.type != '' && formDataRegis.size != '' && formDataRegis.typeyear != ''
                                                        && formDataRegis.getshirt != '' && formDataRegis.img != ''
                                                    ) {
                                                        setIsButton(false)
                                                    } else {
                                                        setIsButton(true)
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <div className="form-group">
                                            <label htmlFor="type" className='text-white'>????????????????????????????????????????????????<span className='text-danger'>*</span></label>
                                            <select className="form-control mt-2" id="type" value={formDataRegis.type}
                                                onChange={e => {
                                                    setFormDataRegis({ ...formDataRegis, type: e.target.value })
                                                    if (
                                                        e.target.value != '' && formDataRegis.prefix != '' && formDataRegis.fullname != '' && formDataRegis.cid != '' && formDataRegis.year != ''
                                                        && formDataRegis.address != '' && formDataRegis.tel != '' && formDataRegis.size != '' && formDataRegis.typeyear != ''
                                                        && formDataRegis.getshirt != '' && formDataRegis.img != ''
                                                    ) {
                                                        setIsButton(false)
                                                    } else {
                                                        setIsButton(true)
                                                    }
                                                }}
                                            >
                                                <option>???????????????????????????????????????????????????????????????</option>
                                                <option value='funrun'>Fun run 5 km</option>
                                                <option value='mini'>Mini 12.5 km</option>
                                                <option value='vipfunrun'>VIP Fun run 5 km</option>
                                                <option value='vipmini'>VIP Mini 12.5 km</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <div className="form-group">
                                            <label htmlFor="size" className='text-white'>Size ???????????????<span className='text-danger'>*</span></label>
                                            <select className="form-control mt-2" id="size" value={formDataRegis.size}
                                                onChange={e => {
                                                    setFormDataRegis({ ...formDataRegis, size: e.target.value })
                                                    if (
                                                        e.target.value != '' && formDataRegis.prefix != '' && formDataRegis.fullname != '' && formDataRegis.cid != '' && formDataRegis.year != ''
                                                        && formDataRegis.address != '' && formDataRegis.tel != '' && formDataRegis.type != '' && formDataRegis.typeyear != ''
                                                        && formDataRegis.getshirt != '' && formDataRegis.img != ''
                                                    ) {
                                                        setIsButton(false)
                                                    } else {
                                                        setIsButton(true)
                                                    }
                                                }}
                                            >
                                                <option>??????????????? Size ???????????????</option>
                                                <option value='s'>S (??????????????? 36)</option>
                                                <option value='m'>M (??????????????? 38)</option>
                                                <option value='l'>L (??????????????? 40)</option>
                                                <option value='xl'>XL (??????????????? 42)</option>
                                                <option value='2xl'>2XL (??????????????? 44)</option>
                                                <option value='3xl'>3XL (??????????????? 46)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <div className="form-group">
                                            <label htmlFor="typeyear" className='text-white'>????????????????????????<span className='text-danger'>*</span></label>
                                            <select className="form-control mt-2" id="typeyear" value={formDataRegis.typeyear}
                                                onChange={e => {
                                                    setFormDataRegis({ ...formDataRegis, typeyear: e.target.value })
                                                    if (
                                                        e.target.value != '' && formDataRegis.prefix != '' && formDataRegis.fullname != '' && formDataRegis.cid != '' && formDataRegis.year != ''
                                                        && formDataRegis.address != '' && formDataRegis.tel != '' && formDataRegis.type != '' && formDataRegis.size != ''
                                                        && formDataRegis.getshirt != '' && formDataRegis.img != ''
                                                    ) {
                                                        setIsButton(false)
                                                    } else {
                                                        setIsButton(true)
                                                    }
                                                }}
                                            >
                                                <option>???????????????????????????????????????</option>
                                                <option value='20-29'>20-29 ??????</option>
                                                <option value='30-39'>30-39 ??????</option>
                                                <option value='40-49'>40-49 ??????</option>
                                                <option value='50-59'>50-59 ??????</option>
                                                <option value='60-up'>60 ????????????????????????</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 mb-3'>
                                        <div className="form-group">
                                            <label htmlFor="getshirt" className='text-white'>????????????????????????????????????<span className='text-danger'>*</span></label>
                                            <select className="form-control mt-2" id="getshirt" value={formDataRegis.getshirt}
                                                onChange={e => {
                                                    setFormDataRegis({ ...formDataRegis, getshirt: e.target.value })
                                                    if (
                                                        e.target.value != '' && formDataRegis.prefix != '' && formDataRegis.fullname != '' && formDataRegis.cid != '' && formDataRegis.year != ''
                                                        && formDataRegis.address != '' && formDataRegis.tel != '' && formDataRegis.type != '' && formDataRegis.size != ''
                                                        && formDataRegis.typeyear != '' && formDataRegis.img != ''
                                                    ) {
                                                        setIsButton(false)
                                                    } else {
                                                        setIsButton(true)
                                                    }
                                                }}
                                            >
                                                <option>???????????????????????????????????????????????????</option>
                                                <option value='selfpickup'>?????????????????? (??????????????????????????????????????????????????????????????????????????????????????????)</option>
                                                <option value='delivery'>?????????????????? (??????????????????????????????????????????????????? ???????????????????????????????????????)</option>
                                            </select>
                                        </div>
                                    </div>
                                    {formDataRegis.getshirt == 'delivery' ?
                                        <div className='col-lg-6 mb-3'>
                                            <div className="form-group">
                                                <label htmlFor="sub_address" className='text-white'>???????????????????????????????????????<span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control mt-2" id="sub_address" placeholder="???????????????????????????????????????????????????" value={formDataRegis.sub_address}
                                                    onChange={e => {
                                                        setFormDataRegis({ ...formDataRegis, sub_address: e.target.value })
                                                        if (
                                                            e.target.value != '' && formDataRegis.prefix != '' && formDataRegis.fullname != '' && formDataRegis.cid != '' && formDataRegis.year != ''
                                                            && formDataRegis.address != '' && formDataRegis.tel != '' && formDataRegis.type != '' && formDataRegis.size != ''
                                                            && formDataRegis.typeyear != '' && formDataRegis.img != '' && formDataRegis.getshirt != ''
                                                        ) {
                                                            setIsButton(false)
                                                        } else {
                                                            setIsButton(true)
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        : ''
                                    }
                                    <div className='col-lg-6 mb-3'>
                                        <div className="form-group">
                                            <label htmlFor="img" className='text-white'>???????????????????????????????????????????????????<span className='text-danger'>*</span></label>
                                            <Upload
                                                listType="picture-card"
                                                fileList={fileList}
                                                onPreview={handlePreview}
                                                onChange={handleChange}
                                                className='mt-2'
                                            >
                                                {fileList.length == 1 ? null : uploadButton}
                                            </Upload>
                                            <strong className='text-white'>[ ????????????????????????????????????????????????????????? : {formDataRegis.type == 'funrun' || formDataRegis.type == 'mini' ? '399' : formDataRegis.type == 'vipfunrun' || formDataRegis.type == 'vipmini' ? '1500' : '0'} ????????? ]</strong>
                                            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                <img alt="nameImage" style={{ width: '100%' }} src={previewImage} />
                                            </Modal>

                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className={isButton == true ? 'form-group not-allowed' : 'form-group'} style={{ textAlign: 'center' }}>
                                        <button type="button" className='btn btn-primary'
                                            onClick={onsubmit}
                                            disabled={isButton}
                                        >
                                            ????????????????????????????????????
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Register