import ContentLoader from "react-content-loader";

const GridLoader = () => (
    <ContentLoader 
    speed={2}
    width={245}
    height={220}
    backgroundColor="#e6e6e6"
    foregroundColor="#ecebeb"
    >
    <rect x="0" y="0" rx="0" ry="0" width="245" height="138" /> 
    <rect x="0" y="147" rx="0" ry="0" width="245" height="32" /> 
    <rect x="0" y="186" rx="0" ry="0" width="245" height="16" />
    </ContentLoader>
)

export default GridLoader;