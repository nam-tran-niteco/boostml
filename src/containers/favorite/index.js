import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { addFavoriteImage, removeFavoriteImage, loadFavoriteImages } from '../../reducers/favorite';
import './Favorite.css';

class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
    }

    componentDidMount() {
        this.props.loadFavoriteImages();
    }

    addFavorite(image, event) {
        event.preventDefault();
        this.props.addFavoriteImage(image);
    }

    removeFavorite(image, event) {
        event.preventDefault();
        this.props.removeFavoriteImage(image);
    }

    isFavorite(image) {
        const list = this.props.favorite.list;
        if (list && list.length > 0 && image) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === image.id) return true;
            }
        }
        return false;
    }

    render() {
        return (
            <div className="Favorite">
                <Link to="/" className="back">
                    Back to dashboard
                </Link>
                <div className="row">
                    {this.props.favorite.list?.map((image) => {
                        const isFavorite = this.isFavorite(image);
                        return (
                            <div className="col-3" key={image.id}>
                                <Link to={`/detail/${image.id}`}>
                                    <button className={`favorite ${isFavorite ? 'active' : ''}`} onClick={(e) => isFavorite ? this.removeFavorite(image, e) : this.addFavorite(image, e)}></button>
                                    <img src={image.previewURL} alt={image.user} />
                                </Link>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    favorite: state.favorite
})

const mapDispatchToProps = {
    addFavoriteImage,
    removeFavoriteImage,
    loadFavoriteImages
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
