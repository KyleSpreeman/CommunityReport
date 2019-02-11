import React from 'react'
import { Container, Row, Card, CardBody, CardTitle, CardImg } from 'reactstrap'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import Share from '../Components/Share/Share'
import concernsService from './Services/concernsServices'
import Moment from 'react-moment'
import Frame from 'react-frame-component';
import FileStorageService from './Services/FileStorageService'

const mapStyles = {
    width: 'device-width',
    height: 'device-height',
};

class DetailedConcern extends React.Component {
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
    componentDidMount() {
        const queryString = require('query-string');
        const parsed = queryString.parse(window.location.search);
        const parsedId = parsed.id;
        this.setState({
            id: parsedId
        }, () => console.log(this.state.id));
        if (typeof parsedId !== 'undefined') {
            concernsService.selectConcernById(parsedId, this.onGetByIdSuccess, this.onGetByIdError)
            FileStorageService.getByConcernId(parsedId, this.onGetFileSuccess, this.onGetFileError)
        }
    }
    onGetByIdSuccess = resp => {
        console.log(resp);
        this.setState({
            data: resp.data.item
        }, () => console.log(this.state.data))
    }
    onGetByIdError = err => {
        console.log(err);
    }

    upvote = Id => {
        let data = {
            Id: Id
        }
        console.log(data)
        this.setState({
            Id: Id
        }, () => concernsService.upVoteConcern(data, this.upVoteSuccess, this.upVoteError))

    }

    upVoteSuccess = resp => {
        console.log(resp)
        concernsService.selectConcernById(this.state.Id, this.onGetByIdSuccess, this.onGetByIdError)
    }

    onGetFileSuccess = resp => {
        console.log(resp)
        this.setState({
            imagePath: `http://localhost:3024/${resp.data.item.systemFileName}`
        })
    }

    onGetFileError = err => {
        console.log(err)
    }

    render() {
        const address = (this.state.data && this.state.data.address != null) ? <p> {this.state.data.concernDescription}<br />
            {this.state.data.address} <br /> {this.state.data.city} {this.state.data.state} {this.state.data.zip}</p> :
            (this.state.data && this.state.address == null) ? <p> {this.state.data.concernDescription} </p> :
                ''
        return (
            <div style={{
                paddingTop: '1rem',
                paddingBottom: 'calc(10rem - 56px)',
                backgroundImage: 'url(https://servicechampions.com/wp-content/uploads/2017/09/Long-Beach.jpg)',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: "100vh"
            }}>
                <Container>
                    <Row>
                        {this.state.imagePath &&
                            <CardImg top width="100%" height="30%" src={this.state.imagePath} alt="Card image cap" />
                        }
                        <Card xs='8' body outline color="primary">
                            <CardBody>
                                <CardTitle>
                                    <h5>Detailed Community Report</h5>
                                    <hr />
                                </CardTitle>
                                {this.state.data &&
                                    <div>
                                        <h3><u>{this.state.data.concernTitle}</u></h3>
                                        <h5> Department: {this.state.data.departmentName}</h5>
                                        {address}
                                        <h5>Date Submitted:
                                            <Moment format="MM/DD/YYYY">
                                                {this.state.data.createdDate}
                                            </Moment></h5>
                                        <h4> Status: {this.state.data.status}</h4>
                                        <h4 style={{ display: 'inline-block' }}> Votes:
                                            <p style={{ display: 'inline-block', paddingRight: '10px' }}>
                                                {this.state.data.concernLevel}
                                            </p>
                                            <i className="arrow up" style={{
                                                paddingTop: '10px',
                                                border: 'solid green',
                                                borderWidth: '0 6px 6px 0',
                                                display: 'inline-block',
                                                padding: '6px',
                                                textAlign: 'center',
                                                transform: 'rotate(-135deg)',
                                            }}
                                                id={this.state.data.id}
                                                onClick={() => this.upvote(this.state.data.id)}></i>
                                        </h4>
                                    </div>
                                }
                                <Share
                                    shareUrl={window.location.href}
                                    title="Please support my community report!"
                                    fbshareUrl="www.github.com"
                                />
                                <br />
                                <Frame style={{ height: 'device-height', width: 'device-width' }}>
                                    {this.state.data && <Map
                                        google={this.props.google}
                                        zoom={14}
                                        style={mapStyles}
                                        initialCenter={{
                                            lat: this.state.data.latitude,
                                            lng: this.state.data.longitude
                                        }}>
                                        <Marker
                                            onClick={this.onMarkerClick}
                                            position={{ lat: this.state.data.latitude, lng: this.state.data.longitude }}
                                        /></Map>
                                    }
                                </Frame>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
            </div >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCwceRI1qGErNEWxR2PHx2sz7CIcLR_1lA'
})(DetailedConcern);