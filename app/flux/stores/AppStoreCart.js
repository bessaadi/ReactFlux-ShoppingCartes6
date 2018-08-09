
import BaseStore from 'BaseStore';
import { ActionTypes } from '../constants/AppConstants';
import { register } from 'AppRegister';
import AppDispatcher from 'AppDispatcher';
import { Immutable ,Map, List } from 'immutable';
import Catalog from '../entities/Catalog'

const buildCatalog = (nbrProduits) => {
    const catalogMap = new Map(); 
    const catalog = new Map();
    const immutableCatalog = catalogMap.withMutations(map => {
        for(let i = 1; i <= nbrProduits; i++) {
            map.set(i,{
                id: `Produit${i}`,
                title: `mmProduit #${i + 1}`,
                summary: 'Un bon produit',
                description: 'description lorem ipsum dolor',
                cost: i,
                qty: 0,
                total: 0
            });
        } 
    }) 
    console.log("buildCatalog=",immutableCatalog);
    return catalog.set('catalog',immutableCatalog);      
  }

const loadMoreProducts = (payload) => {
    const catalogMap = new Map();
    const catalog = new Map();
    const immutableCatalog = catalogMap.withMutations(map => {
        payload.forEach((element,index) => {
            console.log(element);
            map.set(index,{
            id: element.id,
            title: element.title,
            summary: element.summary,
            description: element.description,
            cost: element.cost,
            qty: element.qty,
            total: element.total
            });
        })
    }) 
    console.log("AppStoreCart-->loadMoreProducts=",immutableCatalog);
    return catalog.set('catalog',immutableCatalog);
}
class AppStoreCart extends BaseStore {
    constructor() {
        super();
        this.catalog = buildCatalog(9);
        console.log('AppStoreCart-->constructor=', this.catalog);
        this.cartItems = [];
        //this.cartItems = List();
    }

    loadMoreCatalog = (payload) => {
        // fusionner les 2 tableaux de produits, celui avec un mock de produits en local + ceux de remote
        //this.catalog = [ ...this.catalog, ...this.remoteProducts ];
        this.catalog = this.makeDbCatalogToImmutableCatalog(loadMoreProducts(payload));
        console.log("loadMoreCatalog catalog=",this.catalog);
        this.emitChange();       
    }

    makeDbCatalogToImmutableCatalog(catalog) {
        return new Catalog(catalog);
      }
    
    addItem = ( item ) => {    
        const concernedItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
        if (concernedItem) {
            concernedItem.qty++;
            concernedItem.total = concernedItem.qty * concernedItem.cost;
        } else {
            item.qty++;
            item.total = item.qty * item.cost;
            this.cartItems.push(item);
        }
        this.emitChange();
    }

    getConcernedItemById = (id) => {
        let concernedItem = this.cartItems.find((cartItem) => cartItem.id === id);
        if (!concernedItem) {
            concernedItem = this.catalog.get('catalog').find((catalogItem) => catalogItem.id === id);
            this.cartItems.push(concernedItem);
        }
        return { ...concernedItem };
    }

    deleteItem = (item) => {
        item.qty = 0;
        item.total = 0;
        const indexOfItemToDelete = this.cartItems.findIndex((cartItem) => cartItem.id === item.id);
        this.cartItems.splice(indexOfItemToDelete, 1);
        
        this.emitChange();
    }

    removeItem = ( item ) => {
        item.qty--;
        item.total = item.qty * item.cost;
        if (item.qty === 0) {
            const indexOfItemToDelete = this.cartItems.findIndex((cartItem) => cartItem.id === item.id);
            this.cartItems.splice(indexOfItemToDelete, 1);
        }
        console.log('removeItem=',item.qty);
        this.emitChange();
    }

    getCart = () => {
        console.log('app store-->getCart = ',this.cartItems)
        return List(this.cartItems);
    }

    getCatalog = () => {
        console.log('AppStoreCart-->getCatalog-------');
        return this.catalog;
    }

    getCartTotals = () => {
        const cartTotals = this.cartItems.reduce((prevValue, currentValue) => {
            return {
                totalQty: prevValue.totalQty + currentValue.qty,
                totalPrice: prevValue.totalPrice + ( currentValue.qty * currentValue.cost )
            }
        }, { totalQty: 0, totalPrice: 0});
        return cartTotals;
    }
}
  
const storeActions = (store) => {
    return (action) => {
        switch(action.type) {
            case ActionTypes.ADD_ITEM:
                store.addItem( action.item );
                break;
            case ActionTypes.REMOVE_ITEM:
                store.removeItem( action.item );
                break;
            case ActionTypes.DELETE_ITEM:
                store.deleteItem( action.item );
                break;
            case ActionTypes.LOAD_MORE_CATALOG:
                store.loadMoreCatalog( action.payload );
                break;   
            default:
                return;         
        }
    }
}

const AppStoreInstance = new AppStoreCart();
AppStoreInstance.dispatchToken = register(AppStoreInstance, storeActions);

export const actions = storeActions;
export const AppStoreClass = AppStoreCart;
export default AppStoreInstance;