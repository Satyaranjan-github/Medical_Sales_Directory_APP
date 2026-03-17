import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Medical Store Dashboard</Text>

            <View style={styles.grid}>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("Medicines")}
                >
                    <Text style={styles.cardText}>Medicines</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("Brands")}
                >
                    <Text style={styles.cardText}>Brands</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("Suppliers")}
                >
                    <Text style={styles.cardText}>Suppliers</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("Purchases")}
                >
                    <Text style={styles.cardText}>Purchases</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("Sales")}
                >
                    <Text style={styles.cardText}>Sales</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    card: {
        width: "48%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: "center",
        elevation: 3,
    },

    cardText: {
        fontSize: 16,
        fontWeight: "600",
    },
});