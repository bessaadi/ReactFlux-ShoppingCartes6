import React, { Component } from 'react';
import AppActions from '../../flux/actions/AppCartActionsCreator';
import { Link } from 'react-router-dom';
import  cartCss from '../../css/cartCss'

class CatalogItem extends Component {

    constructor(props) {
        super(props);
    }

    handleAddItem = () => {
        AppActions.addItem(this.props.item);
    }

    renderQtyInCart = () => {
        if (this.props.item.qty) {
            return `(${this.props.item.qty} in cart)`;
        }
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-4 col-md-3" style={cartCss.itemStyle}>
                <h4> {this.props.item.title}</h4>
                <img src="http://placehold.it/250x250" width="100%" className="img-responsive" />
                <div>{ this.props.item.summary }</div>
                <div>
                    <span style={{ marginRight: '6%' }}>{ this.props.item.cost } $</span>
                    <span className="text-success">{ this.renderQtyInCart() } </span> 
                </div>
                <Link to={`/item/${this.props.item.id}`} className = "btn btn-default btn-sm">Learn More</Link>
                <button  className="btn-primary" onClick= {this.handleAddItem}> Add to cart </button>
            </div>

    )}
}
export default CatalogItem;