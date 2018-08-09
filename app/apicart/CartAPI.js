// const CartAPI = {
//     catalog: [],
//     cartItems: [],
//     removeItem( item )  {
//         this.cartItems.splice(this.cartItems.findIndex( i => i === item),1 );
//     },
//     findCartItem( item ) {
//     return  this.cartItems.find( cartItem => cartItem.id === item.id) ;

//     },
//     increaseItem( item ) { item.qty++ },
//     decreaseItem( item ){
//         item.qty--;
//         if( item.qty === 0 ) {
//             _removeItem( item );
//         }
//     },
//     addItem( item ) {
//         const cartItem = _findCartItem( item );
//         if( !cartItem ) {
//             this.cartItems.push(Object.assign( {qty: 1},item));
//         }
//         else {
//             this._increaseItem( cartItem );
//         }
//     },
//     cartTotals( qty = 0, total = 0) {
//         var quantite  = 0;
//         this.cartItems.forEach( cartItem => {
//             console.log('quantite avant =',cartItem.qty);
//             quantite += cartItem.qty;
//             total += cartItem.qty * cartItem.cost;
//         });
//         qty = quantite;
//         console.log('quantite=',quantite);
//         return {qty, total};
//     },
//     getCatalog() {
//         return this.catalog.map(item => {
//             return Object.assign({}, item, this.cartItems.find( cItem => cItem.id === item.id ))
//         })
//     },
//     init() {
//         for(let i = 1; i < 9; i++) {
//             this.catalog.push( {
//                 'id': 'Product' + i,
//                 'title': 'Product #' + i,
//                 'summary': 'A greate product',
//                 'description': ' ss desccc lorem ipsum dolor',
//                 'cost': i
//             });
//         }
//     }
// }
// CartAPI.init(); 
// export default CartAPI;