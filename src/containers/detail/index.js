import { connect } from 'react-redux';
import React from 'react';

import { fetchImage } from '../../reducers/data';

import './Detail.css';
import DownloadLogo from '../../icons/download.png';
import LikeLogo from '../../icons/like.png';
import ViewLogo from '../../icons/eye.png';
import { Link } from 'react-router-dom';
import Loading from '../../components/loading';

class Detail extends React.Component {
    componentDidMount() {
        const imageId = this.props.match.params.id;
        if (imageId) {
            this.props.fetchImage(imageId);
        }
    }

    render() {
        return (
            <div className="Detail">
                {this.props.data.loading
                    ? <Loading />
                    : this.props.data.hits?.map(imageDetail => {
                        return (
                            <div className="Detail-image" key={imageDetail.id}>
                                <img src={imageDetail.largeImageURL} alt={imageDetail.user} />
                                <div className="Detail-image-actions">
                                    <div className="back">
                                        <Link to='/'>
                                            Back to dashboard
                                        </Link>
                                    </div>
                                    <div className="Detail-image-info">
                                        <div className="Detail-image-info-item">
                                            <img src={ViewLogo} alt="View" />
                                            <span>{imageDetail.views}</span>
                                        </div>
                                        <div className="Detail-image-info-item">
                                            <img src={DownloadLogo} alt="View" />
                                            <span>{imageDetail.downloads}</span>
                                        </div>
                                        <div className="Detail-image-info-item">
                                            <img src={LikeLogo} alt="View" />
                                            <span>{imageDetail.favorites}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = {
    fetchImage
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
