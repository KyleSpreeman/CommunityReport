import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import concernsServices from './Services/concernsServices'
import FileStorageService from './Services/FileStorageService';

class ReportConcern extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photoDataUri: "",
            departmentId: "",
            concernLevel: 1,
            status: "Reported",
            userId: 1,
            longitude: "",
            latitude: "",
            concernTitle: "",
            concernDescription: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            departments: [],
            showLongerDescription: false,
            showAddress: false,
        }
    }

    componentDidMount() {
        concernsServices.ListDepartments(this.onListDepartmentsSuccess, this.onListDepartmentsError)
    }

    onListDepartmentsSuccess = response => {
        console.log(response)
        const departments = response.data.items;
        this.setState({
            departments: departments,
        })
    }

    onListDepartmentsError = response => {
        console.log(response)
    }

    handleChange = evt => {
        const key = evt.target.name
        const val = evt.target.value
        console.log("key", key, "val", val)
        this.setState({
            [key]: val
        })
    }

    handleRetakePhotoClick = () => {
        this.setState({
            photoDataUri: "",
        })
    }

    onTakePhoto(photoDataUri) {
        // Do stuff with the dataUri photo...
        console.log('takePhoto');
        console.log(photoDataUri)
        this.setState({
            photoDataUri: photoDataUri,
        })
    }

    onUploadSuccess = resp => {
        console.log(resp)
        this.props.history.push('/')
    }

    handleGetLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lng = position.coords.longitude;
                const lat = position.coords.latitude;

                console.log(`longitude: ${lng} | latitude: ${lat}`);
                this.setState({
                    longitude: lng,
                    latitude: lat,
                })
            });
        }
    }

    handleLongerDescriptionClick = () => {
        this.setState({
            showLongerDescription: true,
        })
    }

    handleSubmitClick = () => {
        const concernData = {
            CityDepartment: this.state.departmentId,
            ConcernTitle: this.state.concernTitle,
            ConcernDescription: this.state.concernDescription,
            ConcernLevel: this.state.concernLevel,
            Status: this.state.status,
            Address: this.state.address,
            City: this.state.city,
            State: this.state.state,
            Zip: this.state.zip,
            Longitude: this.state.longitude,
            Latitude: this.state.latitude,
        }
        concernsServices.InsertConcern(concernData, this.onInsertConcernSuccess, this.onInsertConcernError);
    }

    onInsertConcernSuccess = response => {
        console.log("onInsertConcernSuccess", response)
        const imageFileName = `${response.data.item}.jpeg`
        const fileObject = this.dataURLtoFile(this.state.photoDataUri, imageFileName);
        console.log(fileObject);
        const uploadData = new FormData();
        uploadData.append('file', fileObject);
        console.log(uploadData);
        FileStorageService.upload(uploadData, this.onUploadSuccess, this.onUploadError)
    }

    onInsertConcernError = response => {
        console.log("onInsertConcernError", response)
    }

    onUploadError = err => {
        console.log(err)
        this.props.history.push('/list-concern')
    }

    dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col xs="1">
                    </Col>
                    <Col xs="10" align="center">
                        <h6>Add a Concern</h6>
                    </Col>
                    <Col xs="1">
                    </Col>
                </Row>
                <Row>
                    <Col xs="1">
                    </Col>
                    <Col xs="10">
                        <Form>
                            {this.state.photoDataUri.length > 1
                                ?
                                <React.Fragment>
                                    <img width="100%" src={this.state.photoDataUri} alt='Concern' />
                                    <Button
                                        onClick={this.handleRetakePhotoClick}
                                    >
                                        Retake Photo
                        </Button>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Camera
                                        onTakePhoto={(photoDataUri) => { this.onTakePhoto(photoDataUri); }}
                                    />
                                </React.Fragment>
                            }
                            <FormGroup>
                                <Label for="department">Department</Label>
                                <Input type="select" name="departmentId" id="departmentId" onChange={this.handleChange}>
                                    {this.state.departments.map((department, index) => {
                                        return (
                                            <option key={index} value={department.departmentId}>{department.departmentName}</option>
                                        )
                                    })
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="concernTitle">Subject</Label>
                                <Input type="text" name="concernTitle" id="concernTitle" placeholder="Subject" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="concernDescription">Description</Label>
                                <Input type="textarea" name="concernDescription" id="concernDescription" placeholder="Details (optional)" onChange={this.handleChange} />
                            </FormGroup>
                            {this.state.latitude && this.state.longitude
                                ?
                                <React.Fragment>
                                    <h3>
                                        Location Saved
                            </h3>
                                </React.Fragment>
                                :
                                <div>
                                    <Button
                                        onClick={this.handleGetLocationClick}
                                    >
                                        Get My Location
                        </Button>
                                </div>
                            }
                            {this.state.latitude && this.state.longitude && !this.state.showAddress
                                ?
                                ""
                                :
                                <React.Fragment>
                                    <FormGroup>
                                        <Label for="address">Street Address</Label>
                                        <Input type="text" name="address" id="address" placeholder="Street Address" onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="city">City</Label>
                                        <Input type="city" name="city" id="city" placeholder="City" onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="state">State</Label>
                                        <Input type="select" name="state" id="state" onChange={this.handleChange}>
                                            <option>Select a State</option>
                                            <option>CA</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="zip">Zip</Label>
                                        <Input type="text" name="zip" placeholder="Zip Code" onChange={this.handleChange} />
                                    </FormGroup>
                                </React.Fragment>
                            }

                            <Button onClick={this.handleSubmitClick}>Submit</Button>
                        </Form>
                    </Col>
                    <Col xs="1">
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default ReportConcern;