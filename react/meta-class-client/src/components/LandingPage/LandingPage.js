import React, { useCallback, useEffect, useState } from "react";
import {Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import axios from "axios";

function LandingPage() {
  const [show, setShow] = useState(false);

  const handleDelete = useCallback((teacher, className) => {
    if (window.confirm("삭제하시겠습니까?")) {
      //headers에 토큰을 삽입함 (제거해도 무방)
      axios.delete(`/lesson/class?teacher=${teacher}&className=${className}`, {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("X-AUTH-TOKEN"),
        },
      });
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [classes, setClasses] = useState([
    {
      lessonName: "CLASS_1",
      teacher: "kkk",
      className: "Css 강의",
      fileName:
        "https://dimg.donga.com/wps/SPORTS/IMAGE/2021/08/05/108380761.1.jpg", //더미테이터 슬기
    },
    {
      lessonName: "CLASS_1",
      teacher: "kkk",
      className: "Css 강의",
      fileName:
        "https://dimg.donga.com/wps/SPORTS/IMAGE/2021/08/05/108380761.1.jpg",
    },
    {
      lessonName: "CLASS_1",
      teacher: "kkk",
      className: "Css 강의",
      fileName:
        "https://dimg.donga.com/wps/SPORTS/IMAGE/2021/08/05/108380761.1.jpg",
    },
    {
      lessonName: "CLASS_1",
      teacher: "kkk",
      className: "Css 강의",
      fileName:
        "https://dimg.donga.com/wps/SPORTS/IMAGE/2021/08/05/108380761.1.jpg",
    },
  ]);

  const [lessonName, setLessonName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [className, setClassName] = useState("");
  const [imageFile, setImageFile] = useState(""); //사진업로드 - file 에 클래스 이미지 파일 저장됨
  const [preview, setPreview] = useState("");

  console.log(
    `lessonName : ${lessonName}  teacher : ${teacher} className : ${className} imageFile : ${imageFile}`
  );

  function onChange(e) {
    const type = e.target.name;

    switch (type) {
      case "lessonName":
        setLessonName(e.target.value);
        break;

      case "teacher":
        setTeacher(e.target.value);
        break;

      case "className":
        setClassName(e.target.value);
        break;

      default:
        return 1;
    }
  }

  const handlePreview = e => {
    let reader = new FileReader();
    if (e.target.files && e.target.files.length) {
      let file = e.target.files[0];
      reader.onloadend = () => {
        setImageFile(file);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  //post
  const handlePost = async () => {
    const form = new FormData();
    form.append("lessonName", lessonName);
    form.append("teacher", teacher);
    form.append("className", className);
    form.append("file", imageFile);

    console.log(form);

    await axios
      //headers 에 토큰을 삽입함 (제거해도 무방)
      .post("/lesson/class", form, {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("X-AUTH-TOKEN"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (res) {
        //post 완료시 모달꺼짐
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(classes);

  const mapClassas = classes.map(
    ({ className, lessonName, teacher, fileName }) => {
      return (
        <>
          <Card class="card-text center embed-responsive embed-responsive-4by3">
            <Link to={`/class/${className}`} className="card">
              <Card.Img variant="top" src={fileName} type="file" name="imageFile" class="embed-responsive-item" />
              <Card.Body>
                <Card.Title className="card-title" type="text" name="className">
                  {className}
                </Card.Title>
                <Card.Text
                  className="card-text"
                  type="text"
                  name="className"
                  onChange={onChange}
                >
                  {lessonName} - {teacher}
                </Card.Text>
              </Card.Body>
            </Link>
            <Button
              className="delete"
              variant="secondary"
              onClick={() => handleDelete(teacher, className)}
            >
              삭제
            </Button>
          </Card>
        </>
      );
    }
  );

  useEffect(() => {
    // 렌더링 시 response.data를 classes state에 저장 - headers에 토큰을 삽입함 (제거해도 무방)
    console.log(localStorage.getItem("X-AUTH-TOKEN"));
    axios
      .get("/lesson/class/find/all", {
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("X-AUTH-TOKEN"),
        },
      })
      .then(response => {
        console.log(response);
        setClasses(response.data.lessons);
      });
  }, []);

  return (
    <div>
      <div className="navigation-bar">
        <NavBar />
      </div>
      <Container fluid>
        <Row>
          <Col className="header-info">
            <h1>
              <p>비대면 수업을 메타버스를 통한 마인크래프트로~!</p>
            </h1>
            <p>
              지루한 비대면 수업을 각광받고 있는 메타버스 기술을 활용하여
              활기차고 적극적인 학습을 주도하여 수업의 효율을 높여줍니다.
            </p>
          </Col>
        </Row>
        <Row>
          <Col />
          <Col />
          <Col>
            <Button className="create" variant="secondary" onClick={handleShow}>
              CLASS 생성
            </Button>
          </Col>
        </Row>
      </Container>

      <Row sm={3} style={{ margin: "10px 67px" }}>
        {mapClassas}
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Class 생성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>수업이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="수업이름을 입력해주세요"
              value={lessonName}
              name="lessonName"
              onChange={onChange}
            />

            <Form.Label>선생님</Form.Label>
            <Form.Control
              type="text"
              placeholder="선생님 성함을 입력해주세요"
              value={teacher}
              name="teacher"
              onChange={onChange}
            />

            <Form.Label>강좌명</Form.Label>
            <Form.Control
              type="text"
              placeholder="강좌명을 입력해주세요"
              value={className}
              name="className"
              onChange={onChange}
            />

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>강좌 이미지</Form.Label>
              <br></br>
              <Form.Control
                type="file"
                accept="image/*"
                name="imageFile"
                // 변경되면 함수 실행
                onChange={e => {
                  handlePreview(e);
                }}
              />
            </Form.Group>
          </Form>
          <img src={preview} className="img-fluid" alt="" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="secondary" onClick={handlePost}>
            생성
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
}

export default LandingPage;