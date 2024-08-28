import { ProductsType } from "@/types/productTypes";

export async function fetchJsonData(url: string) {
    let data: ProductsType = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`);
        data = await res.json();
    } catch(e) {
        console.error(`can not get data from ${url}`);
    } finally {
        return data;
    }
}