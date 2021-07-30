import React from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';

function RegisterPage() {
    return (
        <div style={{
            display: 'flex', 
            justifyContent: "center", 
            alignItems: "center", 
            width: "100%", 
            height: "100vh"
        }}>
            
            <Form className="register-form">
                <h1 className="text-center">
                    <span className="font-weight-bold">회원가입</span>
                </h1>
            <FormGroup>
                <Input type="email" placeholder="아이디 또는 이메일"></Input>
            </FormGroup>
            <FormGroup>
                <Input type="text" placeholder="이름"></Input>
            </FormGroup>
            <FormGroup>
                <Input type="password" placeholder="비밀번호"></Input>
            </FormGroup>
            <FormGroup>
                <Input type="password" placeholder="비밀번호 확인"></Input>
            </FormGroup>

                <div className="d-grid gap-2">
                    <Button type="submit" variant="secondary" size="lg" >
                        회원가입
                    </Button>
                    <div className="text-center">
                            Already registered<a href="/login"> Sign in?</a>
                    </div>
                </div>
            </Form>

        </div>
    )
}

export default RegisterPage
