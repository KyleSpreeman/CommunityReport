import React from 'react'
import { Container, Row, Card, CardBody, CardTitle } from 'reactstrap'


class Projects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            info: null,
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},       //Shows the infoWindow to the selected place upon a marker
            imagePath: ''
        }
    }

    render() {
        return (
            <div style={{
                paddingTop: '1rem',
                paddingBottom: 'calc(10rem - 56px)',
                backgroundImage: 'url(https://servicechampions.com/wp-content/uploads/2017/09/Long-Beach.jpg)',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: "150vh"
            }}>
                <Container>
                    <Row>
                        <Card xs='8' body outline color="primary">
                            <CardBody>
                                <CardTitle>
                                    <h5>Ongoing Projects in Long Beach</h5>
                                    <hr />
                                </CardTitle>
                                {/* <Frame style={{ height: '480px', width: '640px' }}>
                                    <iframe width="640px" height="480px" src="https://longbeachca.maps.arcgis.com/apps/MapJournal/index.html?appid=f622671cf28a43aeaf4951bf70a1e5ed" frameborder="0" scrolling="no"></iframe>
                                </Frame> */}
                                <iframe title="Projects" width="100%" height="800px" src="https://longbeachca.maps.arcgis.com/apps/MapJournal/index.html?appid=f622671cf28a43aeaf4951bf70a1e5ed" frameborder="0" scrolling="no"></iframe>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
            </div >
        )
    }
}

export default Projects