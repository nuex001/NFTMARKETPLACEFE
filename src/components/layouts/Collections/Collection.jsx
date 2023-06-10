import React from 'react'
import { NavLink } from 'react-router-dom'
import Card from "../../Card"

function Collection() {
    return (
        <section className="collection">
            <ul>
                <NavLink to="/collection/">Recent</NavLink>
                <NavLink to="/collection/sold">Sold</NavLink>
                <NavLink to="/collection/sale">Sale</NavLink>
                <NavLink to="/collection/auction">Auctions</NavLink>
                <NavLink to="/collection/mobile">Mobile</NavLink>
                <NavLink to="/collection/laptops">Laptops</NavLink>
            </ul>
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