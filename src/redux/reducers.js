import {
    IMMUTABLE_WAREHOUSE_DATA,
} from "./constants";
import data from "../utils/warehouse.json";

const initialState = {
    immutableWarehouseData: data
}

export const requestAuthReducer = (state = initialState, action={})=>{
    switch(action.type){
        case IMMUTABLE_WAREHOUSE_DATA:
            return{...state, immutableWarehouseData: action.payload}
        default:
            return state;
    }
}