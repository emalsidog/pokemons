// Dependencies 
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

// Actions
import { activateAccountAction } from "../../../../redux/actions/auth-actions";

// Styles
import styles from "./activate.module.css";

const Activate = () => {

    const dispatch = useDispatch();
    const { activationToken } = useParams();
    const { status } = useSelector(({ auth }) => auth);

    useEffect(() => {
        dispatch(activateAccountAction(activationToken));
    }, [dispatch, activationToken]);
    
    return (
        <div className={styles.container}>
            <h1>{ status.message }</h1>
            <h3>
                <Link to={ status.isError ? "/users/register" : "/users/login" }>
                    { status.isError ? "Back to registration page" : "To login page!" }
                </Link>
            </h3>
        </div>
    )
}

export default Activate;
