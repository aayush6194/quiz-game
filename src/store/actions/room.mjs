
export const RoomActions = {
    ADD_ROOM: 'ADD_ROOM'
}
export const addRoom = () => {
    return (dispatch) => {
    
            dispatch({ type: RoomActions.ADD_ROOM });
        }
}