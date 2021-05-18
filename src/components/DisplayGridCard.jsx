import React from 'react';
import helper from '../helper';
import { Link } from 'react-router-dom';
import GridLoader from '../components/GridLoader';
import PropTypes from 'prop-types';

export const DisplayGridCard = ( {id, snippet} ) => {
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
            <Link className="item__link-title" to={`/video/${id}`}>
                <div className="item__title trims" title={snippet.title.replace(/&quot;/g, '"')}>
                    {helper.asynizer(snippet.title)}
                </div>
            </Link>
            <a className="item__link-channel" href={`https://www.youtube.com/channel/${snippet.channelId}`} target="_blank" rel="noreferrer">
                <div className="item__channel trim">
                    {helper.asynizer(snippet.channelTitle)}
                </div>
            </a>
        </div>
    )
    : <GridLoader key={id}/>

}

DisplayGridCard.propTypes = {
    id: PropTypes.string,
    snippet: PropTypes.object
}