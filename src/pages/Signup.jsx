import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import supabase from "../supabase/database";

const schemaValidation = Yup.object({
    username: Yup.string()
        .min(6, 'Deve contenere almeno 6 caratteri 😡')
        .required('Required'),
    email: Yup.string()
        .email('Inserisci una email valida 🥵')
        .required('Required'),
    password: Yup.string()
        .min(4, 'Deve contenere almeno 4 caratteri 😡')
        .required('Password is required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
});

export default function Signup() {
    const { signUp } = useContext(AppContext);
    const navigate = useNavigate();
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    //!Gestione classica form di react senza formik
    // const handleRegister = async (event) => {
    //     event.preventDefault();
    //     //Alternativa all'utilizzo dello stato
    //     const { username, email, password } = Object.fromEntries(
    //         new FormData(event.currentTarget)
    //     )
    //     let { error } = await signUp({
    //         email,  //Se nome proprietà e nome valore coincidono si può evitare di fare email: email ecc.
    //         password,
    //         options: {
    //             data: {
    //                 username
    //             }
    //         }
    //     })
    //     if (error) {
    //         alert(error.error_description || error.message)
    //     } else {
    //         navigate('/account');
    //     }
    // }

    const handleRegisterFormik = async (values) => {
        try {
            const { error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        username: values.username,
                    },
                },
            });
            if (error) {
                alert(error.error_description || error.message);
            } else {
                navigate('/settings');
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div style={{ "height": "70vh" }} className="d-flex flex-column align-items-center">
                <div className="form-signin h-100 w-100 mx-auto d-flex align-items-center justify-content-center">
                    {/* <form className="w-50" onSubmit={handleRegister}>
                        <h1 className="h3 mb-3 fw-normal">Sign up</h1>
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
                        <div className="form-floating pt-3">
                            <input
                                type="confirm_password"
                                className="form-control"
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="Confirm password"
                            // onChange={() => setPassword(e.target.value)}
                            />
                            <label htmlFor="floatingPassword">Confirm password</label>
                        </div>
                        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Sign in</button>
                    </form> */}
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            confirm_password: ''
                        }}
                        validationSchema={schemaValidation}
                        onSubmit={values => {
                            handleRegisterFormik(values)
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="d-flex flex-column w-50">
                                <label htmlFor="username">Username</label>
                                <Field className="form-control" name="username" type="text" />
                                {errors.username && touched.username ? (
                                    <p className="text-danger">{errors.username}</p>
                                ) : null}
                                <label htmlFor="username">Email</label>
                                <Field className="form-control" name="email" type="email" />
                                {errors.email && touched.email ? <p className="text-danger">{errors.email}</p> : null}
                                <label htmlFor="username">Password</label>
                                <Field className="form-control" name="password" type="password" />
                                {errors.password && touched.password ? <p className="text-danger">{errors.password}</p> : null}
                                <label htmlFor="username">Confirm password</label>
                                <Field className="form-control" name="confirm_password" type="password" />
                                {errors.confirm_password && touched.confirm_password ? <p className="text-danger">{errors.confirm_password}</p> : null}
                                <button style={{backgroundColor: "#3ecf8e", fontWeight: "600"}} className="btn btn-custom w-100 py-2 mt-3" type="submit">Sign up</button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <p><Link style={{color: "#3ecf8e"}} to={"/login"}>Already have an account? Please click here to login.</Link></p>
            </div>
        </>
    )
}