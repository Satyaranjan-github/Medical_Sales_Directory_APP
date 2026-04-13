import API from "./api";

export const getCategories = async () => {
    const res = await API.get("/categories");
    return res.data;
};

export const getCategoryById = async ({ id }: { id: string }) => {
    const res = await API.get("/categories/" + id);
    return res.data;
};