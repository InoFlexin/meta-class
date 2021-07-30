import React from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';
//import { GoogleLoginButton } from 'react-social-login-buttons';

function LoginPage() {

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