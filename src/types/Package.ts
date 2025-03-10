export interface Review {
    rating: string,
    comment: string,
}

export interface Package {
    id: string,
    name: string,
    total_price: number,
    image: string,
    is_active: boolean,
    summary: string,
    creation_date: Date,
    description: string,
    score: string,
    target_group: string,
    products: string[],
    reviews: Review[],
}
