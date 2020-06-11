import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/index';

const Header = (props) => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg">
            <div className="container">
                <Link to={"/rentals"} className="navbar-brand">Hobo</Link>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2 bwm-search" type="search" placeholder="Try New York" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search" type="submit">Search</button>
                </form>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                        <Link to={"/profile"} className="nav-item nav-link">Management</Link>
                        <Link to={"/rentalnew"} className="nav-item nav-link">New Rental</Link>
                        { props.user ? 
                        <>
                            <div className="nav-item nav-link">Welcome {props.user.username}</div>
                            <div onClick={() => props.dispatch(logoutUser())} className="nav-item nav-link">Logout</div>
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

const mapStateToProps = state => {
    return {
        user: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(Header);