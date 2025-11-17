export type Customer = {
    firstname: string;
    lastname: string;
    streetadress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: {
            href: string;
        };
        customer: {
            href: string;
        };
        trainings: {
            href: string;
        };
    }
}

export type Training = {
    id: number;
    date: string;
    duration: number;
    activity: string;
    customer?: {
        firstname: string;
        lastname: string;
    };
    };

    export type NewTraining = {
    date: string;
    activity: string;
    duration: number;
    customer: string;
};


export type CustomerForm= Omit<Customer, "_links">; 

