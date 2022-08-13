import React, { useState, useEffect } from 'react';
import  { NavigationContainer } from '@react-navigation/native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'


import { Loading } from '../componenents/Loading';
import Signin from '../screens/Signin/Signin'

import { AppRoutes } from './app.routes'


export function Routes(){

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();


    useEffect(() =>{
        const subscriber = auth().onAuthStateChanged(response => {
            setUser(response)
            setLoading(false)
        });

        return subscriber;

    }, [])


    if(loading){
        return <Loading/>
    }

    return(
        <NavigationContainer>
            {user ? <AppRoutes/> : <Signin/>}
        </NavigationContainer>
    )
}






