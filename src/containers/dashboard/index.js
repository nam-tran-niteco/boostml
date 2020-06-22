import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import React from 'react';

import { fetchImages, searchImages } from '../../reducers/data';
import { addFavoriteImage, removeFavoriteImage, loadFavoriteImages } from '../../reducers/favorite';
import Loading from '../../components/loading';

import './Dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
    }

    componentDidMount() {
        this.props.fetchImages();
        this.props.loadFavoriteImages();
    }

    handleChange(event) {
        const searchTerm = event.target.value;
        if (searchTerm) {
            this.props.searchImages(searchTerm);
        } else {
            this.props.fetchImages();
        }
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
            <div className="Dashboard">
                <div className="favorite-bar">
                    <Link to="/favorite" className="btn">
                        Favorite Images
                    </Link>
                </div>
                <div className="search-bar">
                    <DebounceInput placeholder="Search ..." minLength={0} debounceTimeout={300} onChange={this.handleChange} />
                </div>
                {this.props.data.loading
                    ? <Loading />
                    : <div className="row">
                        {this.props.data.hits?.map((image) => {
                            const isFavorite = this.isFavorite(image);
                            return (
                                <div className="col-3" key={image.id}>
                                    <Link to={`/detail/${image.id}`}>
                                        <button className={`btn favorite ${isFavorite ? 'active' : ''}`} onClick={(e) => isFavorite ? this.removeFavorite(image, e) : this.addFavorite(image, e)}></button>
                                        <img src={image.previewURL} alt={image.user} />
                                    </Link>
                                </div>
                            )
                        })
                        }
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data,
    favorite: state.favorite
})

const mapDispatchToProps = {
    fetchImages,
    searchImages,
    addFavoriteImage,
    removeFavoriteImage,
    loadFavoriteImages
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
