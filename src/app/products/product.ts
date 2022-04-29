export interface IProduct{
            productId: number;
            productName: string;
            productCode: string;
            releaseDate: string;
            description: string;
            price: number;
            starRating: number;
            imageUrl: string;
}

// now we can use this interface as a databtype in our product list component