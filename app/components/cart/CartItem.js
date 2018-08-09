import React,{Component} from 'react';
import AppActions from '../../flux/actions/AppCartActionsCreator';

class CartItem extends Component {
    constructor(props) {
        super(props);
    }

    handleRemoveItem = () => {
        AppActions.removeItem(this.props.item)
    }

    handleDeleteItem = () => {
        AppActions.deleteItem(this.props.item)
    }

    handleAddItem = () => {
        AppActions.addItem(this.props.item)
    }

    render() {
    return (
        <tr>
            <td>
                <button onClick={this.handleDeleteItem}>x</button>
            </td>
            <td>
                {this.props.item.title}
            </td>
            <td>{this.props.item.cost} $</td>
            <td>x {this.props.item.qty}</td>
            <td>
                <div className="btn-group">
                    <button onClick={this.handleRemoveItem}>-</button>
                    <button onClick={this.handleAddItem}>+</button>
                </div>
            </td>
            <td>${this.props.item.total}</td>
        </tr>
    )}
}

export default CartItem;