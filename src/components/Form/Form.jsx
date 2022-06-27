import React from 'react';
import { useForm } from 'react-hook-form';
function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur"
  });
  const onSubmit = (data) => {
    console.log(JSON.stringify(data))
    reset()
  }

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <label>
            Ваше имя и фамилия
       <div className='form-input__container'>
       <input/>
       </div>
        </label>
        <label>
            Ваш Email
            <div className='form-input__container'>
            <input {...register('Email',{required: "Напишите Ваш Email"})}/>
            </div>
        </label>
        <label>
        Ваше сообщение 
        <div className='form-input__container'>
            <input {...register('Massage',{
                minLength: {
                    value: 10, 
                    massage: 'Сообщение слишком короткое'},
                 maxLength: {
                    value: 300,
                    massage: 'Сообщение слишком длинное'
                 }
            })}/> 
            </div>  
        </label>
        <div>{errors?.Massage && <p>{errors?.massage || 'Сообщение слишком короткое'}</p>}</div>
      {/* <input {...register('firstName')} />
      <input {...register('lastName', { required: true })} />
      {errors.lastName && <p>Last name is required.</p>}
      <input {...register('age', { pattern: /\d+/ })} />
      {errors.age && <p>Please enter number for age.</p>} */}
      <input  className='form-submit__btn' type="submit" placeholder='Отправить' />
    </form>
  );
}
export default  Form;