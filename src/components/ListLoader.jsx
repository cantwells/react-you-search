import ContentLoader from "react-content-loader";

const ListLoader = () => (
    <ContentLoader 
        speed={2}
        // width={1000}
        style={{ "width": "90%", "marginBottom": "10px" }}
        backgroundColor="#e6e6e6"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="0" ry="0" width="200" height="145" /> 
        <rect x="220" y="0" rx="0" ry="0" width="506" height="145" />
    </ContentLoader>
)

export default ListLoader;