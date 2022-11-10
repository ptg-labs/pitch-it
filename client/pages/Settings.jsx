import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/settings.scss';
import e from 'cors';

export default function Settings() {
  
  const [userName, setUsername] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();
  // fetch and set username on componentDidMount equivalent
  useEffect(() => {
    axios.get('http://localhost:3000/user/settings', {headers: {'Authorization': `Bearer ${document.cookie}`}})
    .then((data) => {
      setUsername(data.username);
    });
  }, []);

  const toggleModal = () => {
    setModalIsOpen((prevState) => !prevState);
    setPasswordsMatch(true);
  };
  const toggleConfirmation = () => {
    console.log('toggling confirmation');
    setConfirmationVisible((prevState) => !prevState);
  };
  const deleteAccount = () => {
    console.log('deleting account');
    axios.delete('http://localhost:3000/user/settings', {headers: {'Authorization': `Bearer ${document.cookie}`}}).then(() => {
      console.log('acct deleted');
      navigate('/signup');
    });
  };
  const updatePassword = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      axios
        .post('http://localhost:3000/user/settings', { username: userName, password: newPassword }, {headers: {'Authorization': `Bearer ${document.cookie}`}})
        .then((res) => {
          console.log(res)
          window.alert('Password updated successfully');
        })
        .catch((err) => console.log(err));
      toggleModal();
    }
  };
  const handleChange = (e, key) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };
  return (
    <section id='settings-div'>
    <h1 className='settings-header'>Settings</h1>
      {/* MODAL */}
      {modalIsOpen && (
        <div className='modal'>
          <form onSubmit={updatePassword}>
            <label htmlFor='new-password'>Enter a new password</label>
            <input
              id='new-password'
              type='password'
              onChange={(e) => handleChange(e, 'newPassword')}
              value={formData.newPassword}
              minLength='8'
              required
            />
            <label htmlFor='confirm-password'>Re-enter your password</label>
            <input
              id='confirm-password'
              type='password'
              onChange={(e) => handleChange(e, 'confirmPassword')}
              value={formData.confirmPassword}
              minLength='8'
              required
            />
            {passwordsMatch || <div>Passwords do not match</div>}
            <button class='modal-button'>Submit</button>
          </form>
        </div>
      )}
      {/* PAGE */}
      <div className = 'modal2'>
        {/* <h1>Settings</h1> */}
        <button class='modal-button' onClick={toggleModal}>Change Password</button>
        <button class='modal-button' onClick={toggleConfirmation}>Delete Account</button>
        {confirmationVisible && (
          <div>
            <div>Are you sure?</div>

            <div>
              <button class='modal-button' onClick={deleteAccount}>Yes, delete my account</button>
              <button class='modal-button' onClick={toggleConfirmation}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
