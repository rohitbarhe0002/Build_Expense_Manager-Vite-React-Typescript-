import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../redux/api/profile/api';
import { IProfile } from '../../types';

const Profile = () => {
  const [successMsg, setSuccessMsg] = useState<string>('');
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<IProfile>();

  const { isError, isLoading, data: profileInfo } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const errorMsg = isError ? 'Error while getting profile information. Try again later.' : ''
  
  useEffect(() => {
    reset({
      first_name: profileInfo?.first_name || '',
      last_name: profileInfo?.last_name || '',
      email: profileInfo?.email || ''
    });
  }, [profileInfo]);

  const onSubmit = async (data: IProfile) => {
    try {
      updateProfile(data)
      setSuccessMsg('Profile is updated successfully.');
      setTimeout(() => {
        setSuccessMsg('');
      }, 2000);
    } catch (error) {
      setSuccessMsg('');
    }
  };

  return (
    <div className='main-content'>
      <h2 className='my-3 text-center'>Profile</h2>
      {isLoading && <p className='loading'>Loading...</p>}
      {errorMsg && <p className='error-msg'>{errorMsg}</p>}
      {successMsg && <p className='success-msg'>{successMsg}</p>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='mb-3' controlId='first_name'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your first name'
            {...register('first_name', {
              required: true
            })}
          />
          {errors.first_name && (
            <p className='error-msg'>Please enter your first name</p>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='last_name'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your last name'
            {...register('last_name', {
              required: true
            })}
          />
          {errors.last_name && (
            <p className='error-msg'>Please enter your last name</p>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            {...register('email', {
              required: true
            })}
          />
          {errors.email && <p className='error-msg'>Please enter your email</p>}
        </Form.Group>
        <Form.Group>
          <Button type='submit' variant='success'>
            Update Profile
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Profile;
