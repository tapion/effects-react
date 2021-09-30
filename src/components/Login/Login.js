import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if(action.type === 'CHANGED_EMAIL'){
    return {
      value: action.value,
      isValid: action.value.includes('@'),
    }
  }
  if(action.type === 'USER_BLUR'){
    return {
      value: state.value,
      isValid: state.value.includes('@'),
    }
  }
  return {
    value: '',
    isValid: undefined,
  }
}

const passwordReducer = (state, action) => {
  if(action.type === 'CHANGED_PASSWORD'){
    console.log(action)
    console.log(action.value.trim().length > 6)
    return {
      value: action.value,
      isValid: action.value.trim().length > 6,
    }
  }
  if(action.type === 'USER_BLUR'){
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    }
  }
  return {
    value: '',
    isValid: undefined,
  }
}

const Login = (props) => {
  const [emailState, emailDispatch] = useReducer(emailReducer, {value: '', isValid: undefined})
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {value: '', isValid: undefined})
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const { isValid: emailValid } = emailState;
  const { isValid: passwordValid } = passwordState;
  console.log(passwordState)
  console.log(emailState)
  useEffect(() => {
    console.log('emailValid',emailValid);
    console.log('passwordValid',passwordValid);
    setFormIsValid(
      emailValid && passwordValid
    );
  },[emailValid,passwordValid])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    emailDispatch({
      type: 'CHANGED_EMAIL',
      value: event.target.value,
    });
    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
    
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({
      type: 'CHANGED_PASSWORD',
      value: event.target.value,
    });
    // setEnteredPassword(event.target.value);
    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const validateEmailHandler = () => {
    emailDispatch({
      type: 'USER_BLUR',
    });
    // setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    passwordDispatch({
      type: 'USER_BLUR',
    });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login} miguel={passwordState.value}>
      <form onSubmit={submitHandler}>
        <Input 
          classControl={classes.control}
          classAditional={emailState.isValid}
          htmlForLabel="email"
          label="E-Mail"
          inputType="email"
          id="email"
          value={emailState.value}
          onChangeInput={emailChangeHandler}
          onBlurInput={validateEmailHandler}
       />
        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        <Input 
          classControl={classes.control}
          isValid={passwordState.isValid}
          htmlForLabel="password"
          label="password"
          inputType="password"
          id="password"
          value={passwordState.value}
          onChangeInput={passwordChangeHandler}
          onBlurInput={validatePasswordHandler}
        />
        {/* <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
