import React from 'react'
import concernsService from '../Services/concernsServices';
import ListAllTable from './ListAllTable';
import { Table } from 'reactstrap';

class ListAll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            concernsArr: [],
            number: 1
        }
    }

    componentDidMount() {
        console.log("hello")
        concernsService.listAllConcerns(this.onSuccess, this.onError)
    }

    onSuccess = resp => {
        console.log(resp.data.items)
        this.setState({
            concernsArr: resp.data.items
        })
    }

    onError = err => {
        console.log(err)
    }
    openConcern = Id => {
        console.log(Id)
        this.props.history.push(`/detailedconcern?id=${Id}`)
    }
    openConcernSuccess = resp => {
        console.log(resp);
    }
    openConcernError = err => {
        console.log(err);
    }

    upvote = Id => {
        let data = {
            Id: Id
        }
        console.log(data)
        concernsService.upVoteConcern(data, this.upVoteSuccess, this.upVoteError)
    }

    upVoteSuccess = resp => {
        console.log(resp)
        concernsService.listAllConcerns(this.onSuccess, this.onError)
    }

    render() {
        return (
            <React.Fragment>
                <Table striped style={{ width: 'device-width' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Concern</th>
                            <th>Status</th>
                            <th>Vote</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.concernsArr.map((para, index) => {
                            console.log("this should map")
                            return <ListAllTable
                                key={index}
                                index={index + 1}
                                id={para.id}
                                concern={para.concernTitle}
                                city={para.city}
                                concernLevel={para.concernLevel}
                                date={para.createdDate}
                                status={para.status}
                                lat={para.latitude}
                                long={para.longitude}
                                openConcern={this.openConcern}
                                upvote={this.upvote}
                            />
                        })}
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
}

export default ListAll
