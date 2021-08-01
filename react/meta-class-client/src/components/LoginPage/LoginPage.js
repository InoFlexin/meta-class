import React, { useEffect } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';
//import { GoogleLoginButton } from 'react-social-login-buttons';
import axios from 'axios';

function LoginPage() {

    useEffect(() => {
        axios.get('http://locallhost;8080/api/hello')      //endpoint. getRequest를 server 즉 index.js로 보내질 것
        .then(response => console.log(response.data))   //server 에서 돌아온 response를 콘솔창에 출력해봄
    }, [])

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
                <Input type="email" placeholder="아이디 또는 이메일"></Input>
            </FormGroup>
            <FormGroup>
                <Input type="password" placeholder="비밀번호"></Input>
            </FormGroup>
            <div className="d-grid gap-2">
                <Button type="submit" variant="secondary" size="lg" >
                    Log in
                </Button>
                <div className="text-center pt-3">
                    Or continue with your social account
                </div>
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