import { Authentication, getAuthentication, getUrbanCategory, getUrbanList, UrbanCategory, UrbanList } from '@src/SGIS';
import s from './Geography.module.css';
import { useEffect, useState } from 'react';

export default function Geography() {

    const [Auth, setAuth] = useState<Authentication | null>(null);

    useEffect(() => {
        getAuthentication()
        .then((auth: Authentication |null) => {
            if (!auth) return; 
            setAuth(auth); 
        });
    }, [])

    useEffect(() => {}, [Auth])

    if(!Auth) return (
        <div>Loading...</div>
    )

    return (
        <div id={s.View}>
            <UrbanCategoryTable accessToken={Auth.result.accessToken}/>
            <UrbanListTable accessToken={Auth.result.accessToken} />
        </div>
    )
}

function UrbanCategoryTable(
    { accessToken } : {
        accessToken:string,
    }
) {

    const [list, setList] = useState<UrbanCategory | null>(null);
    
    const fetch = async () => {
        if(list) return; 
        const res = await getUrbanCategory(accessToken);
        if (!res) return;
        setList(res);
    }

    const style_row: React.CSSProperties = {
        padding: 'none',
        margin: 'none', 
    }

    return (
        <div 
            id={s.list}
        >
            <button onClick={fetch}>보기</button>
            { !list 
                ? <></>
                : list.result.list.map((elm, idx) => {
                    return (
                        < div 
                            key = { idx }
                            className={s.list_raw}
                        >
                            <p 
                                className={s.list_raw_p}
                                style={{width:'200px'}}
                            >
                                {elm.district_nm}
                            </p>
                            <p 
                                className={s.list_raw_p}
                            >
                                {elm.district_cd}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}

function UrbanListTable(
    { accessToken }: {
        accessToken: string,
    }
) {

    const [list, setList] = useState<UrbanList | null>(null);

    const fetch = async () => {
        if (list) return;
        const res = await getUrbanList(
            accessToken, 
            2024,
            'UAL002',
            '01',
        );
        if (!res) return;
        setList(res);
    }

    const style_row: React.CSSProperties = {
        padding: 'none',
        margin: 'none',
    }

    return (
        <div
            id={s.list}
        >
            <button onClick={fetch}>보기</button>
            {!list
                ? <></>
                : list.result.list.map((elm, idx) => {
                    return (
                        <div
                            key={idx}
                            className={s.list_raw}
                        >
                            <p
                                className={s.list_raw_p}
                                style={{ width: '400px' }}
                            >
                                {elm.urban_nm}
                            </p>
                            <p
                                className={s.list_raw_p}
                            >
                                {elm.urban_cd}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}