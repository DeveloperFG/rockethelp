import React from 'react';
import { Alert } from 'react-native';
import { useState } from 'react';
import { VStack, Heading,} from 'native-base';
import firestore from '@react-native-firebase/firestore'

import { useNavigation } from '@react-navigation/native'

import { Header } from '../../componenents/Header';
import { Input } from '../../componenents/Input';
import { Button } from '../../componenents/Button';

function Register() {
  const [ isLoading, setIsloading] = useState(false);
  const [ patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();


  function handleNewOrderRegister(){
   if(!patrimony || !description ) {
        return Alert.alert('Registrar', 'Preencha todos os campos.')
  } 

  setIsloading(true);

 
   firestore().collection('orders')
  .add({
    patrimony,
    description,
    status: 'open',
    created_at: firestore.FieldValue.serverTimestamp()
  })

  .then(() =>{
    Alert.alert('Solicitação', 'Solicitação resgistrada com sucesso.');
    navigation.goBack();
  })
  .catch((erro) =>{
    console.log(erro)
    setIsloading(false);
    return Alert.alert('Solicitação', 'Não foi possivel registrar o pedido');
  });

 }


  return (

    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Solicitação"/>

      <Input
      placeholder="Numero do patrimônio"
      mt={4}
      onChangeText={setPatrimony}

      />

      <Input
       placeholder="Descricão do problema"
       flex={1}
       mt={5}
       multiline
       textAlignVertical="top"
       onChangeText={setDescription}
       
      />

      <Button 
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}


export default Register;