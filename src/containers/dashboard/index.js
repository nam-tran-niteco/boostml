import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { fetchImages } from '../../reducers/data';

import './Dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchImages();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div className="Dashboard">
                {console.log(this.props.data)}
                <div className="seach-bar">
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </div>
                {this.props}
                <div className="row">
                    {this.props.images?.hits.map((image) => {
                        return (
                            <div className="col-3" key={image.id}>
                                <Link to={`/detail/${image.id}`}>
                                    <img src={image.previewURL} alt={image.user} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = {
    fetchImages
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
