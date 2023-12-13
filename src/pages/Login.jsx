import { useNavigate } from "react-router-dom";
import supabase from "../supabase/database";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const loginForm = event.currentTarget;
        const { email, password } = Object.fromEntries(
            new FormData(loginForm)
        )
        try {
            let { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error) {
                alert(error.error_description || error.message)
            } else {
                loginForm.reset();
                navigate('/account');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function signInWithDiscord() {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'discord',
            })
            if (error) {
                alert(error.error_description || error.message)
            } else {
                navigate('/settings');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div style={{ "height": "70vh" }} className="row justify-content-center align-items-center">
                <div id="loginEmail" className="col-6">
                    <div style={{ "width": "70%" }} className="form-signin mx-auto mb-5">
                        <form onSubmit={handleLogin}>
                            <h1 className="mb-3">Login</h1>
                            <div className="form-floating pb-3">
                                <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating pb-3">
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button style={{backgroundColor: "#3ecf8e", fontWeight: "600"}} className="btn btn-custom w-100 py-2" type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
                <div id="loginOAuth" className="col-6">
                    <div style={{ "width": "70%" }} className="form-signin mx-auto d-flex justify-content-center align-items-center">
                        <form className="d-flex justify-content-center align-items-center">
                            <h3 className="pe-4 m-0">Social Login</h3>
                            {/* <div className="form-floating">
                                <button className="btn"><i style={{color :"#3ecf8e"}} className="fa-brands fa-google fa-2x"></i></button>
                            </div> */}
                            <div className="form-floating">
                                <button onClick={signInWithDiscord} className="btn"><i style={{color :"#3ecf8e"}} className="fa-brands fa-discord fa-2x"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}