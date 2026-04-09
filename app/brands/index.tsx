import { getBrands } from "@/src/services/brandService";
import { IBrand } from "@/src/types/brand";
import { format } from "date-fns";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Brands() {
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            setLoading(true);
            const data = await getBrands();
            setBrands(data.data);
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
            <Stack.Screen options={{ title: "Brands" }} />
            <FlatList
                data={brands}
                renderItem={({ item }) => (
                    <Pressable onPress={() => router.push({
                        pathname: "/brands/[id]",
                        params: { id: item._id as string },
                    })}>
                        <View style={styles.card}>
                            <Text style={styles.name}>{item.name}</Text>
                            {item.isActive && <Text>Active</Text>}
                            {item.createdAt &&
                                <Text>Created At:{format(item.createdAt, "dd/MM/yyyy")}</Text>
                            }
                        </View>
                    </Pressable>
                )}
                ListEmptyComponent={<Text>No brands found</Text>}

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
        fontSize: 16,
        fontWeight: "500",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});