export default function AppFooter() {
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top" data-bs-theme="dark">
            <div className="col-md-4 d-flex align-items-center">
                <a href="/" className="mb-3 me-2 mb-md-0 text-decoration-none lh-1"></a>
                <span className="mb-3 mb-md-0 ">© 2023 Company, Inc</span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3"><a className="" href="#">Home</a></li>
                <li className="ms-3"><a className="" href="#">Games</a></li>
                <li className="ms-3"><a className="" href="#">Contact us</a></li>
            </ul>
        </footer>
    )
}