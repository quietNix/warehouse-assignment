import {
    IMMUTABLE_WAREHOUSE_DATA,
} from "./constants";

export const editImmutableWarehouseData = (verdict) => {
    return ({
        type: IMMUTABLE_WAREHOUSE_DATA,
        payload: verdict
    })
}