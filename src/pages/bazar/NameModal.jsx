import React, { useState } from 'react';
import Modal from 'react-modal';
const NameModal = ({ isOpen, onSubmit }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ first_name, last_name, password });
    };
  
    return (
      <Modal
        isOpen={isOpen}
        contentLabel="Name Input Modal"
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            direction: 'rtl',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>لطفاً نام، نام خانوادگی و رمز عبور خود را وارد کنید</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>نام:</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>نام خانوادگی:</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>رمز عبور:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">تکمیل اطلاعات</button>
        </form>
      </Modal>
    );
  };
  

export default NameModal;
