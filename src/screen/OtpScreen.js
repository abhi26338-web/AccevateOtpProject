import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {verifyOtp} from '../redux/authSlice';
import * as Keychain from 'react-native-keychain';
import colors from '../utils/colors';

export default function Otp({navigation}) {
  const {userId, loading, error} = useSelector(s => s.auth);
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [focusIndex, setFocusIndex] = useState(0);
  const inputRef = useRef([]);

  const onChange = async (v, i) => {
    if (isNaN(v)) return;

    const arr = [...otp];
    arr[i] = v;
    setOtp(arr);

    if (v && i < 5) inputRef.current[i + 1].focus();

    const final = arr.join('');
    if (final.length === 6) {

      const res = await dispatch(
        verifyOtp({userid: String(userId), otp: final}),
      );

      if (res.payload?.status) {
        await Keychain.setGenericPassword('auth', res.payload.token);
        navigation.replace('HomeStack');
      }
    }
  };

  return (
    <View style={styles.root}>

      {/* Top Color Section */}
      <View style={styles.topBg} />

      {/* White Card */}
      <View style={styles.card}>

        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.sub}>Enter the 6-digit code sent to you</Text>
        <Text style={styles.demo}>Demo OTP: 123456</Text>

        <View style={styles.row}>
          {otp.map((v, i) => (
            <TextInput
              key={i}
              ref={r => (inputRef.current[i] = r)}
              value={v}
              style={[
                styles.box,
                focusIndex === i && styles.boxFocus,
                v && styles.boxFilled,
              ]}
              maxLength={1}
              keyboardType="number-pad"
              onFocus={() => setFocusIndex(i)}
              onChangeText={t => onChange(t, i)}
              autoFocus={i === 0}
            />
          ))}
        </View>

        {loading && <ActivityIndicator size="large" color={colors.primary} />}

        {error && <Text style={styles.err}>{error}</Text>}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f2f6ff',
  },

  topBg: {
    height: '40%',
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  card: {
    position: 'absolute',
    top: '25%',
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
  },

  sub: {
    color: '#666',
    marginTop: 6,
  },

  demo: {
    marginTop: 6,
    color: colors.secondary,
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    marginVertical: 25,
  },

  box: {
    width: 46,
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 6,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#f8f9ff',
  },

  boxFocus: {
    borderColor: colors.primary,
  },

  boxFilled: {
    backgroundColor: '#eef3ff',
    borderColor: colors.primary,
  },

  err: {
    color: 'red',
    marginTop: 10,
  },
});
