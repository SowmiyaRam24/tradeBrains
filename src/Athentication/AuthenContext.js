import React ,{useState}from 'react';

const AuthContext=React.createContext({
  token:'',
  isLoggedIn:false,
  login:(token)=>{},
  logout:()=>{}
});


export const AuthContextProvider=(props)=>{

  const initalToken=localStorage.getItem('token');
  const [logoutTimeout, setLogoutTimeout] = useState(null);
  const[token,setToken]=useState(initalToken)
  const userIsLoggedIn=!!token;
  const loginHandler =(token)=>{
    localStorage.setItem('token',token);
    setToken(token);

    const timeoutId = setTimeout(() => {
      logoutHandler();
      // navigate("/login");
    }, 5 * 60 * 1000);
    setLogoutTimeout(timeoutId);
  
  }
  const logoutHandler=()=>{
    localStorage.removeItem('token'); 
    setToken(null)
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
      setLogoutTimeout(null);
    }

  };
  const contextValue={
    token:token,
    isLoggedIn:userIsLoggedIn,
    login:loginHandler,
    logout:logoutHandler,
  };
  return<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
};
export default AuthContext;