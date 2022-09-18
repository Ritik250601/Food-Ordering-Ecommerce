import React,{useState} from 'react';

const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token) => {},
    logout:() => {}
})

const retrieveStoredToken = () => {
 const storedToken = localStorage.getItem('token');

 return {
     token: storedToken
 };


}


export const AuthContextProvider = (props) => {
const tokenData = retrieveStoredToken();
let initialToken = false ;
if(tokenData){
    initialToken = tokenData.token;
}


    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        if(token){
        localStorage.setItem('token', token);
        }
    };

    const logoutHandler = () => {
        setToken(null);
    };



 const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };


  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;