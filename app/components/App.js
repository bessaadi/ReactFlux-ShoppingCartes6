/*
import React from "react"
import bootstrap from '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import fontAwsome from '../../node_modules/font-awesome/css/font-awesome.min.css';
class Main extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>Bienvenue</h1>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Main
*/
import React, {Component} from 'react';
import Catalog from './catalog/Catalog';
import Cart from './cart/Cart';
import Template from './App-template'
import {BrowserRouter as Router, Route, HashRouter} from 'react-router-dom';
import ProductDetail from './product/ProductDetail';


export default () => {
    return (
        <HashRouter>
            <div className="container">
                <Route path="/" component={ Template }/>
                <Route exact path="/" component={ Catalog } />
                <Route path="/cart" component={ Cart } />
                <Route path="/item/:item" component={ ProductDetail } />
            </div>
        </HashRouter>
    );
}

