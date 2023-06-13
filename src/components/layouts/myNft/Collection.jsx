import React from 'react'
import { NavLink } from 'react-router-dom'
import Card from "../../Card"

function Collection() {
    return (
        <section className="collection">
            <div className="row">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </section>
    )
}

export default Collection