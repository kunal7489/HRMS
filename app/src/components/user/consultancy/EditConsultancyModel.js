import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants';


const ModalBox = ({ isOpen, onRequestClose, counsultancyId }) => {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([])
    useEffect(() => {

        if (isOpen) {
            console.log('model open', counsultancyId)
            // Fetch data for the given counsultancyId
            if (counsultancyId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}consultancy/getById?id=${counsultancyId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching consultancy data:', error);
                    }
                };

                fetchData();
            }
        }
    }, [isOpen]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data", data);
        
        try {
            const response = await axios.put(`${BASE_API_URL}consultancy/update`, data);
    
            if (response && response.data && response.data.msg) {
                setMessage(response.data.msg);
            } else {
                setMessage("No message returned from the server");
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while updating the consultancy');
        }
    };
    
    

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            style={{
                overlay: {

                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    width: '90%',
                    height: '90%',
                    margin: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    padding: '20px'
                }
            }}
        >
            <button onClick={onRequestClose}>Close</button>

            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="signup-form">
                        <form onSubmit={handleSubmit} class="mt-5 border p-4 bg-light shadow">
                            <div style={{ textAlign: 'center' }}>
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit consultancy</h4>

                            </div>
                            <div class="row">

                            <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_name" value={data.consultancy_name} onChange={handleInputChange} class="form-control" placeholder="consultancy_name" />
                                                                    {/* {errors.consultancy_name && <span className="error" style={{ color: 'red' }}>{errors.consultancy_name}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_email" value={data.consultancy_email} onChange={handleInputChange} class="form-control" placeholder="consultancy_email" />
                                                                    {/* {errors.consultancy_email && <span className="error" style={{ color: 'red' }}>{errors.consultancy_email}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_website_url" value={data.consultancy_website_url} onChange={handleInputChange} class="form-control" placeholder="consultancy_website_url" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_mobile" value={data.consultancy_mobile} onChange={handleInputChange} class="form-control" placeholder="consultancy_mobile" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_alternate_mobile" value={data.consultancy_alternate_mobile} onChange={handleInputChange} class="form-control" placeholder="consultancy_alternate_mobile" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_city" value={data.consultancy_city} onChange={handleInputChange} class="form-control" placeholder="consultancy_city" />
                                                                </div>
                                                                {/* <div class="mb-3 col-md-6" style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', justifyContent: "space-between" , width: '50%'}}>
                                                                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ticket_created_date</label>
                                                                    <input type="date" name="consultancy_address" value={data.consultancy_ticket_created_date} onChange={handleInputChange} class="form-control" style={{ width: 'auto' }}/>
                                                                </div> */}
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_state" value={data.consultancy_state} onChange={handleInputChange} class="form-control" placeholder="consultancy_state" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_address" value={data.consultancy_address} onChange={handleInputChange} class="form-control" placeholder="consultancy_address" />
                                                                    {/* {errors.consultancy_address && <span className="error" style={{ color: 'red' }}>{errors.consultancy_address}</span>} */}
                                                                </div>
                                                                {/* <div class="mb-3 col-md-6" style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', justifyContent: "space-between" , width: '50%'}}>
                                                                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ticket_solved_date</label>
                                                                    <input type="date" name="consultancy_address" value={data.consultancy_address} onChange={handleInputChange} class="form-control" style={{ width: 'auto' }}/>
                                                                </div> */}
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="contract_agreement" value={data.contract_agreement} onChange={handleInputChange} class="form-control" placeholder="contract_agreement" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="contract_person_name" value={data.contract_person_name} onChange={handleInputChange} class="form-control" placeholder="contract_person_name" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="contract_linkedIn_Profile" value={data.contract_linkedIn_Profile} onChange={handleInputChange} class="form-control" placeholder="contract_linkedIn_Profile" />
                                                                </div>

                            </div>
                            <div class="col-md-12">
                                <button type="submit" >EDit here</button>
                            </div>
                                <span style={{ color: 'green' }}>{message && <p>{message}</p>}</span>
                        </form>


                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalBox;






