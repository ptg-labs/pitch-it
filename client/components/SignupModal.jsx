import React, { useState } from 'react';
import SignUp from './SignUp/SignUp.jsx';
import Modal from 'react-modal';

const SignupModal = () => {
  // modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // modal change state function
  const setModalIsOpentToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={setModalIsOpentToTrue}>Sign up</button>

      <Modal isOpen={modalIsOpen}>
        <button onClick={setModalIsOpenToFalse}>x</button>
        <SignUp />
      </Modal>
    </div>
  );
};

export default SignupModal;
