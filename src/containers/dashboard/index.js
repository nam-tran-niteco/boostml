import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import React from 'react';

import { fetchImages, searchImages } from '../../reducers/data';
import Loading from '../../components/loading';

import './Dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchImages();
    }

    handleChange(event) {
        const searchTerm = event.target.value;
        if (searchTerm) {
            this.props.searchImages(searchTerm);
        } else {
            this.props.fetchImages();
        }
    }
    }

    render() {
        return (
            <div className="Dashboard">
                {console.log(this.props.data)}
                <div className="search-bar">
                    <DebounceInput placeholder="Search ..." minLength={0} debounceTimeout={300} onChange={this.handleChange} />
                </div>
                {this.props.data.loading
                    ? <Loading />
                    : <div className="row">
                        {this.props.data.hits?.map((image) => {
                            return (
                                <div className="col-3" key={image.id}>
                                    <Link to={`/detail/${image.id}`}>
                                        <button className="favorite" onClick={(e) => this.handleClick(image.id, e)}></button>
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
    data: state.data
})

const mapDispatchToProps = {
    fetchImages,
    searchImages
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
