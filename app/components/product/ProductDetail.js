import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppActions from '../../flux/actions/AppCartActionsCreator';
import AppStoreCart from '../../flux/stores/AppStoreCart';

class ProductDetail extends Component {

    constructor(props) {
        super(props);
        console.log('ProductDetail-->',this.props);
        this.state = {
            concernedItem: AppStoreCart.getConcernedItemById(this.props.match.params.item)
        };
     }

    componentDidMount() {
        AppStoreCart.addChangeListener(this.onStoreChange);
    }

    componentWillUnmount() {
        AppStoreCart.removeChangeListener(this.onStoreChange);
    }

    onStoreChange = () => {
        const concernedItem = AppStoreCart.getConcernedItemById(this.props.match.params.item)
        this.setState({ concernedItem });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.concernedItem !== nextState.concernedItem) return true;
        return false;
    }

    handleAddItem = () => {
        AppActions.addItem(this.state.concernedItem);
    }

    renderQtyInCart = () => {
        if (this.state.concernedItem.qty) {
            return `(${this.state.concernedItem.qty} in cart)`;
        }
    }

    render() {
        return (
            <div>
                <h4> {this.state.concernedItem.title}</h4>
                <img src="http://placehold.it/250x250" width="20%" className="img-responsive" />
                <div className="text-muted">{ this.state.concernedItem.summary }</div>
                <div className="text-info">{ this.state.concernedItem.description }</div>
                <div>
                    <span style={{ marginRight: '1%' }}>{ this.state.concernedItem.cost } $</span>
                    <span className="text-success">{ this.renderQtyInCart() } </span> 
                </div>
                <Link to ="/" className="btn btn-default btn-sm">Continue Shopping</Link>
                <button onClick={this.handleAddItem} className="btn-primary">Add to Cart</button>
            </div>
        )
    }
}

export default ProductDetail;