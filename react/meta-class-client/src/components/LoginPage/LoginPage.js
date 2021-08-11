import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
//import { GoogleLoginButton } from 'react-social-login-buttons';

function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("token"));
  });

  const onChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case "ID":
        return setId(value);
      case "PW":
        return setPw(value);
      default:
        throw new Error("It works on my computerㅋㅋ");
    }
  };

  function Login(e) {
    e.preventDefault();

    const params = new URLSearchParams();

    params.append("email", id);
    params.append("password", pw);

    axios
      .post("/authentication/login", params)
      .then(function (res) {
        console.log(res);
        //로컬호스트에 토큰을 저장 (제거해도 무방하나 제거할시 LandingPage부분 토큰 코드도 제거해줘야됨)
        localStorage.setItem("xAuthToken", res.data.xAuthToken);
      })
      .catch(function (error) {
        console.log(error);
      });

    // axios({
    //   method: 'POST',
    //   url: 'http://localhost:8080/authentication/login',
    //   data: {
    //     "email": id,
    //     "password": pw
    //   }
    // }).then((res)=>{
    //   console.log(res);
    //   console.log(`token : ${res.data.accessToken}`);
    //   localStorage.setItem("token",res.data.accessToken);

    //   console.log(localStorage.getItem("token"));
    // }).catch((res)=>{
    //   console.log(res);
    // })
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh", }}>
      <Form className="login-form">
        <h1 className="text-center">
          <span className="font-weight-bold">로그인</span>
        </h1>
        <FormGroup>
          <Input type="email" placeholder="아이디 또는 이메일" name="ID" value={id} onChange={onChange}></Input>
        </FormGroup>
        <FormGroup>
          <Input type="passwd" placeholder="비밀번호" name="PW" value={pw} onChange={onChange}></Input>
        </FormGroup>
        <div className="d-grid gap-2">
          <Button type="submit" variant="secondary" size="lg" block onClick={Login}>
            Log in
          </Button>
            {/* <div className="text-center pt-3">
                      Or continue with your social account
                  </div> */}
            {/*<GoogleLoginButton className="mt-3 mb-3"></GoogleLoginButton>*/}
          <div className="text-center">
            <Link to="/register">
              <p>Sign up</p>
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default LoginPage;
