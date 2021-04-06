import PropTypes from 'prop-types';
import React from 'react';
import { GridLoader } from '.';
import helper from '../helper';

const DisplayGrid = React.memo( ({ items, isLoaded }) => {
    return (
        <div className="result__clips-grid">
            {
                items.map( ({id, snippet}) =>  {
                    if( !isLoaded ) return <GridLoader/>
                    return(
                        <div className="item" key={id.videoId}>
                            <div className="item__screen">
                                <img src={snippet.thumbnails.medium.url} alt="video-screen"/>
                            </div>
                            <a className="item__link-title" href={`https://www.youtube.com/watch?v=${id.videoId}`} target="_blank" rel="noreferrer">
                                <div className="item__title trims" title={snippet.title.replace(/&quot;/g, '"')}>
                                    {/* {snippet.title.replace(/&quot;/g, '"')} */}
                                    {helper.asynizer(snippet.title)}
                                </div>
                            </a>
                            <a className="item__link-channel" href={`https://www.youtube.com/channel/${snippet.channelId}`} target="_blank" rel="noreferrer">
                                <div className="item__channel trim">
                                    {/* {snippet.channelTitle.replace(/&quot;/g, '"')} */}
                                    {helper.asynizer(snippet.channelTitle)}
                                </div>
                            </a>
                        </div>
                    )
                    
                })
            }
        </div>
    );
});

DisplayGrid.propTypes = {
    items: PropTypes.arrayOf( PropTypes.object )
}

export default DisplayGrid;