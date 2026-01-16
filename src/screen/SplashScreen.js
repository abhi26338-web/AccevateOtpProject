import React, { useEffect } from 'react';
import {
    View,
    Image,
    ActivityIndicator,
    StyleSheet,
    Text,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import { IMAGES } from '../assets/images';
import colors from '../utils/colors';

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        const checkToken = async () => {
            try {
                const creds = await Keychain.getGenericPassword();

                if (creds?.password) {
                    navigation.replace('HomeStack');
                } else {
                    navigation.replace('AuthStack');
                }
            } catch (e) {
                navigation.replace('AuthStack');
            }
        };

        setTimeout(checkToken, 1800);
    }, []);

    return (
        <View style={styles.root}>

            <View style={styles.topBg} />

            <View style={styles.centerBox}>
                <Image source={IMAGES.logo} style={styles.logo} />
                <Text style={styles.tagline}>Learning made smarter</Text>
            </View>

            <View style={styles.bottomCard}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loading}>Loading...</Text>
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
        height: '60%',
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },

    centerBox: {
        position: 'absolute',
        top: '32%',
        left: 0,
        right: 0,
        alignItems: 'center',
    },

    logo: {
        width: 220,
        height: 110,
        resizeMode: 'contain',
    },

    tagline: {
        color: '#fff',
        marginTop: 8,
        fontSize: 14,
        opacity: 0.9,
    },

    bottomCard: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 10,
    },

    loading: {
        marginTop: 10,
        color: '#666',
    },
});
