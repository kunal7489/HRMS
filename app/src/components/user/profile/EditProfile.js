import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants';


const ModalBox = ({ isOpen, onRequestClose, profileId }) => {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([])
    useEffect(() => {

        if (isOpen) {
            console.log('model open', profileId)
            // Fetch data for the given profileId
            if (profileId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}profiles/getProfileById?id=${profileId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching profiles data:', error);
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
            const response = await axios.put(`${BASE_API_URL}profiles/update`, data);
    
            if (response && response.data && response.data.msg) {
                setMessage(response.data.msg);
            } else {
                setMessage("No message returned from the server");
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while updating the profiles');
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
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit profiles</h4>

                            </div>
                            <div class="row">
                            <div class="mb-3 col-md-6">
                                                                    <input type="text" name="profile" value={data.profile} onChange={handleInputChange} class="form-control" placeholder="profile" />
                                                                    {/* {errors.profile && <span className="error" style={{ color: 'red' }}>{errors.profile}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="profile_id" value={data.profile_id} onChange={handleInputChange} class="form-control" placeholder="profile_id" />
                                                                    {/* {errors.profile_id && <span className="error" style={{ color: 'red' }}>{errors.profile_id}</span>} */}
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






