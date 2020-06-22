import React from 'react';

import './Loading.css';
import LoadingLogo from '../../icons/reload.png';

class Loading extends React.Component {
    render() {
        return (
            <div className="Loading">
                <img src={LoadingLogo} className="Loading-logo" alt="Loading Logo" />
            </div>
        );
    }
}

export default Loading;
