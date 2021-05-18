import React from 'react';
import { ListLoader } from '../components/';
import { Link } from 'react-router-dom';
import helper from '../helper';
import PropTypes from 'prop-types';

export const DisplayListCard = ({id, snippet}) => {

    const [ isLoaded, setIsLoaded ] = React.useState(false);

    React.useEffect(() => {
        const img = new Image();
        img.src = snippet.thumbnails.medium.url;

        img.onload = () => {
            setIsLoaded(true);
        };
    });

    return isLoaded 
    ? (
        <div className="item" key={id}>
            <div className="item__screen">
                <img src={snippet.thumbnails.medium.url} alt="video-screen"/>
            </div>
            <div className="item__info">
                <Link className="item__link-title" to={`/video/${id}`}>
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
    : <ListLoader key={id}/>
}

DisplayListCard.propTypes = {
    id: PropTypes.string,
    snippet: PropTypes.object
}