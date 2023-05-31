export interface IRECIPE {
    title: string;
    description: string;
    note?: string;
    ingredients: string;
}

export interface IRECIPEPAYLOAD extends IRECIPE {
    image: File;
}

export interface IRECIPERESPONSE extends IRECIPE {
    _id: string;
    image: IIMAGE;
    user: {
        email: string;
    }
}

export interface IIMAGE {
    url: string;
    id: string;
}

export interface IRECIPEUSER extends Omit<IRECIPERESPONSE, "user"> {
    user: string;
}


// Interface for the login response
export interface ILOGINRESPONSE{
    email: string;
    token: string;
    id: string;
}

export interface IPAYLOAD {
    email: string;
    password: string;
}

export interface AUTH_TYPE {
    user: string;
    loading: boolean;
    onLogin: (payload: IPAYLOAD) => void;
    onLogout: () => void;
}
