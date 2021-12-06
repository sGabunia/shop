import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import colors from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  signUp,
  signIn,
  selectLoadingStatus,
  selectErrorMessage,
} from '../../features/user/authSlice';
import CustomInput from '../../components/ui/CustomInput';

const AuthScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectLoadingStatus);
  const error = useSelector(selectErrorMessage);

  const authHandler = () => {
    dispatch(signIn({email, password}));
  };

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={50}>
      <View style={styles.authWrapper}>
        <ScrollView>
          <CustomInput
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Email"
            value={email}
            handleInputChange={handleEmailChange}
          />
          <CustomInput
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            handleInputChange={handlePasswordChange}
          />
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <Button title="Log in" color={colors.accent} onPress={authHandler} />
        </View>
        <View style={styles.buttonWrapper}>
          {loadingStatus ? (
            <ActivityIndicator />
          ) : (
            <Button
              title="Or Create account"
              color="#000"
              onPress={() => navigation.navigate('Create Account')}
            />
          )}
        </View>
        {error && <Text>{error}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {},
  authWrapper: {
    margin: 20,
  },

  buttonWrapper: {
    marginVertical: 8,
  },
});
