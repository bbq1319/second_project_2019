import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";

export default function Weather({ temp }) {
    return (
        <View style={styles.containers}>
            <Text>{temp}</Text>
        </View>
    );
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes.oneOf(["Thunderstorm", "Drizzle", "Rain", "Snow", "Atmosphere", "Clear", "Clouds", "Dust", "Haze", "Dust"])
}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})