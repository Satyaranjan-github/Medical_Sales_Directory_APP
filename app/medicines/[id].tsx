import { getMedicineById } from "@/src/services/medicineService";
import { IMedicine } from "@/src/types/medicine";
import { Feather, FontAwesome5, FontAwesome6, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function MedicineDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [medicine, setMedicine] = useState<IMedicine>();
    const [loading, setLoading] = useState(true);

    const fetchMedicine = async () => {
        try {
            const data = await getMedicineById({ id })
            setMedicine(data.data)
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMedicine();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (!medicine) {
        return (
            <View>
                <Text>Medicine not found</Text>
            </View>
        )
    }

    return (
        <>
            <Stack.Screen options={{ title: "Medicine Details" }} />
            <View style={styles.container}>
                <BasicInformation medicine={medicine} />
                <AdditionalInformation medicine={medicine} />
            </View>
        </>
    );
}

const BasicInformation = ({ medicine }: { medicine: IMedicine }) => {
    return (
        <View style={styles.card}>
            <View style={styles.headingIcon}>
                <FontAwesome5 name="fingerprint" size={20} color="green" />
                <Text style={styles.heading}>
                    Basic Information
                </Text>
            </View>
            <View style={styles.info}>
                <MaterialCommunityIcons name="folder-edit-outline" size={24} color="black" />
                <View>
                    <Text> Medicine Name:</Text>
                    <Text>{medicine.name}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <FontAwesome6 name="indian-rupee-sign" size={24} color="black" />
                <View>
                    <Text>Cost:</Text>
                    <Text>{medicine.cost}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <Feather name="percent" size={24} color="black" />
                <View>
                    <Text>GST:</Text>
                    <Text>{medicine.gst}%</Text>
                </View>
            </View>
            <View style={styles.info}>
                <MaterialIcons name="discount" size={24} color="black" />
                <View>
                    <Text>Discount:</Text>
                    <Text>{medicine.discount}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <MaterialIcons name="discount" size={24} color="black" />
                <View>
                    <Text>Expiry:</Text>
                    <Text>{format(medicine.expiry, "dd/MM/yyyy")}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <MaterialCommunityIcons name="folder-edit-outline" size={24} color="black" />
                <View>
                    <Text> Description:</Text>
                    <Text>{medicine.description}</Text>
                </View>
            </View>
        </View >
    )
}

const AdditionalInformation = ({ medicine }: { medicine: IMedicine }) => {
    return (
        <View style={styles.card}>
            <View style={styles.headingIcon}>
                <Feather name="book-open" size={24} color="green" />
                <Text style={styles.heading}>
                    Additional Information
                </Text>
            </View>
            <View style={styles.info}>
                <MaterialCommunityIcons name="clock-plus-outline" size={24} color="black" />
                <View>
                    <Text> Created At:</Text>
                    {medicine.createdAt && (
                        <Text>{new Date(medicine.createdAt).toLocaleDateString()}</Text>
                    )}
                </View>
            </View>
            <View style={styles.info}>
                <MaterialCommunityIcons name="clock-plus-outline" size={24} color="black" />
                <View>
                    <Text> Updated At:</Text>
                    {medicine.updatedAt && (
                        <Text>{new Date(medicine.updatedAt).toLocaleDateString()}</Text>
                    )}
                </View>
            </View>
            {medicine.deletedAt && (
                <View style={styles.info}>
                    <MaterialCommunityIcons name="clock-plus-outline" size={24} color="black" />
                    <View>
                        <Text> Deleted At:</Text>
                        <Text>{new Date(medicine.deletedAt).toLocaleDateString()}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 10
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    headingIcon: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    heading: {
        color: "green",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    info: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 10,
    }
})