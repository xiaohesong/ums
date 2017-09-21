import React, {Component} from 'react';
import './App.css';
import Menu from './menu/Index';
import Login from './components/Login'

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
                <Menu/>
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
                <Login/>
            </div>
        )
    }
}

export default App;
