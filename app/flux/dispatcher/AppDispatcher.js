import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {

  constructor() {
    super();
  }
  dispatch(data) {
    super.dispatch(data);
  }
}

const Instance = new AppDispatcher();
export default Instance;
