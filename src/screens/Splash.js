
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Alert, Pressable } from 'react-native';

export default function Splash({ navigation }) {
    setTimeout(() => {
        navigation.navigate('Login');
    }, 3000);
    return (
        <View style={styles.container}>
            <Image
                style={styles.icon}
                source={require('../../assets/biofeedback-logo.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    }
    , icon: {
        alignSelf: 'center',
        width: 300,
        height: 300
    }
});