import React, {Component} from 'react';
import './App.css';
import asyncComponent from './components/AsyncComponent'

const AsyncLogin = asyncComponent(() => import("./components/Login"))
const AsyncMenu = asyncComponent(() => import("./menu/Index"))

class App extends Component {
    render() {
        let userId = localStorage.getItem("user_id");
        if(userId === "" || userId === undefined || userId === null){
            console.log("user is --", userId)
            if(window.location.pathname.includes("register")){
                return(
                    this.renderToRegister()
                )
            }else{
              return(
                this.renderToLogin()
              )
            }

        }else {
            return (
                <AsyncMenu/>
            )
        }

    }

    renderToRegister() {
        return(
            <div>
                {/*<Register />*/}
            </div>
        )
    }

    renderToLogin() {
        return(
            <div>
                <AsyncLogin />
            </div>
        )
    }
}

export default App;
