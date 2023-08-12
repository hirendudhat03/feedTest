import React, {useState} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {emailValidator} from '../helper/emailValidator';
import {passwordValidator} from '../helper/passwordValidator';
import Loader from '../components/Loader';
import {LoginRequest} from '../redux/Actions/LoginAction';
import {useDispatch, useSelector} from 'react-redux';
import {LoaderAction} from '../redux/Actions/LoaderAction';
import {navConst} from '../core/navConst';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const loader = useSelector(state => state.loader.loader);
  const dispatch = useDispatch();

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    dispatch(LoaderAction(true));
    dispatch(LoginRequest(email.value, password.value, navigation));
  };

  return (
    <Background>
      <Loader visible={loader} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            routes: [{name: navConst.Dashboard}],
          })
        }>
        Don't want to login?
      </Button>
    </Background>
  );
};
export default LoginScreen;
