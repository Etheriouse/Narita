import { useEffect, useState } from "react";
import { invoke } from "../invoke";

// import { Camera } from 'lucide-react';
import { Worder } from "../type";

interface Password {
    title: string,
    username: string,
    url: string,
    notes: string,
    src: string,
    uid: string,
}

interface Props {
    lang: string;
    wording: Worder;
}

function PasswordList({ lang, wording } : Props) {

    const [passwords, setPasswords] = useState(Array<Password>);

    useEffect(() => {
        async function tmp() {
            setPasswords(await invoke("getPasswords"));
        }
        tmp();
    }, []);
    console.log(wording);

    return (
        <>
            <div id="password-main-bar">
                <p>{wording[lang].title}</p>
                <p>{wording[lang].username}</p>
                <p>{wording[lang].url}</p>
                <p>{wording[lang].notes}</p>
            </div>
            <div id="passowrd-list">
                {passwords.map(e => {
                    return <li key={e.uid} className="password">
                        <img src={`./assets/icons/${e.src?e.src:'default-icon-entry.png'}`}></img>
                        <p>{e.title}</p>
                        <p>{e.username}</p>
                        <p>{e.url}</p>
                        <p>{e.notes}</p>
                        <p>{e.uid}</p>
                    </li>
                })}
            </div>
        </>
    );
}

export default PasswordList;
