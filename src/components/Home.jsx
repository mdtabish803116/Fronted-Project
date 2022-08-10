import {useSelector} from "react-redux";

export const Home = () => {
      const {auth} = useSelector((state) => state.loginUser);
      return(
        <div style = {{
              marginTop : "200px",
              fontSize : "40px",
              textAlign : "center",
              color : "green",

        }}>{auth ? ("After Login"): ("Before Login")}</div>  
      )
}