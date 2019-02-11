import React from 'react'
import { Container, Row, Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'
// import './About.css'

class About extends React.Component {


    render() {
        return (
            <div style={{
                paddingTop: '50px',
                paddingBottom: '50px',
                backgroundImage: 'url(https://servicechampions.com/wp-content/uploads/2017/09/Long-Beach.jpg)',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <Container>
                    <Row>
                        <Card body outline color="primary" style={{ opacity: 0.95 }}>
                            <CardHeader>About Community Report</CardHeader>
                            <CardBody>
                                <CardTitle>
                                    <h3>Making Reporting Incidents and Concerns Quick and Easy</h3>
                                </CardTitle>
                                <CardText>Community Report  is a web app service that provides a forum for members of the community to report incidents and share their concerns with their local government. More importantly, members of the community can see the local governments engagement with each concern based on the reported status.</CardText>
                                <CardText>This app is meant to be used in communities to crowd source discovery, identification and reporting of public issues that fall under the local government's responsibilities to address. These can come in the form of structural failures, downed trees or power lines, fires, suspicious activities, or anything that the community determines a concern that needs addressing.</CardText>
                                <CardText>Community Report is different from current solutions because it encourages further engagement after the initial reporting by allowing users to up vote current reports and share their concerns to social media.</CardText>
                            </CardBody>
                        </Card>
                    </Row>
                    <br />
                    <Row>
                        <Card body outline color="primary" style={{ opacity: 0.95 }}>
                            <CardHeader>What Can You Do With Community Report</CardHeader>
                            <CardBody>
                                <CardTitle>
                                    <h3>Use Cases</h3>
                                </CardTitle>
                                With Community Report members of the community can
                                    <ul>
                                    <li>Report concerns</li>
                                    <li>View concerns others have reported</li>
                                    <li>Engage with and upvote concerns that they want to see addressed</li>
                                    <li>View the local governments engagement with each concern via the listed status</li>
                                </ul>
                            </CardBody>
                        </Card>
                    </Row>
                    <br />
                    <Row>
                        <Card body outline color="primary" style={{ opacity: 0.95 }}>
                            <CardHeader>FAQs</CardHeader>
                            <CardBody>
                                <CardTitle>
                                    <h3>Frequently Asked Questions</h3>
                                </CardTitle>
                                How do I report a concern?
                                <ul>
                                    <li>In the navigation link above, click on Add Report and fill out the form</li>
                                    <li>When reporting a concern, you will be asked to proivde a location for the concern and a picture if applicable</li>
                                </ul>
                                <hr />
                                How do I see the concerns that have been posted?
                                <ul>
                                    <li>In the navigation link above, click on Reported Concerns</li>
                                </ul>
                                <hr />
                                How do I know my concerns have been seen or addressed?
                                <ul>
                                    <li>When viewing a reported concern, there will be a status assigned to it. All concerns will begin as reported and as your local government engages with the concern, they will update the status.</li>
                                </ul>
                                <hr />
                                How can I increase the importance of my concern?
                                <ul>
                                    <li>Ultimately, the importance of each concern and the order in which they will be addressed will be decided by your local government. However, there are ways to highlight your concerns above others:
                                        <ol>
                                            <li>By creating an account and verifying your email, your reported concerns will have higher importance than anonymous reports</li>
                                            <li>By being a repeat user with reliable reports, your concern importance level will reflect your reputation</li>
                                            <li>As others community members engage with a concern, it will increase in importance level. In this way, users are encouraged to share their posts by any means, including the provided social media share options and your local government will know what concerns are bothering their community most</li>
                                        </ol>
                                    </li>
                                </ul>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default About