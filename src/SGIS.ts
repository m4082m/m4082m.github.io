import { SGIS_SECURITY_KEY, SGIS_SERVICE_ID } from '@env'; 

function buildQueryString(params: Record<string, any>): string {
    // undefined나 null 값 제외 처리 (선택 사항)
    const cleanedParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null)
    );
    return new URLSearchParams(cleanedParams).toString();
}

function sgis_api_url(domain: string, subdomain: string, params: Record<string, any>): string {
    // return `https://sgisapi.mods.go.kr/OpenAPI3/${domain}/${subdomain}.json`;
    return `/OpenAPI3/${domain}/${subdomain}.json?${buildQueryString(params)}`;
}

type Common = {
    "id": string,
    "errMsg": string,
    "errCd": number,
    "trId": string,
}

export type Authentication = {
    "result": {
        "accessToken": string,
        "accessTimeout": string,
    },
} & Common; 

export async function getAuthentication(): Promise<Authentication | null> {
    try {
        const response = await fetch(`/OpenAPI3/auth/authentication.json?consumer_key=${SGIS_SERVICE_ID}&consumer_secret=${SGIS_SECURITY_KEY}`);

        if (!response.ok) throw new Error('요청 실패');

        const result: Authentication = await response.json();

        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export type UrbanCategory = {
    "result": {
        "list": {
            "district_cd": string,
            "district_nm": string,
            "order_no": number,
        }[],
    },
} & Common;

export async function getUrbanCategory(accessToken:string): Promise<UrbanCategory|null> {
    const url = sgis_api_url('urban', 'category', {
        "accessToken": accessToken
    }); 

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error('요청 실패');

        const result: UrbanCategory = await response.json();
        
        return result;
    } catch (error) {
        console.error(error);
        return null; 
    }
}


export type UrbanList = {
    "result": {
        "list": {
            "district_cd": string,
            "base_year": string,
            "urban_type": string,
            "urban_nm": string,
            "urban_cd": string, 
        }[],
    },
} & Common; 


export async function getUrbanList(
    accessToken: string, 
    base_year: number, 
    district_cd: string, 
    urban_type:'01'|'02'
): Promise<UrbanList | null> {
    const url = sgis_api_url('urban', 'list', {
        "accessToken": accessToken,
        "base_year": base_year,
        "district_cd": district_cd,
        "urban_type": urban_type,
    });

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error('요청 실패');

        const result: UrbanList = await response.json();

        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

