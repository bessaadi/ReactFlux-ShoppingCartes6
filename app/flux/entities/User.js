import { Record, Map, List } from 'immutable';
import md5 from 'md5';

const _reviveProps = (props) => {
    if (props.coordonnees && !Map.isMap(props.coordonnees)) {
      props.coordonnees = Map(props.coordonnees);
    }
  
    return props;
};

const UserRecord = Record({
    login: undefined,
    email: undefined,
    coordonnees: Map({
        ville: undefined
    }),
    contacts: List()
})

class User extends UserRecord {
    constructor(props) {
        super(_reviveProps(props));
      }

      // logic create hash of user
      getHash = () => {
          return md5(this.login + this.email);
      }

      // Abstraction de la modification des coordonnées dans .setCoordonnees()
      setCoordoonees = (value) => {
          return this.setIn(['coordonnees','ville'], value);
      }
}

export default User;