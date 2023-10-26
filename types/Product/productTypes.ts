export interface ProductDTO {
    id: string;
    name: string;
    brandName: string;
    slug: string;
    shortDescription: string;
    productAvailability: ProductAvailability;
    price: number;
    oldPrice?: number;
    specialPrice?: number;
    isCallForPricing: boolean;
    isAllowToOrder: boolean;
    isBestseller: boolean;
    isHomePage: boolean;
    isNew: boolean;
    isSales: boolean;
    stockQuantity?: number;
    specialPriceStart?: Date;
    specialPriceEnd?: Date;
    thumbnailImage: MediaDTO;
    thumbnailUrl: string;
    reviewsCount: number;
    ratingAverage?: number;
    productLangs: ProductLangDTO[];
}

interface ProductLangDTO {
    languageId: string;
    productId: string;
    name?: string;
    normalizedName?: string;
    shortDescription?: string;
    description?: string;
    specification?: string;
    metaKeywords?: string;
    metaDescription?: string;
}

interface MediaDTO {
    id: string;
    filePath?: string;
    seoFileName?: string;
    altAttribute?: string;
    titleAttribute?: string;
    mediaLangs: MediaLangDTO[];
}

export enum ProductAvailability {
    Available = 0,
    TwentyFourToFourtyEight = 1,
    UpToFiveBusinessDays = 2,
    ThreeToSevenDays = 3,
    ThreeToTenDays = 4,
    TwoWeeks = 5,
    ThreeWeeks = 6,
    ThreeToFiveWeeks = 7,
    TemporarilyUnavailable = 8,
    SellerConfirmation = 9,
    ToOrder = 10,
}

interface MediaLangDTO {
    languageId: string;
    mediaId: string;
    altAttribute?: string;
    titleAttribute?: string;
}