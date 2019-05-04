import { reducer as formReducer} from 'redux-form'
import { reducer as MakeRequestReducer, constants as API_SERVICE_NAME } from '@externalUtil/make-request';

//MODULES
import { reducer as cocktailsReducer, constants as cocktailsConstants, } from 'containers/cocktails';

const AppReducer = {
    form: formReducer,
    [API_SERVICE_NAME.NAME]: MakeRequestReducer,
    [cocktailsConstants.NAME]: cocktailsReducer,
};

export default AppReducer;
