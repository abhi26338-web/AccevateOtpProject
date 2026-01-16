import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../redux/authSlice';
import * as Keychain from 'react-native-keychain';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard({ navigation }) {
    const dispatch = useDispatch();
    const { dashboard } = useSelector(s => s.auth);
    const [refreshing, setRefreshing] = useState(false);

    const loadData = async () => {
        setRefreshing(true);
        await dispatch(getDashboard());
        setRefreshing(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const user = dashboard?.user;
    const d = dashboard?.dashboard;

    const bgColor = d?.color?.dynamic_color || '#f2f6ff';

    const onLogout = async () => {
        await Keychain.resetGenericPassword();
        navigation.replace('AuthStack');
    };

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: bgColor }]}>

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadData} />
                }
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            >

                {/* ===== HEADER ===== */}
                <View style={styles.headerCard}>
                    <View>
                        <Text style={styles.welcome}>Welcome 👋</Text>
                        <Text style={styles.name}>{user?.name}</Text>
                        <Text style={styles.mobile}>{user?.mobile}</Text>
                    </View>

                    <TouchableOpacity onPress={onLogout}>
                        <Text style={styles.logout}>Logout</Text>
                    </TouchableOpacity>
                </View>

                {/* ===== CAROUSEL ===== */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 15, paddingLeft: 16 }}
                >
                    {d?.carousel?.map((img, i) => (
                        <Image
                            key={i}
                            source={{ uri: img }}
                            style={styles.banner}
                        />
                    ))}
                </ScrollView>

                {/* ===== STATS ===== */}
                <View style={styles.statsRow}>

                    {/* STUDENTS */}
                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Students</Text>

                        <View style={styles.statLine}>
                            <Text style={styles.statLabel}>Boys</Text>
                            <Text style={styles.statValue}>{d?.student?.Boy}</Text>
                        </View>

                        <View style={styles.statLine}>
                            <Text style={styles.statLabel}>Girls</Text>
                            <Text style={styles.statValue}>{d?.student?.Girl}</Text>
                        </View>
                    </View>

                    {/* AMOUNT */}
                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Fees</Text>

                        <View style={styles.statLine}>
                            <Text style={styles.statLabel}>Total</Text>
                            <Text style={styles.statValue}>₹{d?.amount?.Total}</Text>
                        </View>

                        <View style={styles.statLine}>
                            <Text style={styles.statLabel}>Paid</Text>
                            <Text style={styles.statValue}>₹{d?.amount?.Paid}</Text>
                        </View>

                        <View style={styles.statLine}>
                            <Text style={styles.statLabel}>Due</Text>
                            <Text style={[styles.statValue, { color: 'red' }]}>
                                ₹{d?.amount?.due}
                            </Text>
                        </View>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },

    /* HEADER */
    headerCard: {
        margin: 16,
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderRadius: 18,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    },

    welcome: {
        fontSize: 13,
        color: '#555',
    },

    name: {
        fontSize: 20,
        fontWeight: '700',
    },

    mobile: {
        color: '#666',
        marginTop: 2,
    },

    logout: {
        color: 'red',
        fontWeight: '600',
    },

    /* BANNER */
    banner: {
        width: 280,
        height: 150,
        borderRadius: 16,
        marginRight: 14,
    },

    /* STATS */
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 16,
    },

    statCard: {
        width: '48%',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 18,
        padding: 16,

        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 6,
    },

    statTitle: {
        fontWeight: '700',
        marginBottom: 10,
    },

    statLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },

    statLabel: {
        color: '#555',
    },

    statValue: {
        fontWeight: '600',
    },
});
