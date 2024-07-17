const initialState = {
    movie: null
};

const MovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET":
            return {
                movie: action.payload
            };
        default:
            return {
                ...state
            };
    }
};

export default MovieReducer;