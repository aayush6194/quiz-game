import immer from 'immer';
const { produce } = immer;

export const ACTIONS = {
    ADD_ROOM: 'ADD_ROOM',
};

export const addRoom = produce((draft, id) => {
    draft[id] = {
        players: [],
    };
});
