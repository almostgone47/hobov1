import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser, fetchRentals, createBooking } from '../../store/actions/index';

class Header extends Component {

    state = {
        search: ''
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    searchHandler(e, cb) {
        e.preventDefault();
        this.props.dispatch(fetchRentals(this.state.search))
        cb()
    }

    clearSearchHandler() {
        this.setState({
            search: ''
        })
    }

    render() {
        return (
            <nav className="navbar navbar-dark navbar-expand-lg">
                <div className="container">
                    <Link 
                        to={"/rentals"} 
                        className="navbar-brand"
                        onClick={e => this.searchHandler(e, this.clearSearchHandler.bind(this))}
                    >Hobov</Link>
                    <form onSubmit={e => this.searchHandler(e, this.clearSearchHandler.bind(this))} className="form-inline my-2 my-lg-0">
                        <input 
                            onChange={e => this.changeHandler(e)}
                            name="search"
                            value={this.state.search}
                            className="form-control mr-sm-2 hobov-search" 
                            type="search" 
                            placeholder="Search a city!" 
                            aria-label="Search" 
                        />
                        <button
                            type="submit"
                            className="btn btn-outline-success my-2 my-sm-0 btn-hobov-search"
                        >Search</button>
                    </form>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarNavAltMarkup" 
                        aria-controls="navbarNavAltMarkup" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">
                            { this.props.user ? 
                            <>
                                <Link to={"/profile"} className="nav-item nav-link">My Profile</Link>
                                <Link to={"/rentalnew"} className="nav-item nav-link">New Rental</Link>
                                <div className="nav-item nav-link">Welcome {this.props.user.username}</div>
                                <div onClick={() => this.props.dispatch(logoutUser())} className="nav-item nav-link">Logout</div>
                            </> : 
                            <>
                                <Link to={"/login"} className="nav-item nav-link active">Login <span className="sr-only">(current)</span></Link>
                                <Link to={"/register"} className="nav-item nav-link">Register</Link>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        );
    };
}

const mapStateToProps = state => {
    return {
        user: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(Header);