import PropTypes from 'prop-types';
import React from 'react';
import { DisplayGridCard } from './DisplayGridCard';

const DisplayGrid = React.memo( ({ items }) => {
    
    return (
        <div className="result__clips-grid">
            {
                items.map( ({id, snippet}) => <DisplayGridCard key={id.videoId} id={id.videoId} snippet={snippet} />)
            }
        </div>
    );
});

DisplayGrid.propTypes = {
    items: PropTypes.arrayOf( PropTypes.object )
}

export default DisplayGrid;