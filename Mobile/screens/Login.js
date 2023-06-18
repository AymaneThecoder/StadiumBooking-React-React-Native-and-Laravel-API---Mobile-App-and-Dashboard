import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Formik, isPromise } from "formik";
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import {
  StyledContainer,
  InnerContainer,
  PageLogo, ExtraView, ExtraText, TextLink, TextLinkContent,
  PageTitle, MsgBox, Line,
  SubTitle, Colors, StyledButton, ButtonText,
  StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, RightIcon
} from './../components/style';

const { brand, darkLight, primary } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:8000/api/login',
        values
      );
      const { token, username } = response.data; // Retrieve the name from response.data
      console.log('Received token:', token);
      console.log('Received name:', username);
      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('username', username);
      console.log('Stored token in SecureStore');
      Alert.alert('Success', 'Login successful!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Nome', { token, username }); // Pass the token and name as route parameters
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo resizeMode="cover" source={require('./../assets/stadium_logo.png')} />
        <PageTitle> Wehelp</PageTitle>
        <SubTitle>AccountLogin</SubTitle>
        <Formik initialValues={{ email: '', password: '' }}
          onSubmit={(values) => handleLogin(values)}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Email Address"
                icon="mail"
                placeholder="xxxxxxxx@gmail.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              <MyTextInput
                label="Password"
                icon="lock"
                placeholder="* * * * *  *  *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MsgBox>...</MsgBox>
              <StyledButton onPress={handleSubmit}>
                <ButtonText>
                  Login
                </ButtonText>
              </StyledButton>

              <ExtraView>
                <ExtraText>Don't have an account already?</ExtraText>
                <TextLink onPress={() => navigation.navigate("Signup")}>
                  <TextLinkContent>Sign up</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color="#418415" />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
