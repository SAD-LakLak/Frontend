import axiosInstance from "../../../constants/axiosConfig.ts";
import {Package, Review} from "../../../types/Package.ts";

export async function fetchPackage(id: number, setPack: (Package) => void, setReviews: (Review) => void) {
    const response = await axiosInstance.get(`/packages/?`);
    const targetPackage = response.data.results.find((item) => item.id == id);
    setPack(targetPackage);
    setReviews(targetPackage.reviews);
}