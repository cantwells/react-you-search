import React from 'react';
import PropTypes from 'prop-types';
import helper from '../helper';
import { ListLoader } from '.';

const DisplayList = React.memo( ({items, isLoaded}) => {
    return (
        <div className="result__clips-list">
            {
                items.map( ({id, snippet}) =>  {
                    if( !isLoaded ) return <ListLoader key={id.videoId}/>
                    return(
                        <div className="item" key={id.videoId}>
                            <div className="item__screen">
                                <img src={snippet.thumbnails.medium.url} alt="video-screen"/>
                            </div>
                            <div className="item__info">
                                <a className="item__link-title" href={`https://www.youtube.com/watch?v=${id.videoId}`} target="_blank" rel="noreferrer">
                                    <div className="item__title">
                                        {/* {snippet.title.replace(/&quot;/g, '"')} */}
                                        { helper.asynizer(snippet.title) }
                                    </div>
                                </a>
                                <a className="item__link-channel" href={`https://www.youtube.com/channel/${snippet.channelId}`} target="_blank" rel="noreferrer">
                                    <div className="item__channel">
                                        {/* {snippet.channelTitle.replace(/&quot;/g, '"')} */}
                                        { helper.asynizer(snippet.channelTitle)}
                                    </div>
                                </a>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
});

DisplayList.propTypes = {
    items: PropTypes.arrayOf( PropTypes.object )
}

export default DisplayList;