import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';
//import { GoogleLoginButton } from 'react-social-login-buttons';

function LoginPage() {

    const [id,setId] = useState('');
    const [pw,setPw] = useState('');
  
  
    useEffect(()=>{
      console.log(localStorage.getItem("token"));
    })
  
    const onChange  = (e) => {
      const {name,value} = e.target;
      switch(name){ 
        case "ID":
          return(
            setId(value)
          )  
        case "PW":
          return(
            setPw(value)
          )      
        default:
          throw new Error("It works on my computerㅋㅋ");   
      }
    }
  
    function Login(){
      axios({
        method: 'POST',
        url: 'http://localhost:8080/authentication/login',
        data: {
          "email": id,
          "password": pw
        }
      }).then((res)=>{
        console.log(res);
        console.log(`token : ${res.data.accessToken}`);
        localStorage.setItem("token",res.data.accessToken);
  
        console.log(localStorage.getItem("token"));
      }).catch((res)=>{
        console.log(res);
      })
      
    }

    return (
        <div style={{
            display: 'flex', 
            justifyContent: "center", 
            alignItems: "center", 
            width: "100%", 
            height: "100vh"
        }}>
            
            <Form className="login-form">
                <h1 className="text-center">
                    <span className="font-weight-bold">로그인</span>
                </h1>
            <FormGroup>
                <Input type="email" placeholder="아이디 또는 이메일" name="ID" value={id} onChange={onChange}></Input>
            </FormGroup>
            <FormGroup>
                <Input type="password" placeholder="비밀번호" name="PW" value={pw} onchange={onChange}></Input>
            </FormGroup>
            <div className="d-grid gap-2">
                <Button type="submit" variant="secondary" size="lg" block onClick={Login} >
                    Log in
                </Button>
                {/* <div className="text-center pt-3">
                    Or continue with your social account
                </div> */}
                {/*<GoogleLoginButton className="mt-3 mb-3"></GoogleLoginButton>*/}
                <div className="text-center">
                    <a href="/register">Sign up</a>
                    <span className="p-2">|</span>
                    <a href="/stop">Forgot Password</a>
                </div>
            </div>
            </Form>

        </div>
    )
}

export default LoginPage