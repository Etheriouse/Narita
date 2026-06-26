import { useEffect, useState } from "react";
import { invoke } from "../invoke";
import './css/PasswordList.css';

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

async function clickOnLine(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    // call rust backend to get password, put into press paper for 10s
}

function PasswordList({ lang, wording }: Props) {

    const [passwords, setPasswords] = useState(Array<Password>);
    const [passwordsLoaded, setPasswordLoaded] = useState(false);

    useEffect(() => {
        async function tmp() {
            setPasswords(await invoke("get_passwords"));
        }
        tmp().then(() => setPasswordLoaded(true));
    }, []);
    console.log(wording);

    return (
        <div id="main-container-password">
            <div id="password-main-bar">
                <p>{wording[lang].title}</p>
                <p>{wording[lang].username}</p>
                <p>{wording[lang].url}</p>
                <p>{wording[lang].notes}</p>
            </div>
            <div id="password-list">
                {passwords.map(e => {
                    return <>
                        <li onClick={(e)=>clickOnLine(e)} key={e.uid} className="password">
                            <div><img src={`./assets/icons/${e.src ? e.src : 'default-icon-entry.png'}`}></img>
                                <p>{e.title}</p></div>
                            <p>{e.username}</p>
                            <p>{e.url}</p>
                            <p>{e.notes}</p>
                        </li>
                    </>
                })}
            </div>
        </div>
    );
}

export default PasswordList;
