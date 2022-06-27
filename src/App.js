import React from 'react';
import axios from 'axios';

function App() {

  const infoText = 'Это поле не может быть пустым'

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [date, setDate] = React.useState('')
  const [massage, setMassage] = React.useState('')

  const [nameDirty, setNameDirty] = React.useState('')
  const [emailDirty, setEmailDirty] = React.useState('')
  const [numberDirty, setNumberDirty] = React.useState('')
  const [massageDirty, setMassageDirty] = React.useState('')

  const [nameError, setNameError] = React.useState(infoText)
  const [emailError, setEmailError] = React.useState(infoText)
  const [numberError, setNumberError] = React.useState(infoText)
  const [massageError, setMassageError] = React.useState('')

  const [formValid, setFormValid] = React.useState(false)
  const [formStyle, setFormStyle] = React.useState(false)
  const [clickSubmit, setClickSubmit] = React.useState(false)
  const [successSubmit, setSuccessSubmit] = React.useState(null)

  const data = {
    name: name,
    number: number,
    email: email,
    date: date,
    massage: massage,
  }

React.useEffect(() => {
if(emailError || nameError || numberError ) {
setFormValid(false)
}else{
  setFormValid(true)
}
},[emailError, nameError, numberError])

const nameHandler = (e) =>{
  const valudateName = /([а-яА-яa-zA-z]+\s)+([а-яА-яa-zA-z]+)/ig;

  setName(e.target.value)
  // setClickSubmit(false)
  if(!valudateName.test(e.target.value)){
    setNameError('Введите правильно Ваше имя и фамилию')
  }else{
    setNameError('')
  }
}

const massageHandler = (e)=>{
  setMassage(e.target.value)
  // setClickSubmit(false)
  if(e.target.value.length < 10 || e.target.value.length > 300){
    setMassageError('Длинна этого поля должна состявлять от 10 до 300 символов')
  }else{
    setMassageError('')
  }
}

const phoneNumberHendler = (e)=>{
  const validatePhoneNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
  
  setNumber(e.target.value)
  // setClickSubmit(false)
  if(!validatePhoneNumber.test(e.target.value)){
    setNumberError('Введите правильно номер телефона')
  }else{
    setNumberError('')
  }
}
const dateHandler = (e) => {
  setDate(e.target.value)
  data.date = e.target.value
}

const emailHandler = (e)=>{
  const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  setEmail(e.target.value)
  // setClickSubmit(false)
  if(!validateEmail.test(String(e.target.value).toLowerCase())){
    setEmailError('Некорректный введен Email')
  }else{
    setEmailError('')
  }
  return 
}

 const submitData =async e=>{
  e.preventDefault();
  setClickSubmit(true)
  // setFormValid(false)
  try{
  await axios.post(`https://jsonplaceholder.typicode.com/users`, { data })
    .then(res => {
      setSuccessSubmit('success')
      console.log(res);
      console.log(res.data);
      // setFormValid(false)
      clearInput()
    })
  }catch(e){
    setSuccessSubmit('error')
    console.log('sending error'+ e);
    // setFormValid(true)
  } 
}

 const blurHandler =(e)=>{
  // eslint-disable-next-line default-case
  switch(e.target.name){
    case 'email':
      setEmailDirty(true)
      break
      case 'name':
        setNameDirty(true)
        break
        case 'number':
        setNumberDirty(true)
        break
        case 'massage':
          setMassageDirty(true)
          break    
  }
 }

 const responseProcessing = () => {
    if(successSubmit === 'success' ){
    return 'Форма успешно отправленна!'
  }else if(successSubmit === 'error'){
    return 'При отправке произошла ошибка'
  }
 }

 const clearInput= () => {
  setName('')
  setDate('')
  setEmail('')
  setMassage('')
  setNumber('')
}

  return(
    <>
    <form className='form'>
      <label>
      Имя и фамилия
      <div className='form-input__container'>
      <input onChange={e => nameHandler(e)} value={name} 
      onBlur={e=> blurHandler(e)}  className='input-name' name='name' />
      </div>
      </label>
    {(nameDirty && nameError) && <div className='error-form-text'>{nameError}</div>}
    <label>
     Email
    <div className='form-input__container'>
      <input onChange={e => emailHandler(e)} value={email} 
      onBlur={e=> blurHandler(e)} name='email'  className='error-form-text'/>
      </div>
    </label>
    {(emailDirty && emailError) && <div className='error-form-text'>{emailError}</div>}
    <label>
      Номер телефона
    <div className='form-input__container'>
    <input onChange={e => phoneNumberHendler(e)} 
    value={number} onBlur={e=> blurHandler(e)} name='number'/>
    </div>
    </label>
      {(numberError && numberDirty) && <div className='error-form-text'>{numberError}</div>}
    <label>
       Дата рождения
    <div className='form-input__container'>
    <input value={date} onChange={e => dateHandler(e)} type='Date'/>
    </div>
    </label>
      <label>
       Сообщение 
      <div className='form-input__container'>
      <input value={massage} onChange={e => massageHandler(e)} 
      onBlur={e=> blurHandler(e)} name='massage' />
        </div> 
      </label>
      {(massageError && massageDirty) && <div className='error-form-text'>{massageError}</div>}
      <button onClick={submitData} disabled={!formValid} className={formValid
       ?'form-submit__btn' 
       :'error-btn'
    } type='submit'>Submit</button>
      {clickSubmit === true
      ? <div className='form-submit__status'>{responseProcessing()}</div>
      : ''}
    </form>
    </>
  )
}

export default App;
