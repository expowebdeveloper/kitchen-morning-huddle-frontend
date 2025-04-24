export interface DietaryRequirements {
    [key: string]: number;
}

export interface Order {
    item: string;
    dietary_tags: string[];
    price: number;
}

export interface TableInsight {
    name: string;
    party_size: number;
    orders: Order[];
    dietary_requirements: DietaryRequirements;
    prep_time: number;
    complexity: number;
    kitchen_notes: string[];
}

export interface HuddleData {
    date: string;
    total_reservations: number;
    total_guests: number;
    total_orders: number;
    high_complexity_orders: number;
    dietary_requirements: DietaryRequirements;
    table_insights: TableInsight[];
}
