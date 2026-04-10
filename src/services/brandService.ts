import { IBrand } from "../types/brand";
import API from "./api";

export const getBrands = async () => {
    const res = await API.get("/brands");
    return res.data;
};

export const getBrandById = async ({ id }: { id: string }) => {
    const res = await API.get("/brands/" + id);
    return res.data;
};

export const createBrand = async (data: IBrand) => {
    const res = await API.post("/brands/create", data);
    return res.data;
};