export const LOGIN_SUCCESS = "loginSuccess";
export const LOGIN_LOADING = "loginLoading";
export const LOGIN_ERROR = "loginError";
export const LOGOUT = "logout";

export const loginUserSuccess = (payload) => ({
      type : LOGIN_SUCCESS,
      payload
})

export const loginUserLoading = () => ({
      type : LOGIN_LOADING,
})

export const loginUserError = () => ({
    type : LOGIN_ERROR,
})

export const logOut = () => ({
    type : LOGOUT
})

export const getLogin = (payload) => 
async(dispatch) => {
     
      try {  
             dispatch(loginUserLoading())
       let res  =   await fetch("https://backend-pro-app.herokuapp.com/login",{
              method : "POST",
              body : JSON.stringify(payload),
              headers : {
                 "Content-Type": "application/json"
              }
       })
          let data = await res.json();
         dispatch(loginUserSuccess(data));
           console.log(data)
     }catch(error){  
          dispatch(loginUserError())
     }
}