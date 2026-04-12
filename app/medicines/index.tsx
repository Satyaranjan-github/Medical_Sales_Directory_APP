import { getMedicines } from "@/src/services/medicineService";
import { IMedicine } from "@/src/types/medicine";
import { FontAwesome6 } from "@expo/vector-icons";
import { format } from "date-fns";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Medicines() {
    const [medicines, setMedicines] = useState<IMedicine[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            setLoading(true);
            const data = await getMedicines();
            setMedicines(data.data);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Medicines" }} />
            <FlatList
                data={medicines}
                renderItem={({ item }) => (
                    <Pressable onPress={() => router.push(`/medicines/${item._id}`)}>
                        <View style={styles.card}>
                            <View style={styles.heading}>
                                <Text style={styles.name}>{item.name}</Text>
                                <View>
                                    <Text style={styles.cost}>
                                        <FontAwesome6 name="indian-rupee-sign" size={18} color="#0f3dd3" />
                                        {item.cost}
                                    </Text>
                                    <Text style={styles.discount}>
                                        {item.discount}% Off
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.details}>
                                <View style={styles.expiry}>
                                    <Text style={styles.label}>Expiry Date:</Text>
                                    <Text>
                                        {format(item.expiry, "dd/MM/yyyy")}
                                    </Text>
                                </View>
                                <View style={styles.expiry}>
                                    <Text style={styles.label}>Entry Date:</Text>
                                    <Text>
                                        Registered On:  {format(item.expiry, "dd/MM/yyyy")}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                )}
                ListEmptyComponent={<Text>No medicines found</Text>}
            />
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
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },

    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },

    name: {
        fontSize: 22,
        fontWeight: "800",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    heading: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#414451",
    },

    cost: {
        fontSize: 18,
        fontWeight: "800",
        backgroundColor: "#d4d4d4",
        color: "#3f56a0",
        borderRadius: 5,
        padding: 5
    },
    discount: {
        color: "green",
        fontWeight: "800"
    },
    expiry: {
        flexDirection: "column",
    },
    label: {
        color: "#9f9fa0",
        fontWeight: "800",
    },
    details: {
        flexDirection: "column",
        gap: 8
    }
});