import React, {Component} from 'react';
import AppStoreCart from '../../flux/stores/AppStoreCart';
import { Link } from 'react-router-dom';

class CartSummary extends Component {

    constructor(props) {
        super(props);
        this.state = { cartTotals: AppStoreCart.getCartTotals() };
    }

    componentDidMount() {
        AppStoreCart.addChangeListener(this.onStoreChange);
    }

    componentWillUnmount() {
        AppStoreCart.removeChangeListener(this.onStoreChange);
    }

    onStoreChange = () => {
        const cartTotals = AppStoreCart.getCartTotals();
        this.setState({ cartTotals });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.cartTotals !== nextState.cartTotals) return true;
        return false;
    } 

    render() {
        return (    
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '2% 0 3%' }}>
                    <Link to="/cart" className="btn btn-success">
                        {`Cart Items: ${this.state.cartTotals.totalQty} /  $${this.state.cartTotals.totalPrice}`}
                    </Link>
                </div>
        )}
}

export default CartSummary;