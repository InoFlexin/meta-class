import React, { useState } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import { Link,useHistory } from 'react-router-dom'

function RegisterPage() {

    const [name, setName] = useState('');
    const [pw, setPw] = useState('');
    const [checkPw, setCheckPw] = useState('');
    const [email, setEmail] = useState('');

    const history = useHistory();
    
    function onChange(e) {

        const type = e.target.name

        switch(type){

            case 'email':     
                setEmail(e.target.value);
                break;

            case 'name':   
                setName(e.target.value);
                break;

            case 'pw':
                setPw(e.target.value);
                break;
                
            case 'checkPw':
                setCheckPw(e.target.value);
                break;

            default:
                return 1;
        }
    }

    function Register(e) {

        e.preventDefault()

        if(pw !== checkPw) {
            return alert("패스워드가 같지 않습니다.")
        }
        else if(pw === '') {
            return alert("패스워드가 없습니다.")
        }

        const params = new URLSearchParams();

        params.append('email', email);
        params.append('username', name);
        params.append('password', pw);

        axios
            .post('/authentication/register', params)
            .then(function (res) {
                localStorage.setItem("X_AUTH_TOKEN", res.data.accessToken);
                history.push("login");
            })
            .catch(function (error) {});
    }

    return (
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>  
            <Form className="login-form">
                <h1 className="text-center">
                    <span className="font-weight-bold">회원가입</span>
                </h1>
                <FormGroup>
                    <Input type="email" placeholder="아이디 또는 이메일" name="email" onChange={ onChange }></Input>
                </FormGroup>  
                <FormGroup>
                    <Input type="text" placeholder="이름" name="name" onChange={ onChange }></Input>
                </FormGroup>   
                <FormGroup>
                    <Input type="password" placeholder="비밀번호" name="pw" onChange={ onChange }></Input>
                </FormGroup>  
                <FormGroup>
                    <Input type="password" placeholder="비밀번호 확인" name="checkPw" onChange={ onChange }></Input>
                </FormGroup>
                <div className="d-grid gap-2">
                    <Button type="submit" variant="secondary" size="lg" block onClick={ Register } >
                        회원가입
                    </Button>
                    <div className = "text-center">
                        Already registered  <Link to="/login" className="signIn"><span>Sign in</span></Link>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default RegisterPage
