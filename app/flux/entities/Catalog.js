import { Record, Map } from 'immutable';

const _reviveProps = (props) => {
    if (props.catalog && !Map.isMap(props.catalog)) {
      props.catalog = Map(props.catalog);
    }
  
    return props;
};

const CatalogRecord = Record({
    catalog:Map({
        id: undefined,
        title: undefined,
        summary: undefined,
        description: undefined,
        cost: undefined,
        qty: undefined,
        total: undefined
    })
})

class Catalog extends CatalogRecord {
    constructor(props) {
        super(_reviveProps(props));
      }
}

export default Catalog;
