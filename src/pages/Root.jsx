import AppNavbar from "../components/AppNavbar"
import AppFooter from "../components/AppFooter"
import AppLayout from "../layouts/AppLayout"


export default function Root() {
    return (
        <div className="container">
            <AppNavbar />
            
            <AppLayout />
            
            <AppFooter />
        </div>
    )
}