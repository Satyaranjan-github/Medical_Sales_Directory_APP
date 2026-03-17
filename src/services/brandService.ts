import API from "./api";

export const getBrands = async () => {
    const res = await API.get("/brands");
    return res.data;
};

export const createBrand = async (data: any) => {
    const res = await API.post("/brands/create", data);
    return res.data;
};