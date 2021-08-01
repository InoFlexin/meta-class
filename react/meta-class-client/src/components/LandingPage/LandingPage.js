import React from 'react'
import { Card } from 'react-bootstrap';
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
function LandingPage() {
    return (
        <div>
            <div className="container1">
                <NavBar/>  
            </div>
                    
            <div className="container2">
                <a href="/" class="logo">
                    <span class="symbol"><img src="./images/logo.svg" alt="" /></span><span className="title">M E T A  C L A S S</span>
                </a>
                <h1 className="title2">마인크래프트는 못 참지!!!<br />
                비대면 수업을 메타버스를 통한 마인크래프트로~!</h1><br></br>
                <p>지루한 비대면 수업을 각광받고 있는 메타버스 기술을 활용하여 활기차고 적극적인 학습을 주도하여 수업의 효율을 높여줍니다.</p>
            </div>

            <div className="container3">
                <span className="item item1">
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src= "./images/b1.jpg" />
                    <Card.Body>
                        <Card.Title>Class 1</Card.Title>
                        <Card.Text>
                            HTML 강의 - LSH
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </span>
            
                <span className="item item2">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src= "./images/b2.jpg" />
                        <Card.Body>
                            <Card.Title>Class 2</Card.Title>
                            <Card.Text>
                                Css 강의 - LSH
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </span>

                <span className="item item3">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src= "./images/b3.jpg" />
                        <Card.Body>
                            <Card.Title>Class 3</Card.Title>
                            <Card.Text>
                                Javascript 강의 - LSH
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </span>

                <span className="item item4">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src= "./images/b4.jpg" />
                        <Card.Body>
                            <Card.Title>Class 4</Card.Title>
                            <Card.Text>
                                Java 강의 - NDY
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </span>

                <span className="item itme5">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src= "./images/b5.jpg" />
                        <Card.Body>
                            <Card.Title>Class 5</Card.Title>
                            <Card.Text>
                                Spring 강의 - NDY
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </span>

                <span className="item item6">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src= "./images/b6.jpg" />
                        <Card.Body>
                            <Card.Title>Class 6</Card.Title>
                            <Card.Text>
                                알고리즘 강의 - NDY
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </span>

                <span className="item item7">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src= "./images/b7.jpg" />
                        <Card.Body>
                            <Card.Title>Class 7</Card.Title>
                            <Card.Text>
                                코틀린 강의 - KCH
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </span>

                <span className="item item8">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src= "./images/b8.jpg" />
                        <Card.Body>
                            <Card.Title>Class 8</Card.Title>
                            <Card.Text>
                                스프링부트 강의 - KCH
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </span>

                <span className ="item item9">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src= "./images/b9.jpg" />
                        <Card.Body>
                            <Card.Title>Class 9</Card.Title>
                            <Card.Text>
                                C++ 강의 - KCH
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </span>
            </div>
            <Footer/>
        </div>
    )
}

export default LandingPage
