import s from './Main.module.css'; 
import { useEffect, useState } from 'react';
import Geography from '../Geography/Geography';

export default function Main() {

    
    return (
        <div id={s.Main}>
            <Geography />
        </div>
    )
}