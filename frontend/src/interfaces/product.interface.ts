export interface IProduct {
    _id: string;
    name: string;
    user: any;
    price: number;
    isAvailable: boolean;

    imageURL?: string;
    ["string"]: string;
}