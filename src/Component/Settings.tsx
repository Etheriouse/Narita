import { useEffect, useState } from "react";
import { Worder } from "../type";
import { invoke } from "../invoke";
import './css/Settings.css';

import { revealItemInDir } from "@tauri-apps/plugin-opener";
//import { documentDir, join } from '@tauri-apps/api/path';
//const docPath = await documentDir();
//const fullPath = await join(docPath, 'mon_projet', 'resultat.png');


interface Props {
    lang: string,
    wording: Worder,
    setLang: (s: string) => void;
}

function Settings({ lang, wording, setLang }: Props) {

    const [langs, setLangs] = useState<Array<string>>([]);
    const [nameVault, setNameVault] = useState("");

  
    async function revealFileVault() {
        revealItemInDir(await invoke('get_path_to_vault'));
    }

    useEffect(() => {
        async function setup() {
            setLangs(await invoke("get_langs"));
            setNameVault(await invoke("get_name_vault"));
        }
        setup();

        return () => {
            invoke("save_selected_lang", lang);
            invoke("save_name_vault", nameVault);
        }
    }, [])

    return <div id="setting-div-main">
        <div id="lang-choose">
            {langs.map(l => {
                return <button key={l} onClick={_=>setLang(l)} className={l === lang?'selected':''}>{wording[lang][l]}</button>
            })}
        </div>

        <div id="manage-vault">
            <input id="rename-vault-name" value={nameVault} onChange={e=>{setNameVault(e.target.value);}}></input>
            <button onClick={revealFileVault} id="find-vault-file-button">{wording[lang].findFileVault}</button>
            <button id="delete-vault-file-button" >{wording[lang].deleteVaultFile}</button>
        </div>
    </div>
}

export default Settings;