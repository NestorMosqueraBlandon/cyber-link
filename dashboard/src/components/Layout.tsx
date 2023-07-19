import TopBar from "./Layout/TopBar";
import Header from "./Layout/Header";

const Layout = ({children}: any) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default Layout;