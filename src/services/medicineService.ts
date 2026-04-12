import { IMedicine } from "../types/medicine";
import API from "./api";

export const getMedicines = async () => {
    const res = await API.get("/medicines");
    return res.data;
};

export const getMedicineById = async ({ id }: { id: string }) => {
    const res = await API.get("/medicines/" + id);
    return res.data;
};

export const createMedicine = async (data: IMedicine) => {
    const res = await API.post("/medicines/create", data);
    return res.data;
};