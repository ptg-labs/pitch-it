import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/settings.scss';
import e from 'cors';

export default function Settings() {
  // fetch and set username on componentDidMount equivalent
  const [userName, setUsername] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  useEffect(() => {
    axios.get('http://localhost:3000/user').then(({ data }) => {
      console.log('data from get /user', data);
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
  // TODO: CREATE deleteAccount function
  const deleteAccount = () => {
    console.log('deleting account');
  };
  const updatePassword = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      axios
        .post('http://localhost:3000/user', { password: newPassword })
        .then((res) => {
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
    <section id='settings'>
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
            <button>Submit</button>
          </form>
        </div>
      )}
      {/* PAGE */}
      <div>
        <h1>Settings</h1>
        <button onClick={toggleModal}>Change Password</button>
        <button onClick={toggleConfirmation}>Delete Account</button>
        {confirmationVisible && (
          <div>
            <div>Are you sure?</div>

            <div>
              <button onClick={deleteAccount}>Yes, delete my account</button>
              <button onClick={toggleConfirmation}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
