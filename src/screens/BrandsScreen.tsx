import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getBrands } from "../services/brandService";

export default function BrandsScreen() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        loadBrands();
    }, []);

    const loadBrands = async () => {
        const data = await getBrands();
        setBrands(data);
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Brands</Text>

            <FlatList
                data={brands}
                keyExtractor={(item: any) => item._id}
                renderItem={({ item }: any) => (
                    <Text>{item.name}</Text>
                )}
            />
        </View>
    );
}