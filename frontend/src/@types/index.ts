
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
