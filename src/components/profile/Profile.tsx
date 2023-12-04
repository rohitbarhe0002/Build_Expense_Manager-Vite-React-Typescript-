import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../redux/api/profile/api';
import FormField from '../../shared/Field'; // Import the FormField component
import { IProfile } from '../../types';
import { ERROR_MSG, PROFILE_FIELDS, SUCCESS_MSG } from '../../utils/constants';
const Profile = () => {
  const [successMsg, setSuccessMsg] = useState<string>('');
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfile>();

  const { isError, isLoading, data: profileInfo } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const errorMsg = isError ? ERROR_MSG : '';

  useEffect(() => {
    reset({
      first_name: profileInfo?.first_name || '',
      last_name: profileInfo?.last_name || '',
      email: profileInfo?.email || '',
    });
  }, [profileInfo]);

  const onSubmit = async (data: IProfile) => {
    try {
      updateProfile(data);
      setSuccessMsg(SUCCESS_MSG);
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
     <FormField
          fields={PROFILE_FIELDS}
          register={register}
          error={errors}
        />
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
