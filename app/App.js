import React, { Component } from 'react'
import Car from './components/car/Car.js'
import './less/ys.less'

export default class App extends Component {
    constructor(){
        super()
    }
    render() {
        return (
            <div>
                <Car/>
            </div>
        )
    }
}
