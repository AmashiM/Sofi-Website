// import React from "react";
// import ReactDOM from "react-dom";

class Login extends React.Component {
  constructor({ props }){
    super(props);

  }

  render(){
    return (
      <>
        <a href="/login" target="_self" ><button>Login</button></a>
      </>
    );
  }
}



class App extends React.Component {
    constructor({ props }){
        super(props);
        let data = new URLSearchParams(window.location.search);
        if(data.has("code")){
          fetch(`http://${window.location.host}/auth`, {
            headers: {
              code: data.get('code')
            }
          }).then(res => {
            console.log(res);
          }).catch(console.log);
        }

    }

    render(){
        return (
            <>
            <div>
              <ul>
                <li><Login></Login></li>
              </ul>
            </div>
            </>
        );
    }
}


ReactDOM.render(React.createElement(App), document.getElementById("root"));
