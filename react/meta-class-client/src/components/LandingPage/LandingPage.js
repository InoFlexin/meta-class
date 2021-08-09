import React, { useCallback, useEffect, useState } from "react";
import { Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import axios from "axios";

function LandingPage() {

  const [show, setShow] = useState(false);

  const handleDelete = useCallback((teacher, className) => {
    if (window.confirm("삭제하시겠습니까?")) {

      axios.delete(`/lesson/class?teacher=${teacher}&className=${className}`);
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [classes, setClasses] = useState([
    {
      lessonName: "CLASS_1",
      teacher: "kkk",
      className: "Css 강의",
    },
    {
      lessonName: "CLASS_1",
      teacher: "kkk",
      className: "Css 강의",
    },
    {
      lessonName: "CLASS_1",
      teacher: "kkk",
      className: "Css 강의",
    },
    {
      lessonName: "CLASS_1",
      teacher: "kkk",
      className: "Css 강의",
    },
  ]);

  const [lessonName, setLessonName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [className, setClassName] = useState("");

  console.log(
    `lessonName : ${lessonName}  teacher : ${teacher} className : ${className}`
  );

  function onChange(e) {

    const type = e.target.lessonName;
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

  //post 
  const handlePost = async () => {
    const params = new URLSearchParams();

    params.append("lessonName", lessonName);
    params.append("teacher", teacher);
    params.append("className", className);

    await axios
      //hearder에 토큰을 삽입함 (제거해도 무방)
      .post("/lesson/class", params, {
        hearder: {
          accessToken: localStorage.getItem("accessToken"),
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


  const mapClassas = classes.map(({ className, lessonName, teacher }) => {
    return (
      <Link to={`/class/${className}`} className="card">
        <Card >
          <Card.Img variant="top" src="./images/b2.jpg" />
          <Card.Body>
              <Card.Title className="card-title" type="text" name="className" onChange={onChange}>
                {className}
              </Card.Title>
              <Card.Text className="card-text" type="text" name="className" onChange={onChange}>
                {lessonName} - {teacher}
              </Card.Text>
              <Button className="delete" variant="secondary" onClick={() => handleDelete(teacher, className)}>
                삭제
              </Button>
          </Card.Body>
        </Card>
      </Link>
    );
  });

  useEffect(() => {
    // TODO 렌더링 시 response.data를 classes state에 저장
    axios.get("/lesson/class").then((response) => setClasses(response.data));
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
            <Form.Control type="text" placeholder="수업이름을 입력해주세요" />

            <Form.Label>선생님</Form.Label>
            <Form.Control type="text" placeholder="선생님 성함을 입력해주세요" />

            <Form.Label>강좌명</Form.Label>
            <Form.Control type="text" placeholder="강좌명을 입력해주세요" />

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>강좌 이미지를 업로드하세요.</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
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
