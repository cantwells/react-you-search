import ContentLoader from "react-content-loader";

const ListLoader = () => (
    <ContentLoader 
        speed={2}
        width={1000}
        height={220}
        backgroundColor="#e6e6e6"
        foregroundColor="#ecebeb"
    >
    <rect x="0" y="0" rx="0" ry="0" width="157" height="93" /> 
    <rect x="170" y="0" rx="0" ry="0" width="506" height="93" />
    </ContentLoader>
)

export default ListLoader;