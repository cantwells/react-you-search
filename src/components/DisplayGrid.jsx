import PropTypes from 'prop-types'

const DisplayGrid = ({ items }) => {
    return (
        <div className="result__clips-grid">
            {
                items.map( ({id, snippet}) =>  {
                    return(
                        <div className="item" key={id.videoId}>
                            <div className="item__screen">
                                <img src={snippet.thumbnails.medium.url} alt="video-screen"/>
                            </div>
                            <a href={`https://www.youtube.com/watch?v=${id.videoId}`} target="_blank" rel="noreferrer">
                                <div className="item__title trims" title={snippet.title.replace(/&quot;/g, '"')}>
                                    {snippet.title.replace(/&quot;/g, '"')}
                                </div>
                            </a> 
                            <div className="item__descr trim">
                                {snippet.description.replace(/&quot;/g, '"')}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

DisplayGrid.propTypes = {
    items: PropTypes.arrayOf( PropTypes.object )
}

export default DisplayGrid;