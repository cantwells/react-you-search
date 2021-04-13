import React from 'react';
import PropTypes from 'prop-types';
import helper from '../helper';
import { ListLoader } from '.';
import { Link } from 'react-router-dom';

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
                                <Link className="item__link-title" to={`/video/${id.videoId}`}>
                                    <div className="item__title">
                                        { helper.asynizer(snippet.title) }
                                    </div>
                                </Link>
                                <a className="item__link-channel" href={`https://www.youtube.com/channel/${snippet.channelId}`} target="_blank" rel="noreferrer">
                                    <div className="item__channel">
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