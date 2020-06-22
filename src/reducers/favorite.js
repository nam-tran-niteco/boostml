import actions from './actions'

const { FAVORITE } = actions

export const updateData = payload => ({
    type: FAVORITE,
    payload
});

export const loadFavoriteImages = () => {
    return (dispatch, getState) => {
        const state = getState();
        let favoriteList = [...state.favorite.list];

        const loadedImages = JSON.parse(localStorage.getItem('favorite'));
        if (loadedImages && loadedImages.length > 0) {
            favoriteList = loadedImages;
        }

        dispatch(updateData({
            list: [...favoriteList]
        }));
    }
}

export const addFavoriteImage = (image) => {
    return (dispatch, getState) => {
        const state = getState();
        const favoriteList = [...state.favorite.list];

        favoriteList.push(image);
        localStorage.setItem('favorite', JSON.stringify(favoriteList));

        dispatch(updateData({
            list: [...favoriteList]
        }));
    }
}

export const removeFavoriteImage = (image) => {
    return (dispatch, getState) => {
        const state = getState();
        let favoriteList = [...state.favorite.list];

        favoriteList = favoriteList.filter(item => item.id !== image.id);
        localStorage.setItem('favorite', JSON.stringify(favoriteList));

        dispatch(updateData({
            list: [...favoriteList]
        }));
    }
}

const ACTION_HANDLERS = {
    [FAVORITE]: (state, action) => {
        return {
            ...state,
            ...action.payload
        }
    }
}

const initialState = {
    list: []
}

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
