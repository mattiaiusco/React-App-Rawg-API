export default function Login() {
    return (
        <div className="container">
            <div style={{ "height": "70vh" }} className="row justify-content-center align-items-center">
                <div id="loginEmail" className="col-6">
                    <div style={{ "width": "70%" }} className="form-signin mx-auto mb-5">
                        <form>
                            <h1 className="mb-3">Login</h1>
                            <div className="form-floating pb-3">
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating pb-3">
                                <input type="password" className="form-control" id="password" placeholder="Password" autoComplete="on" />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
                <div id="loginOAuth" className="col-6">
                    <div style={{ "width": "70%" }} className="form-signin mx-auto d-flex justify-content-center align-items-center">
                        <form className="d-flex justify-content-center align-items-center">
                            <h3 className="pe-4 m-0">Social Login</h3>
                            <div className="form-floating">
                                <button className="btn"><i className="fa-brands fa-google fa-2x text-primary"></i></button>
                            </div>
                            <div className="form-floating">
                                <button className="btn"><i className="fa-brands fa-discord fa-2x text-primary"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}