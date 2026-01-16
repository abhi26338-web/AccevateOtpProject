import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../redux/authSlice';
import { IMAGES } from '../assets/images';
import colors from '../utils/colors';

export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(s => s.auth);

    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const [uErr, setUErr] = useState('');
    const [pErr, setPErr] = useState('');

    const submit = async () => {

        let valid = true;

        if (!userid.trim()) {
            setUErr('User ID is required');
            valid = false;
        } else setUErr('');

        if (password.length < 6) {
            setPErr('Password must be at least 6 characters');
            valid = false;
        } else setPErr('');

        if (!valid) return;

        const res = await dispatch(
            postLogin({ userid: userid, password: password }),
        );

        if (res.payload?.status) {
            navigation.navigate('Otp');
        }
    };

    return (
        <View style={styles.root}>

            {/* ===== TOP COLOR AREA ===== */}
            <View style={styles.topBg} />

            {/* ===== WHITE CARD ===== */}
            <View style={styles.card}>

                <Image source={IMAGES.logo} style={styles.logo} />

                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.sub}>Login to continue</Text>

                {/* ===== USER ID ===== */}
                <View style={styles.inputWrap}>
                    <Text style={styles.label}>User ID</Text>
                    <TextInput
                        value={userid}
                        onChangeText={t => {
                            setUserid(t);
                            setUErr('');
                        }}
                        placeholder="Enter your user id"
                        style={[styles.input, uErr && styles.inputErr]}
                    />
                    {uErr ? <Text style={styles.err}>{uErr}</Text> : null}
                </View>

                {/* ===== PASSWORD ===== */}
                <View style={styles.inputWrap}>
                    <Text style={styles.label}>Password</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            value={password}
                            onChangeText={t => {
                                setPassword(t);
                                setPErr('');
                            }}
                            placeholder="Enter password"
                            secureTextEntry={!showPass}
                            style={[
                                styles.input,
                                { paddingRight: 60 },   // space for icon
                                pErr && styles.inputErr,
                            ]}
                        />

                        <TouchableOpacity
                            style={styles.eyeInside}
                            onPress={() => setShowPass(!showPass)}>
                            <Text style={styles.eyeText}>
                                {showPass ? 'HIDE' : 'SHOW'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {pErr ? <Text style={styles.err}>{pErr}</Text> : null}
                </View>


                {error ? <Text style={styles.errCenter}>{error}</Text> : null}

                {/* ===== BUTTON ===== */}
                <TouchableOpacity
                    style={[styles.btn, loading && { opacity: 0.7 }]}
                    onPress={submit}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.btnText}>Get OTP</Text>
                    )}
                </TouchableOpacity>

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
        top: '22%',
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 22,
        padding: 24,

        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    },

    logo: {
        height: 70,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
    },

    sub: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },

    inputWrap: {
        marginBottom: 14,
    },

    label: {
        marginBottom: 4,
        color: '#444',
        fontWeight: '500',
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#fafafa',
    },

    inputErr: {
        borderColor: 'red',
    },

    passRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    eyeBtn: {
        paddingHorizontal: 10,
    },

    eyeText: {
        fontSize: 18,
    },

    btn: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 10,
    },

    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    err: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },

    errCenter: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 6,
    },
    inputContainer: {
        position: 'relative',
        justifyContent: 'center',
    },

    eyeInside: {
        position: 'absolute',
        right: 14,
        height: '100%',
        justifyContent: 'center',
    },

    eyeText: {
        color: colors.primary,
        fontWeight: '600',
        fontSize: 12,
    },
});
