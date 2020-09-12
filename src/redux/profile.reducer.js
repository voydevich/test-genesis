import {handleActions} from "redux-actions";
import createAction from "redux-actions/es/createAction";



const reducer = handleActions({}, {
    id: 'self'
});

export default reducer