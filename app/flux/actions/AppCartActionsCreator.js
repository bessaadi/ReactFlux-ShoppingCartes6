import AppDispatcher from 'AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import axios from 'axios';

class  AppCartActionsCreator {
    constructor() {

    }

    addItem( item ) {
        AppDispatcher.dispatch({
            type: ActionTypes.ADD_ITEM, item
        })
    }

    deleteItem( item ) {
        AppDispatcher.dispatch({
            type: ActionTypes.DELETE_ITEM, item
        })
    }

    removeItem( item ) {
        AppDispatcher.dispatch({
            type: ActionTypes.REMOVE_ITEM, item
        })
    }

    loadMoreCatalog() {
        const self = this;
        axios.get('http://localhost:3000/api/catalog')
        .then((response) => {
            AppDispatcher.dispatch({
                type: ActionTypes.LOAD_MORE_CATALOG,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
}

export default new AppCartActionsCreator();