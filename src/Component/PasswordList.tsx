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
    sEntryUID: string;
    setSEntryUID: React.Dispatch<React.SetStateAction<string>>;
}

// event listenner on window ctrl c
 // call rust backend to get password, put into press paper for 10s

async function clickOnLine(event: React.MouseEvent<HTMLLIElement, MouseEvent>, uid: React.Dispatch<React.SetStateAction<string>>) {
    uid(event.currentTarget.dataset.uid || "");
}

function PasswordList({ lang, wording, sEntryUID, setSEntryUID }: Props) {

    const [entrys, setEntrys] = useState(Array<Password>);
    const [passwordsLoaded, setPasswordLoaded] = useState(false);

    useEffect(() => {
        async function tmp() {
            setEntrys(await invoke("get_entrys"));
        }
        tmp().then(() => setPasswordLoaded(true));

        return () => {
            invoke("save_entrys", entrys);
        }
    }, []);

    return (
        <div id="main-container-password">
            <div id="password-main-bar">
                <p>{wording[lang].title}</p>
                <p>{wording[lang].username}</p>
                <p>{wording[lang].url}</p>
                <p>{wording[lang].notes}</p>
            </div>
            <div id="password-list">
                {entrys.map((e) => {
                    return <li onClick={(e) => clickOnLine(e, setSEntryUID)} data-uid={e.uid} key={e.uid} className={`password ${sEntryUID==e.uid?"entry-selected":""}`}>
                        <div><img src={`./assets/icons/${e.src ? e.src : 'default-icon-entry.png'}`}></img>
                            <p>{e.title}</p></div>
                        <p>{e.username}</p>
                        <p>{e.url}</p>
                        <p>{e.notes}</p>
                    </li>

                })}
            </div>
        </div>
    );
}

export default PasswordList;
