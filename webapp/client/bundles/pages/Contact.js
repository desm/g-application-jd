import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/');
  });

  return <h1>Contact Me</h1>;
};

export default Contact;
