import React, { createContext, useState, useContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../FirebaseConfig";
import { useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const getUser = (user) => {
    const {displayName, email, photoURL} = user;
    return { name: displayName, email: email, photo: photoURL }
}

const Auth = () => {
    const [user, setUser] = useState(null);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then(response => {
            const signedInUser = getUser(response.user)
            setUser(signedInUser);
            return response.user;
        })
        .catch(error => {
            setUser(null);
            return error.message;
        });
    }

    const signOutFromGoogle = () => {
        return firebase.auth().signOut()
        .then(function() {
            setUser(null);
            return true;
          })
        .catch(function(error) {
            console.log(error.message);
            return false;
          });
    }

    useEffect( () => {
        firebase.auth().onAuthStateChanged(function(usr) {
            if (usr) {
              const currUser = getUser(usr);
              setUser(currUser);
            } else {
              // No user is signed in.
            }
          });
    }, [])

    return {
        user,
        signInWithGoogle,
        signOutFromGoogle,
    }
}
export default Auth;