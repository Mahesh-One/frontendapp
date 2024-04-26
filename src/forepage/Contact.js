import React, { useState, useRef } from 'react';
import './contact.css'; 
import emailjs from 'emailjs-com'; // Import emailjs library
import config from '../config';

const ContactForm = () => {
  const form = useRef(); // Define form using useRef()

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_wgwlm0i', 'template_fkhpy8i', form.current, {
        publicKey: '2IzaWXHT1b9ARS_m6',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className='contactbimg' style={{height:'572pt', marginTop:'-60pt'}}>

    
    <div className="form-container">
      <form ref={form} className="form" onSubmit={handleSubmit}>
        <h2 className="heading">Contact Us</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="input"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="textarea"
        />
        <div className="button-container">
          <button type="submit" className="send-button">Send</button>
          <div className="reset-button-container">
            <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ContactForm;
