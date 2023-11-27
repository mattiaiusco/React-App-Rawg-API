import { Link } from "react-router-dom"

export default function Signup() {
    return (
        <>
            <div style={{ "height": "70vh" }} className="d-flex flex-column align-items-center">
                <div className="form-signin h-100 w-50 mx-auto d-flex align-items-center justify-content-center">
                    <form>
                        <h1 className="h3 mb-3 fw-normal">Sign up</h1>
                        <div className="container-fluid p-0">
                            <div className="row">
                                <div className="col-6 form-floating">
                                    <input type="text" className="form-control" id="name" placeholder="Name" />
                                    <label style={{ paddingLeft: '25px' }} htmlFor="name">Name</label>
                                </div>
                                <div className="col-6 form-floating">
                                    <input type="text" className="form-control" id="surname" placeholder="Surname" />
                                    <label style={{ paddingLeft: '25px' }} htmlFor="surname">Surname</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-floating pt-3">
                            <input type="text" className="form-control" id="username" placeholder="username" />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating pt-3">
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating pt-3">
                            <input type="password" className="form-control" id="password" placeholder="Password" autoComplete="on" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Sign in</button>
                    </form>
                </div>
                <p style={{marginTop : "-180px"}}><Link to={"/login"}>Already have an account? Please click here to login.</Link></p>
            </div>
        </>
    )
}