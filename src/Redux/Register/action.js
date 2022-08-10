export const REGISTER_SUCCESS = "registerSuccess";
export const REGISTER_LOADING = "registerLoading";
export const REGISTER_ERROR = "registerError";

export const registerUserSuccess = (payload) => ({
     type : REGISTER_SUCCESS,
     payload
})

export const registerUserLoading = () => ({
    type : REGISTER_LOADING,
})

export const registerUserError = () => ({
    type : REGISTER_ERROR,
})

export const getRegister = (payload) => 
async(dispatch) => {
      try {  
             dispatch(registerUserLoading())
       let res  =   await fetch("https://backend-pro-app.herokuapp.com/register",{
              method : "POST",
              body : JSON.stringify({
                  user : payload
              }),
              headers : {
                 "Content-Type": "application/json"
              },
               mode: 'no-cors'
       })
          let data = await res.json();
         dispatch(registerUserSuccess(data));
           console.log(data)
     }catch(error){  
          dispatch(registerUserError())
     }
}