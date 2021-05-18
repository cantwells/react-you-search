import React from 'react';
import PropTypes from 'prop-types';
import { DisplayListCard } from './DisplayListCard';

const DisplayList = React.memo( ({items}) => {
    return (
        <div className="result__clips-list">
            {
                items.map( ({id, snippet}) => <DisplayListCard key={id.videoId} id={id.videoId} snippet={snippet} /> )
            }
        </div>
    )
});

DisplayList.propTypes = {
    items: PropTypes.arrayOf( PropTypes.object ),
}

export default DisplayList;