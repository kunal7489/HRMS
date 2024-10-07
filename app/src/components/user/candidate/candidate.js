import React, { useState, useEffect } from 'react';
import './candidate';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
import ModalBox from './EditCandidateModel.js';
import Nav from '../../navbar/Navbaar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import { faEdit, faTrashAlt, faTrash, faSortUp, faSortDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../footer/footer.js';

import { BASE_API_URL } from '../../../lib/constants.jsx';
import { Link } from 'react-router-dom';

     const CandidateModule = () => {
        const [isOpen, setIsOpen] = useState(false);
        const [tableData, settableData] = useState([]);
        const [togle, settogle] = useState([true]);
        const [modalIsOpen, setModalIsOpen] = useState(false);
        const [selectedCandidateId, setSelectedCandidateId] = useState(null);
        const [message, setMessage] = useState('');
        const [currentPage, setCurrentPage] = useState(0);
        const [sortColumn, setSortColumn] = useState(null);
        const [sortDirection, setSortDirection] = useState('ascending');
        const [ids, setId] = useState([]);
        const handlePageChange = ({ selected }) => {
            setCurrentPage(selected); // Update the current page when pagination changes
        };
    
            const itemsPerPage = 5; // Number of items to display per page
            const offset = currentPage * itemsPerPage;
            const pageCount = Math.ceil(tableData.length / itemsPerPage);
        // const currentItems = tableData.slice(offset, offset + itemsPerPage);
    
        // const [data, setData] = useState(formData);
        const openModal = (candidateId) => {
            console.log('candidateId', candidateId)
            setModalIsOpen(true);
            setSelectedCandidateId(candidateId);
    
        };
        const handleSort = (column) => {
            if (column === sortColumn) {
                // If the same column is clicked again, reverse the sorting direction
                setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
            } else {
                // If a new column is clicked, set it as the sorting column and reset the direction
                setSortColumn(column);
                setSortDirection('ascending');
            }
        };
        const sortedData = () => {
            if (sortColumn) {
                const sorted = [...tableData].sort((a, b) => {
                    const valueA = a[sortColumn];
                    const valueB = b[sortColumn];
                    if (typeof valueA === 'string' && typeof valueB === 'string') {
                        // Case-insensitive string comparison
                        return sortDirection === 'ascending' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                    } else {
                        // Numerical or other comparison
                        return sortDirection === 'ascending' ? valueA - valueB : valueB - valueA;
                    }
                });
                return sortDirection === 'ascending' ? sorted : sorted.reverse();
            }
            return tableData; // Return original data if no sorting column is selected
        };
    
    
        const handleCheckboxChange = (e, id) => {
            // If the checkbox is checked, add the ID to the list of selected IDs
            if (e.target.checked) {
                setId(prevIds => [...prevIds, id]);
            } else {
                // If the checkbox is unchecked, remove the ID from the list of selected IDs
                setId(prevIds => prevIds.filter(prevId => prevId !== id));
            }
        };
        const Deletemulti = async () => {
            const data = {
                "ids": ids
            };
            console.log('ids', data);
    
            try {
                const response = await axios.delete(`${BASE_API_URL}candidate/multi-delete`, {
                    data: data // IDs ko data body mein bhejna
                });
                console.log(response.data); // Response ke saath kuch karne ke liye
                settogle(!togle);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        const validateForm = () => {
            let isValid = true;
            const newErrors = {};
            if (!formData.candidate_id.trim()) {
                newErrors.candidate_id = "candidate_id is required";
                isValid = false;
            }
            if (!formData.candidate_first_name.trim()) {
                newErrors.candidate_first_name = "candidate_first_name is required";
                isValid = false;
            }
    
            if (!formData.candidate_last_name.trim()) {
                newErrors.candidate_last_name = "candidate_last_name is required";
                isValid = false;
            }
    
            if (!formData.candidate_mobile.trim()) {
                newErrors.candidate_mobile = "candidate_mobile is required";
                isValid = false;
            }
    
            if (!formData.candidate_email.trim()) {
                newErrors.candidate_email = "candidate_email is required";
                isValid = false;
            }
    
            if (!formData.candidate_linkedIn_profile.trim()) {
                newErrors.candidate_linkedIn_profile = "candidate_linkedIn_profile is required";
                isValid = false;
            }
    
            if (!formData.candidate_experience.trim()) {
                newErrors.candidate_experience = "candidate_experience is required";
                isValid = false;
            }
    
    
            setErrors(newErrors);
            return isValid;
        };
        const closeModal = () => {
            settogle(!togle)
            setModalIsOpen(false);
        };
        const [errors, setErrors] = useState({
            candidate_first_name: "",
            candidate_last_name: "",
            candidate_mobile: "",
            candidate_email: "",
            candidate_linkedIn_profile: "",
            candidate_experience: "",
    
        });
        const [formData, setFormData] = useState({
            candidate_first_name: '',
            candidate_last_name: '',
            candidate_mobile: '',
            candidate_alternate_mobile: '',
            candidate_email: '',
            candidate_linkedIn_profile: '',
            candidate_skills: '',
            candidate_experience: '',
            candidate_state: '',
            candidate_document_proof: '',
            candidate_dob: '',
            candidate_doj: '',
            candidate_skills: '',
            candidate_experience: '',
            candidate_resume: '',
            candidate_id_proof: '',
            source_of_candidate: '',
            candidate_address: '',
            tenth_percentages: '',
            twelfth_percentages: '',
            graduationPercentages: '',
            profile: '',

        });
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${BASE_API_URL}candidate/list`);
    
                    console.log(response.data.data); // Handle the response as needed
                    settableData(response.data.data)
                } catch (error) {
                    console.error('Error:', error);
                }
            };
    
            fetchData();
        }, [togle]);
    
        const openPopup = () => {
            setIsOpen(true);
        };
    
        const closePopup = () => {
            setIsOpen(false);
        };
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
            setErrors({
                ...errors,
                [name]: "",
            });
        };
    
        // Function to handle form submission
        const handleSubmit = async (e) => {
            e.preventDefault();
            // Handle form submission here, for example, send data to backend or perform validation
            console.log('', formData);
            if (validateForm()) {
                try {
                    const response = await axios.post(`${BASE_API_URL}candidate/create`, formData);
                    settogle(!togle)
                    console.log(response.data); // Handle the response as needed
                    setMessage(response.data.msg);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
        const DeleteData = (id) => {
            const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    
            // Check if the user confirmed
            if (isConfirmed) {
                // Delete logic here
                try {
                    console.log('id', id)
                    const response = axios.delete(`${BASE_API_URL}candidate/delete?_id=${id}`)
    
                    console.log(response.data); // Handle the response as needed
                    settogle(!togle)
    
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                // User canceled the action
                console.log('Deletion canceled');
            } console.log('', id)
    
        }
    
    
        
  return (
    <>
    <div >
         <Nav />
        <div style={{ backgroundColor: '#28769a' }}>
            <h1 className='headerData'>WELCOME TO CANDIDATE PAGE</h1>
        </div>
        <div >
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body text-center">

                            <div>
                                <button className="backButton" onClick={openPopup}>
                                    Add &nbsp;<FontAwesomeIcon icon={faPlusCircle} />
                                </button>
                            </div>
                            <div> <span> <button className="multiDeleteButton" onClick={() => { Deletemulti() }}    >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button></span></div>
                            {isOpen && (
                                <div>
                                    <div>
                                        <div>
                                            <div class="row">
                                                <div class="col-md-6 offset-md-3">
                                                    <div class="signup-form">


                                                        <form onSubmit={handleSubmit} class="mt-5 border p-4 bg-light shadow">
                                                            <div style={{ textAlign: 'center' }}>
                                                                <h4 style={{ display: 'inline'}} className="mb-5 text-secondary">Add new Candidate</h4>
                                                                <button style={{ float: 'right', fontSize: '20px', backgroundColor: '#ddc7c7', border: 'none' }} className="close" onClick={closePopup}>&times;</button>
                                                            </div>
                                                            <div class="row" style={{margin: '30px'}}>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_id" value={formData.candidate_id} onChange={handleInputChange} class="form-control" placeholder="candidate Code" />
                                                                    {errors.candidate_id && <span className="error" style={{ color: 'red' }}>{errors.candidate_id}</span>}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_first_name" value={formData.candidate_first_name} onChange={handleInputChange} class="form-control" placeholder="First Name" />
                                                                    {errors.candidate_first_name && <span className="error" style={{ color: 'red' }}>{errors.candidate_first_name}</span>}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_last_name" value={formData.candidate_last_name} onChange={handleInputChange} class="form-control" placeholder="Last Name" />
                                                                    {errors.candidate_last_name && <span className="error" style={{ color: 'red' }}>{errors.candidate_last_name}</span>}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_mobile" value={formData.candidate_mobile} onChange={handleInputChange} class="form-control" placeholder="Mobile Number" />
                                                                    {errors.candidate_mobile && <span className="error" style={{ color: 'red' }}>{errors.candidate_mobile}</span>}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_alternate_mobile" value={formData.candidate_alternate_mobile} onChange={handleInputChange} class="form-control" placeholder="Alternate Mobile Number" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="email" name="candidate_email" value={formData.candidate_email} onChange={handleInputChange} class="form-control" placeholder="Email" />
                                                                    {errors.candidate_email && <span className="error" style={{ color: 'red' }}>{errors.candidate_email}</span>}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_skype" value={formData.candidate_skype} onChange={handleInputChange} class="form-control" placeholder="Skype Profile" />
                                                                    {errors.candidate_skype && <span className="error" style={{ color: 'red' }}>{errors.candidate_skype}</span>}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_linkedIn_profile" value={formData.candidate_linkedIn_profile} onChange={handleInputChange} class="form-control" placeholder="LinkedIn Profile" />
                                                                    {errors.candidate_linkedIn_profile && <span className="error" style={{ color: 'red' }}>{errors.candidate_linkedIn_profile}</span>}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_skills" value={formData.candidate_skills} onChange={handleInputChange} class="form-control" placeholder="Skills" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_experience" value={formData.candidate_experience} onChange={handleInputChange} class="form-control" placeholder="Experience" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_expected_salary" value={formData.candidate_expected_salary} onChange={handleInputChange} class="form-control" placeholder="Expected Salary" />
                                                                </div>
                                                                {/* <div class="mb-3 col-md-6" style={{ textAlign: 'left' }}>
                                                                    <label>DOB</label>
                                                                    <input type="date" name="candidate_dob" value={formData.candidate_dob} onChange={handleInputChange} class="form-control" />
                                                                </div> */}
                                                                <div class="mb-3 col-md-6" style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', justifyContent: "space-between" , width: '50%'}}>
                                                                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Date Of Joining</label>
                                                                    <input type="date" name="candidate_doj" value={formData.candidate_doj} onChange={handleInputChange} class="form-control" style={{ width: 'auto' }}/>
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_marrital_status" value={formData.candidate_marrital_status} onChange={handleInputChange} class="form-control" placeholder="Marrital Status" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="interview_rounds" value={formData.interview_rounds} onChange={handleInputChange} class="form-control" placeholder="Interview Rounds" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_selection_Status" value={formData.candidate_selection_Status} onChange={handleInputChange} class="form-control" placeholder="Selection Status" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_feedback" value={formData.candidate_feedback} onChange={handleInputChange} class="form-control" placeholder="Feedback" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="source_of_candidate" value={formData.source_of_candidate} onChange={handleInputChange} class="form-control" placeholder= " Source" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_address" value={formData.candidate_address} onChange={handleInputChange} class="form-control" placeholder="Address" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="candidate_document_proof" value={formData.candidate_document_proof} onChange={handleInputChange} class="form-control" placeholder="Document Proof" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="tenth_percentages" value={formData.tenth_percentages} onChange={handleInputChange} class="form-control" placeholder="10th %" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="twelfth_percentages" value={formData.twelfth_percentages} onChange={handleInputChange} class="form-control" placeholder="12th %" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="graduationPercentages" value={formData.graduationPercentages} onChange={handleInputChange} class="form-control" placeholder="Graduation %" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="profile" value={formData.profile} onChange={handleInputChange} class="form-control" placeholder="Profile" />
                                                                </div>
                                                                <span style={{ color: 'green' }}>{message && <p>{message}</p>}</span>

                                                            </div>
                                                            <div class="col-md-12">
                                                                <button type="submit">Add Candidate</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>      
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>

                                        <th scope="col" onClick={() => handleSort('id')}>ID {sortColumn === 'id' && (
                                            <FontAwesomeIcon icon={sortDirection === 'ascending' ? faSortUp : faSortDown} />
                                        )}</th>
                                        <th scope="col" onClick={() => handleSort('name')}>Name {sortColumn === 'name' && (
                                            <FontAwesomeIcon icon={sortDirection === 'ascending' ? faSortUp : faSortDown} />
                                        )}</th>
                                        <th scope="col" onClick={() => handleSort('email')}>Email {sortColumn === 'email' && (
                                            <FontAwesomeIcon icon={sortDirection === 'ascending' ? faSortUp : faSortDown} />
                                        )}</th>
                                        <th scope="col" onClick={() => handleSort('mobile')}> moblil {sortColumn === 'mobile' && (
                                            <FontAwesomeIcon icon={sortDirection === 'ascending' ? faSortUp : faSortDown} />
                                        )}</th>
                                        <th scope="col" >#ACTIONS</th>
                                        <th>
                                            <label className="customcheckbox m-b-20">
                                                <input type="checkbox" id="mainCheckbox" />
                                            </label>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="customtable">
                                    {sortedData().slice(offset, offset + itemsPerPage).map((data, index) => (
                                        <tr key={index}>

                                            <td>{data._id}</td>
                                            <td>{data.candidate_first_name}&nbsp;{data.candidate_last_name}</td>
                                            <td>{data.candidate_email}</td>
                                            <td>{data.candidate_mobile}</td>
                                            <td>
                                                <button className="editButton" onClick={() => DeleteData(data._id)} >  <FontAwesomeIcon icon={faTrash} /></button>
                                                <button className="editButton" onClick={() => openModal(data._id)} >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            </td>
                                            <td>
                                                <label className="customcheckbox">
                                                    <input type="checkbox" className="listCheckbox" onChange={(e) => handleCheckboxChange(e, data._id)} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </td>
                                            <ModalBox isOpen={modalIsOpen} candidateId={selectedCandidateId} onRequestClose={closeModal}>
                                                <h2>Modal Title</h2>
                                                <p>Modal Content</p>
                                            </ModalBox>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />

                    </div>
                </div>
            </div>

        </div>

        <div>

        </div>


    </div>
    <Footer/>
       </>
  )
}

export default CandidateModule