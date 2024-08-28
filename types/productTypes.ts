export interface IProduct {
    "Tracking ID": number,
    "Product Image": string,
    "Product Name": string,
    Customer: string,
    Date: string,
    Amount: number,
    "Payment Mode": string,
    Status: string
}

export type ProductsType = IProduct[];