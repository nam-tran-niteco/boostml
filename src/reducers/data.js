import axios from 'axios';
import actions from './actions'

const urlPrefix = 'https://pixabay.com/api/?key=16837556-c2ce5f9d56364d11818c86ab3';

const { FETCH_DATA } = actions

export const updateData = payload => ({
    type: FETCH_DATA,
    payload
});

export const fetchImages = () => {
    return async dispatch => {
        dispatch(updateData({
            loading: true
        }));
        const images = await axios({
            url: `${urlPrefix}`
        });

        if (images) {
            dispatch(updateData({
                loading: false,
                ...images.data
            }));
        }
    }
}

export const fetchImage = (imageId) => {
    return async dispatch => {
        dispatch(updateData({
            loading: true
        }));
        const image = await axios({
            url: `${urlPrefix}&id=${imageId}`
        });

        if (image) {
            dispatch(updateData({
                loading: false,
                ...image.data
            }));
        }
    }
}

export const searchImages = (searchTerm) => {
    return async dispatch => {
        dispatch(updateData({
            loading: true
        }));
        const image = await axios({
            url: `${urlPrefix}&q=${searchTerm}`
        });

        if (image) {
            dispatch(updateData({
                loading: false,
                ...image.data
            }));
        }
    }
}

const ACTION_HANDLERS = {
    [FETCH_DATA]: (state, action) => {
        return {
            ...state,
            ...action.payload
        }
    }
}

const initialState = {
    loading: true
}

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
