import SignedInApp from './SignedInApp';

import {
    getAuth,
    sendEmailVerification,
    signOut } from "firebase/auth";

import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
    useSignInWithGoogle
} from 'react-firebase-hooks/auth';

import {useState} from "react";


const auth = getAuth();

const collectionName = "People-AuthenticationRequired"

function App(props) {
    const [user, userLoading, userError] = useAuthState(auth);
    function verifyEmail() {
        sendEmailVerification(user);
    }

    if (userLoading) {
        return <p>Checking...</p>;
    } else if (user) {
        return <div>
            <div className="displayName"> {user.displayName || user.email} </div>
            <div className = "signingButtons">
            <button className="signOutButton" type="button" onClick={() => signOut(auth)}>Sign out</button>
            {!user.emailVerified && <button className="verifyButton" type="button" onClick={verifyEmail}>Verify email</button>}
            </div>
            <SignedInApp {...props} user={user}/>
        </div>
    } else {
        return <>
            {userError && <p>Error App: {userError.message}</p>}
            <SignIn key="Sign In"/>
            <SignUp key="Sign Up"/>
        </>
    }
}

function SignIn() {
    const [
        signInWithEmailAndPassword,
        user1, loading1, error1
    ] = useSignInWithEmailAndPassword(auth);
    const [
        signInWithGoogle,
        user2, loading2, error2
    ] = useSignInWithGoogle(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (user1 || user2) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading1 || loading2) {
        return <p>Logging in…</p>
    }
    return <div className = "pageToSignIn">
        <h1> Already Have an Account? Sign In Here:</h1>
        {error1 && <p>"Error logging in: " {error1.message}</p>}
        {error2 && <p>"Error logging in: " {error2.message}</p>}
        <label htmlFor='email'>Email: </label>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>Password: </label>
        <input type="password" id='pw' value={pw}
               onChange={e=>setPw(e.target.value)}/>
        <br/>
        <button className="signInWithEmail" onClick={() =>signInWithEmailAndPassword(email, pw)}>
            Sign in
        </button>

        <hr/>
        <button className="signInWithGoogle" onClick={() => signInWithGoogle()}>
            Sign in with Google
        </button>
    </div>
}

function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div className="createTestUser">
        <h1 className="newUser"> New User? Sign Up Here: </h1>
        {error && <p>"Error signing up: " {error.message}</p>}
        <label htmlFor='email'>Email: </label>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>Password: </label>
        <input type="password" id='pw' value={pw}
               onChange={e=>setPw(e.target.value)}/>
        <br/>
        <button className="createTestUserButton" onClick={() =>
            createUserWithEmailAndPassword(email, pw)}>
            Create New User
        </button>

    </div>
}

export default App;