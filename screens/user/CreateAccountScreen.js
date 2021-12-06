import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {selectUserId, signUp} from '../../features/user/authSlice';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomInput from '../../components/ui/CustomInput';
import colors from '../../constants/colors';

const CreateAccountScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterAccount = () => {
    dispatch(signUp({email, password}));
    setEmail('');
    setPassword('');
  };

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  return (
    <KeyboardAvoidingView style={styles.wrapper}>
      {!userId && (
        <>
          <View>
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
          </View>
          <View>
            <Button
              title="Create Acoount"
              color={colors.accent}
              onPress={handleRegisterAccount}
            />
          </View>
        </>
      )}

      {userId && (
        <View style={styles.successWrapper}>
          <MaterialIcons
            name="check-circle-outline"
            color={colors.accent}
            size={50}
          />
          <Text style={styles.success}>You have created account</Text>
        </View>
      )}
      <View style={styles.backWrapper}>
        <Button
          title="<-- Go back to log in"
          color={colors.primary}
          onPress={() => navigation.goBack()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  wrapper: {
    margin: 20,
  },
  backWrapper: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successWrapper: {
    alignItems: 'center',
  },
  success: {
    fontSize: 30,
    color: colors.accent,
  },
});
