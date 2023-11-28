import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";



export default function Signup() {
    const { signUp } = useContext(AppContext);
    const navigate = useNavigate();
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        //Alternativa all'utilizzo dello stato
        const {username, email, password} = Object.fromEntries(
            new FormData(event.currentTarget)
        )
        let { error } = await signUp({
            email,  //Se nome proprietà e nome valore coincidono si può evitare di fare email: email ecc.
            password,
            options: {
                data: {
                    username
                }
            }
        })
        if (error) {
            alert(error.error_description || error.message)
        } else {
            navigate('/account');
        }
    }

    return (
        <>
            <div style={{ "height": "70vh" }} className="d-flex flex-column align-items-center">
                <div className="form-signin h-100 w-50 mx-auto d-flex align-items-center justify-content-center">
                    <form onSubmit={handleRegister}>
                        <h1 className="h3 mb-3 fw-normal">Sign up</h1>
                        {/* <div className="container-fluid p-0">
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
                        </div> */}
                        <div className="form-floating pt-3">
                            <input 
                            type="text" 
                            className="form-control" 
                            id="username" 
                            name="username"
                            placeholder="username" 
                            // onChange={() => setUsername(e.target.value)}
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating pt-3">
                            <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email"
                            placeholder="name@example.com" 
                            // onChange={() => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating pt-3">
                            <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="password"
                            placeholder="Password" 
                            // onChange={() => setPassword(e.target.value)}
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Sign in</button>
                    </form>
                </div>
                <p style={{ marginTop: "-180px" }}><Link to={"/login"}>Already have an account? Please click here to login.</Link></p>
            </div>
        </>
    )
}