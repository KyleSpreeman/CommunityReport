import React from 'react'


const ListAllTable = props => {
    console.log(props)
    return (
        <React.Fragment>
            <tr>
                <th scope="row" id={props.Id} onClick={() => props.openConcern(props.id)}>
                    {props.index}
                </th>
                <td id={props.Id} onClick={() => props.openConcern(props.id)}>
                    <h6><u>{props.concern}</u></h6>
                </td>
                <td id={props.Id} onClick={() => props.openConcern(props.id)}>
                    {props.status}
                </td>
                <td>
                    <i className="arrow up" style={{
                        border: 'solid green',
                        borderWidth: '0 6px 6px 0',
                        display: 'inline-block',
                        padding: '6px',
                        textAlign: 'center',
                        transform: 'rotate(-135deg)',
                    }}
                        id={props.id}
                        onClick={() => props.upvote(props.id)}></i>
                    <p style={{ paddingLeft: '1px' }}> {props.concernLevel}</p>
                </td>
            </tr>
        </React.Fragment>
    )
}

export default ListAllTable

