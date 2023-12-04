import axios from 'axios';
import { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { userType } from '../../types';
import { BASE_API_URL } from '../../utils/constants';
import './Register.css';


interface RegisterProps {
  setIsLoggedIn: (data: boolean) => void;
}

const Register: FC<RegisterProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [succesMsg, setSuccesMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<userType>();

  const onSubmit = async (data: userType) => {
    try {
      setErrorMsg('');
      setSuccesMsg('');
      const { cpassword, ...rest } = data;
      const { data: registeredUser } = await axios.post(
        `${BASE_API_URL}/users`,
        rest
      );
      setSuccesMsg('Registration is successful.');
      reset({
        email: '',
        password: '',
        cpassword: ''
      });
      setTimeout(() => {
        setSuccesMsg('');
        setIsLoggedIn(true);
        navigate('/');
      }, 3000);
    } catch (error) {
      console.log(error);
      setErrorMsg('Error while registering user. Try again later.');
    }
  };

  return (
    <div className='main-content'>
      <h2 className='mt-3 text-center'>Register</h2>
      <div className='register-section'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {succesMsg && <p className='success-msg'>{succesMsg}</p>}
          {errorMsg && <p className='error-msg'>{errorMsg}</p>}
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Email is not valid'
                }
              })}
              placeholder='Enter your email'
            />
            {errors.email && (
              <p className='error-msg'>{errors?.email.message}</p>
            )}
          </Form.Group>
          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password should be at-least 6 characters'
                }
              })}
              placeholder='Enter your password'
            />
            {errors.password && (
              <p className='error-msg'>{errors.password.message}</p>
            )}
          </Form.Group>
          <Form.Group className='mb-3' controlId='cpassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter confirm password'
              {...register('cpassword', {
                required: 'Confirm password is required',
                validate: {
                  match: (value) => {
                    if (value !== watch('password')) {
                      return 'Password and confirm password do not match';
                    }
                  }
                }
              })}
            />
            {errors.cpassword && (
              <p className='error-msg'>{errors.cpassword.message}</p>
            )}
          </Form.Group>
          <Form.Group>
            <Button type='submit'>Register</Button>
            <div className='mt-3 register-btn'>
              Already have an account? <Link to='/login'>login here</Link>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;
