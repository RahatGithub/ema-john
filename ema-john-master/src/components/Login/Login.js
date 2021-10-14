import React from 'react';
import Auth from './UseAuth';

const Login = () => {
    const auth = Auth();
    
    const handleSignIn = () => {
        auth.signInWithGoogle()
        .then(response => {
            window.location.pathname = '/review'
        })
    }

    const handleSignOut = () => {
        auth.signOutFromGoogle()
        .then(response => {
            window.location.pathname = '/'
        })
    }

    return (
        <div>
            <h1>Log in here...</h1>
            {
                auth.user ? 
                <button onClick={handleSignOut}>Sign out</button> 
                : 
                <button onClick={handleSignIn}>Sign in with Google</button>
            }

        </div>
    );
};

export default Login;