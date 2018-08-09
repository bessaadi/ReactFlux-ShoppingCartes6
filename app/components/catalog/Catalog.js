import React, {Component} from 'react';
import AppStoreCart from '../../flux/stores/AppStoreCart';
import AppActions from '../../flux/actions/AppCartActionsCreator';
import CatalogItem from './CatalogItem';


class Catalog extends Component {
   
    constructor() {
        super();
        this.state = { items: AppStoreCart.getCatalog().get('catalog') };
        this.onchange = this.onchange.bind(this);
        console.log('Catalog---->items=',this.state);
       
    }

    componentWillMount() {
        AppStoreCart.addChangeListener( this.onchange );
    }

    componentWillUnmount() {
        AppStoreCart.removeChangeListener( this.onchange );
    }

    onchange() {
        console.log("Catalog-->onChnage");
        this.setState( { items: AppStoreCart.getCatalog().get('catalog') } )
    }

    renderItems = () => {
        console.log('renderItems=', this.state.items);
        this.mappedItems = this.state.items.valueSeq().map( item => {
            return <CatalogItem key={ item.id } item={ item } />
        });
        console.log('Catalog-->itemsMAPPED=',this.mappedItems);
        return this.mappedItems;   
    }

    handleloadMoreCatalog(){
        AppActions.loadMoreCatalog();
    }

    render() {
        return (
            <div className="row">
                { this.renderItems()}
                <div onClick={this.handleloadMoreCatalog} className="text-success"> More Products</div>
            </div>
    )}
}

export default Catalog;