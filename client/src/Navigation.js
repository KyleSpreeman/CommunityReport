import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReportConcern from './Components/ReportConcern'
import DetailedConcern from './Components/DetailedConcern'
import Projects from './Components/Projects'
import { NavLink as RRNavLink } from 'react-router-dom'; //to enable react-router-dom NavLink in reactstrap
import { Switch } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import ListAll from './Components/ListAllConcerns/ListAll'
import About from './Components/about/About'


class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isLoggedIn: false,
        }
    }

    componentDidMount() {
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    closeNavBar() {
        this.setState({
            isOpen: false,
        });
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Navbar color="light" light expand="md" >
                        <NavbarBrand tag={RRNavLink} to="/" onClick={this.closeNavBar}>Community Report</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {/* The following does not work since the state of the Navigation component does not update after logging in. */}
                                {/* {this.state.isLoggedIn ? 
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/logout" onClick={this.toggle}>Logout</NavLink>
                                </NavItem>
                                :
                                ""
                            } */}
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/report-concern" onClick={this.toggle}>Add Report</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/" onClick={this.toggle}>Concerns</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/projects" onClick={this.toggle}>Ongoing Projects</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/about" onClick={this.toggle}>About</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                    <Switch>
                        {/* <Route exact path="/" component={Home} /> */}
                        {/* <Route path="/register" component={Register} /> */}
                        {/* <Route path="/login" component={Login} /> */}
                        {/* <Route path="/logout" component={Logout} /> */}
                        <Route path="/report-concern" component={ReportConcern} />
                        <Route path="/about" component={About} />
                        <Route exact path="/" component={ListAll} />
                        <Route path="/detailedconcern" component={DetailedConcern} />
                        <Route path="/projects" component={Projects} />
                        {/* <Route path="/facility/edit/:id" component={ManageStorageFacility} /> */}
                        {/* <Route path="/facility/:id" component={StorageFacilityProfileView} /> */}
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}

export default Navigation;