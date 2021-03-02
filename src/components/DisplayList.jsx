import React from 'react';
import PropTypes from 'prop-types';

const DisplayList = React.memo( ({items}) => {
    return (
        <div className="result__clips-list">
            {
                items.map( ({id, snippet}) =>  {
                    return(
                        <div className="item" key={id.videoId}>
                            <div className="item__screen">
                                <img src={snippet.thumbnails.medium.url} alt="video-screen"/>
                            </div>
                            <div className="item__info">
                                <a className="item__link-title" href={`https://www.youtube.com/watch?v=${id.videoId}`} target="_blank" rel="noreferrer">
                                    <div className="item__title">
                                        {snippet.title.replace(/&quot;/g, '"')}
                                    </div>
                                </a>
                                <a className="item__link-channel" href={`https://www.youtube.com/channel/${snippet.channelId}`} target="_blank" rel="noreferrer">
                                    ya
                                    <div className="item__channel">
                                        {snippet.channelTitle.replace(/&quot;/g, '"')}
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