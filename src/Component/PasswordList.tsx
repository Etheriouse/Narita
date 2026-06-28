import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { invoke, Entry, Stat } from "../invoke";
import './css/PasswordList.css';

// import { Camera } from 'lucide-react';
import { Worder } from "../type";

interface Props {
    lang: string;
    wording: Worder;
    sEntryUID: string;
    setSEntryUID: React.Dispatch<React.SetStateAction<string>>;
    sFolder: string;
    entrys: Array<Entry>;
    setEntrys: (e: Array<Entry>) => void;
    stat: Stat;
    setWindow: (e: string) => void;
}

// event listenner on window ctrl c
// call rust backend to get password, put into press paper for 10s

function PasswordList({ lang, wording, sEntryUID, setSEntryUID, sFolder, entrys, setEntrys, stat , setWindow }: Props) {

    const [passwordsLoaded, setPasswordLoaded] = useState(false);

    async function clickOnLine(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        setSEntryUID(event.currentTarget.dataset.uid || "");
    }

    async function openLine(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        clickOnLine(e);
        setWindow("entry=mod");
    }

    async function renderPassword() {
        setEntrys(await invoke("get_entrys", sFolder));
    }

    
    useEffect(() => {
        renderPassword().then(() => setPasswordLoaded(true));
        return () => {
            invoke("save_entrys", entrys, sFolder);
        }
    }, [sFolder, entrys]);

    return (
        <div id="main-container-password" style={{width: (stat.width_separator+'px')}}>
            <div id="password-main-bar">
                <p>{wording[lang].title}</p>
                <p>{wording[lang].username}</p>
                <p>{wording[lang].url}</p>
                <p>{wording[lang].notes}</p>
            </div>
            <div id="password-list">
                {entrys.map((e) => {
                    return <li onDoubleClick={e => openLine(e)} onClick={(e) => clickOnLine(e)} data-uid={e.uid} key={e.uid} className={`password ${sEntryUID == e.uid ? "entry-selected" : ""}`}>
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
