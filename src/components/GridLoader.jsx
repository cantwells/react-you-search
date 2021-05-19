import ContentLoader from "react-content-loader";

const GridLoader = () => (
    <ContentLoader 
        speed={2}
        className="item"
        backgroundColor="#e6e6e6"
        foregroundColor="#ecebeb"
        >
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="118" /> 
        <rect x="0" y="123" rx="0" ry="0" width="100%" height="32" /> 
    </ContentLoader>
)

export default GridLoader;