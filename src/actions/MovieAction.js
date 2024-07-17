import { type } from "@testing-library/user-event/dist/type";

export const ClickedMovie = (movie) => {
    return {
        type: "GET",
        payload: movie
    };
};