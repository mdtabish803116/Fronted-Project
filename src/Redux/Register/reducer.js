import {REGISTER_SUCCESS , REGISTER_LOADING , REGISTER_ERROR} from "./action";

export const registerReducer = (store = {user : {} , loading : false , error : false} , {type , payload}) => {
       switch(type){
           case REGISTER_SUCCESS:
              return {
                    ...store , user : payload,
                     loading : false,
                     error : false
              }
           case REGISTER_LOADING:
               return {
                   ...store , user : {},
                     loading : true,
                     error : false
               }
           case REGISTER_ERROR:
                return {
                    ...store , user :{},
                      loading : false,
                      error : true
                }
            default:
                return store
       }
}