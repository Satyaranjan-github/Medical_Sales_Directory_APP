import { getCategoryById } from "@/src/services/categoryService";
import { ICategory } from "@/src/types/category";
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function CategoryDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [category, setCategory] = useState<ICategory>();
    const [loading, setLoading] = useState(true);

    const fetchCategory = async () => {
        try {
            const data = await getCategoryById({ id })
            setCategory(data.data)
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (!category) {
        return (
            <View>
                <Text>Category not found</Text>
            </View>
        )
    }

    return (
        <>
            <Stack.Screen options={{ title: "Category Details" }} />
            <View style={styles.container}>
                <BasicInformation category={category} />
                <AdditionalInformation category={category} />
            </View>
        </>
    );
}

const BasicInformation = ({ category }: { category: ICategory }) => {
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
                    <Text> Category Name:</Text>
                    <Text>{category.name}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <Feather name="check-square" size={24} color="black" />
                <View>
                    <Text>Is Active:</Text>
                    <Text>{category.isActive ? "Yes" : "No"}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <MaterialCommunityIcons name="folder-edit-outline" size={24} color="black" />
                <View>
                    <Text> Description:</Text>
                    <Text>{category.description}</Text>
                </View>
            </View>
        </View >
    )
}

const AdditionalInformation = ({ category }: { category: ICategory }) => {
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
                    {category.createdAt && (
                        <Text>{new Date(category.createdAt).toLocaleDateString()}</Text>
                    )}
                </View>
            </View>
            <View style={styles.info}>
                <MaterialCommunityIcons name="clock-plus-outline" size={24} color="black" />
                <View>
                    <Text> Updated At:</Text>
                    {category.updatedAt && (
                        <Text>{new Date(category.updatedAt).toLocaleDateString()}</Text>
                    )}
                </View>
            </View>
            {category.deletedAt && (
                <View style={styles.info}>
                    <MaterialCommunityIcons name="clock-plus-outline" size={24} color="black" />
                    <View>
                        <Text> Deleted At:</Text>
                        <Text>{new Date(category.deletedAt).toLocaleDateString()}</Text>
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