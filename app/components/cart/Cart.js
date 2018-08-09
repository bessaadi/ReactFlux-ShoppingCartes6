import React, {Component} from 'react';
import AppStoreCart from '../../flux/stores/AppStoreCart';
import CartItem from './CartItem';
import {Link} from 'react-router-dom';

class Cart extends Component {

    constructor() {
        super();
        this.state = { items: AppStoreCart.getCart()};
        console.log('Cart=', this.state);
    }
    
    componentDidMount() {
        AppStoreCart.addChangeListener(this.onStoreChange);
    }

    componentWillUnmount() {
        AppStoreCart.removeChangeListener(this.onStoreChange);
    }

    shouldComponentUpdate() {
        return true;
    }

    onStoreChange = () =>  {
        this.setState({ items: AppStoreCart.getCart()});
    }

    renderTotalPrice = () => {
        const totalPrice = this.state.items.reduce((prevValue, currentValue) => {
            return prevValue + currentValue.total;
        }, 0);
        
        return totalPrice;
    }

    renderItems = () => {
        const itemsTemplate = this.state.items.map( ( item, i ) => {
            return <CartItem item={item} key={i}/>
        });

        return itemsTemplate;
    }

    render() {
        return (
            <div>
                <h1>Cart</h1>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th></th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItems()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4" className="text-right">Total</td>
                            <td>${this.renderTotalPrice()}</td>
                        </tr>
                    </tfoot>    
                </table>
                <Link to="/">Continue Shopping</Link>
            </div>       
    )}
}

export default Cart;