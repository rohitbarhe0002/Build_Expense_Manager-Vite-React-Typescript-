import React from 'react';
import { Form } from 'react-bootstrap';
import { UseFormRegister } from 'react-hook-form';

interface FormFieldProps {
  register: UseFormRegister<any>; 
  error?: string | any;
  fields?:any
}

const FormField: React.FC<FormFieldProps> = ({  register, error,fields }) => {
  return (
    <>
    {
        fields.map((itm:string)=>(
            <Form.Group key={itm} className='mb-3' controlId={itm}>
            <Form.Label>{itm}</Form.Label>
            <Form.Control
              type={itm}
              placeholder={`Enter ${itm}`}
              {...register(itm, {
                required: true,
              })}
            />
           {error?.[itm] && <p className='error-msg'>{`${itm}is required`}</p>}
          </Form.Group>
        ))
    }
   
    </>
  );
};

export default FormField;
