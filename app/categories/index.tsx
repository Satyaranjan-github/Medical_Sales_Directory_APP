import { getCategories } from '@/src/services/categoryService';
import { ICategory } from '@/src/types/category';
import { format } from 'date-fns';
import { router, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Categories = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await getCategories();
            setCategories(data.data);
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
        <View style={styles.container} >
            <Stack.Screen options={{ title: "Categories" }} />
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push({
                        pathname: "/categories/[id]",
                        params: { id: item._id as string },
                    })}
                        style={styles.card}>
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            {item.isActive && <Text>Active</Text>}
                            {item.createdAt &&
                                <Text>Created At:{format(item.createdAt, "dd/MM/yyyy")}</Text>
                            }
                            {item.updatedAt &&
                                <Text>Updated At:{format(item.updatedAt, "dd/MM/yyyy")}</Text>
                            }
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text>No categories found</Text>}

            />
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f7fb",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },

    card: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
    },

    name: {
        fontSize: 16,
        fontWeight: "500",
        borderBottomWidth: 1,
        borderBottomColor: "#e8e8e8",
        paddingBottom: 10,
        marginBottom: 10,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});