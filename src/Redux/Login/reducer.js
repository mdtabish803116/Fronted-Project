import {LOGIN_SUCCESS , LOGIN_ERROR , LOGIN_LOADING , LOGOUT} from "./action";

export const loginReducer = (store = {loginUser : {}, auth : false, loading : false , error : false} , {type , payload})=>{
          switch(type){
              case LOGIN_SUCCESS:
                 localStorage.setItem("thunkUserAuth" , JSON.stringify({
                      auth : true,
                      loginUser : payload
                 }))
                  return{
                      ...store , loginUser : payload, auth : true,
                      loading : false, 
                       error : false
                  }
               case LOGIN_LOADING:
                   return {
                       ...store , loginUser : {},
                        loading : true, 
                        error : false
                   }

               case LOGIN_ERROR:
                    return {
                        ...store , loginUser : {},
                         loading : false, 
                         error : true
                    }
                case LOGOUT : 
                  localStorage.removeItem("thunkUserAuth")
                  return {
                       ...store , loginUser : {} , auth : false
                  }
                default : 
                    return store
          }
} 