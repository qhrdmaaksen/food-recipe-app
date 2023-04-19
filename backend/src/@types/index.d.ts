
// 이 파일은 응용 프로그램에서 사용될 데이터 유형을 정의하는데 사용됨
export interface SEARCH_RECIPES {
    user: SEARCH_USER[];
    note: string;
    description: string;
    title: string;
    ingredients: string;
    image: string;
}

export interface SEARCH_RECIPES_RESPONSE {
    user: string;
    note: string;
    description: string;
    title: string;
    ingredients: string;
    image: IMAGE;
}

interface SEARCH_USER {
    email: string;
}

interface IMAGE {
    id: string;
    url: string;
}