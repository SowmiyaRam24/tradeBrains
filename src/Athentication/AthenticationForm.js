import { useState, useRef,useContext } from 'react';
import classes from './AuthenticationFrom.module.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthenContext';
// import Navbar1 from '../Navbar/Navbar';


const AuthForm = () => {
  const emailRef=useRef();
  const passwordRef=useRef();
  const authCtx=useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading]=useState(false);
  const navigate=useNavigate();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const  submitHandler =(e)=>{
    e.preventDefault();
   let enteredEmail= emailRef.current.value;
   let enteredPassword=passwordRef.current.value;
   setIsLoading(true)
   let url;
   if(isLogin){
      url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgO-MaSN7ij62GTpB3L7PZ78q6_wHPd8A'
   }else{
     url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgO-MaSN7ij62GTpB3L7PZ78q6_wHPd8A'
   }
    fetch(url, {
        method:'POST',
        body:JSON.stringify({
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
        }),
        headers:{
            'Content-Type':'application/json'
        },
    }).then((res)=>{
      setIsLoading(false)
        if(res.ok){
          return res.json();
         
        }else{
           return res.json().then(data=>{
                let errorMessage='Authentication failed!';
                if(data&&data.error&&data.error.message){
                    errorMessage=data.error.message;
                }
              
                throw new Error(errorMessage);
            });
        }
        
    }).then(data=>{
      authCtx.login(data.idToken);
      navigate("/home");
      emailRef.current.value=" ";
      passwordRef.current.value=" ";
    })
    .catch(err =>{
      alert(err.message);
    })
  }

  return (
    <>
    {/* <Navbar1/> */}
    <h1 style={{color:'blue',fontFamily:'t',textAlign:'center',marginTop:'59px'}}>TRADE  BRAINS</h1>
    <div style={{paddingTop:'60px'}}>
      <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email'ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordRef}
            required
          />
        </div>
        
        <div className={classes.actions}>
          <div>

          {!isLoading && <button type='submit'>{isLogin?'login':'create Account'}</button>}
          {isLoading&&<p style={{color:'white'}}>Loading...</p>}
          </div>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
    </div>
    </>
    
  );
};

export default AuthForm;