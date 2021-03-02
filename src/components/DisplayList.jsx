import PropTypes from 'prop-types';

const DisplayList = ({items}) => {
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
                                <a href={`https://www.youtube.com/watch?v=${id.videoId}`} target="_blank" rel="noreferrer">
                                    <div className="item__title">
                                        {snippet.title.replace(/&quot;/g, '"')}
                                    </div>
                                </a>
                                <div className="item__descr">
                                    {snippet.description.replace(/&quot;/g, '"')}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

DisplayList.propTypes = {
    items: PropTypes.arrayOf( PropTypes.object )
}

export default DisplayList;