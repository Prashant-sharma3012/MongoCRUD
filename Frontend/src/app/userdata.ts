/* Defines the product entity */
export interface UserData {
    name: String;
    phone: Number;
    email: String;
    ads: [{
        id: Number;
        product: String;
        desc: String;
        cost: Number;
        location: String;
        Contact: Number;
    }];
    created_at: String;
    updated_at: String;
}

