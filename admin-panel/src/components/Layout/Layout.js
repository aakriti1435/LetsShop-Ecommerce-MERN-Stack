import React from 'react';
import Header from "../Header/Header";

function Layout(props) {
    return (
        <>
            <Header />
            {props}
        </>
    )
}

export default Layout;
