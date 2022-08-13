import React, {useState} from 'react';
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth'
import {VStack, Heading,Icon, useTheme} from 'native-base'
import {Envelope,Key } from 'phosphor-react-native'

import Logo from '../../assets/logo_primary.svg'
import { Input } from '../../componenents/Input';
import { Button } from '../../componenents/Button';


function Signin(){


    const [isLoading, setIsLoadin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();


    function handleSigin(){
       if(!email || !password){
        return Alert.alert('Entrar', 'Informe email e senha.');
       }
      
       setIsLoadin(true)

       auth().signInWithEmailAndPassword(email,password)
       .catch((erro) => {
            console.log(erro);
            setIsLoadin(false);

            if(erro.code === 'auth/invalid-email'){
                   return Alert.alert('Entrar', 'E-mail invalido.') 
            }

            if(erro.code === 'auth/wrong-password'){
                return Alert.alert('Entrar','E-mail ou senha inváila.') 
            }

            if(erro.code === 'auth/user-not-found'){
                return Alert.alert('Entrar','E-mail ou senha inváila.') 
            }

            return Alert.alert('Entra', 'Não foi possivel acessar')
            

        })

   }


    const { colors} = useTheme();

    return(
        
        <VStack flex={1} alignItems="center" bg="gray.600" px=
        {8} pt={24}>
        <Logo/>
        <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>     Acesse sua conta</Heading>
        
        <Input placeholder="Email"
        mb={4} 
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4}/>}
        onChangeText={setEmail}
        />
        <Input placeholder="Senha"
        mb={8} 
        InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4}/>}
        secureTextEntry
        onChangeText={setPassword}
         />
         <Button title="Entrar"
          w="full"
          onPress={handleSigin}
          isLoading={isLoading}
          />
     
        </VStack>
        
    )
}

export default Signin;
