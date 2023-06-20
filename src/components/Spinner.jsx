import React, { Fragment } from 'react'
import spinner from "./spinner.svg";

const Spinner = () =>
    <Fragment>
        <img src={spinner} alt="Loading..." style={{ objectFit: "contain", width: "200px", margin: '2em auto', display: 'block' }} />
    </Fragment>

export default Spinner;