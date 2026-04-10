import { getBrandById } from "@/src/services/brandService";
import { IBrand } from "@/src/types/brand";
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function BrandDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [brand, setBrand] = useState<IBrand>();
    const [loading, setLoading] = useState(true);

    const fetchBrand = async () => {
        try {
            const data = await getBrandById({ id })
            setBrand(data.data)
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBrand();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (!brand) {
        return (
            <View>
                <Text>Brand not found</Text>
            </View>
        )
    }

    return (
        <>
            <Stack.Screen options={{ title: "Brand Details" }} />
            <View style={styles.container}>
                <BasicInformation brand={brand} />
                <AdditionalInformation brand={brand} />
            </View>
        </>
    );
}

const BasicInformation = ({ brand }: { brand: IBrand }) => {
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
                    <Text> Brand Name:</Text>
                    <Text>{brand.name}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <Feather name="check-square" size={24} color="black" />
                <View>
                    <Text>Is Active:</Text>
                    <Text>{brand.isActive ? "Yes" : "No"}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <MaterialCommunityIcons name="folder-edit-outline" size={24} color="black" />
                <View>
                    <Text> Description:</Text>
                    <Text>{brand.description}</Text>
                </View>
            </View>
        </View >
    )
}

const AdditionalInformation = ({ brand }: { brand: IBrand }) => {
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
                    {brand.createdAt && (
                        <Text>{new Date(brand.createdAt).toLocaleDateString()}</Text>
                    )}
                </View>
            </View>
            <View style={styles.info}>
                <MaterialCommunityIcons name="clock-plus-outline" size={24} color="black" />
                <View>
                    <Text> Updated At:</Text>
                    {brand.updatedAt && (
                        <Text>{new Date(brand.updatedAt).toLocaleDateString()}</Text>
                    )}
                </View>
            </View>
            {brand.deletedAt && (
                <View style={styles.info}>
                    <MaterialCommunityIcons name="clock-plus-outline" size={24} color="black" />
                    <View>
                        <Text> Deleted At:</Text>
                        <Text>{new Date(brand.deletedAt).toLocaleDateString()}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
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