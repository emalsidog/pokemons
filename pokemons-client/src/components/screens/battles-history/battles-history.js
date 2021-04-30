// Dependencies
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Actions
import { getBattlesHistory } from "../../../redux/actions/battles-actions";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";

const BattlesHistory = () => {
    // Redux
    const dispatch = useDispatch();

    // Get battles history
    useEffect(() => {
        dispatch(getBattlesHistory());
    }, [dispatch]);

    return (
        <Layout>
            <Heading
                title="Battles history"
                description="Just battles history."
            />
        </Layout>
    )
}

export default BattlesHistory;