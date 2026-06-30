import './css/Entry.css'
import { useEffect, useRef, useState } from "react";
import { Worder } from "../type";
import { Entry as _Entry, invoke, uid_root } from "../invoke";
import { Folder } from "./ExploratorSide";
import { DicesIcon, Eye, EyeClosed, Image, PencilLine } from "lucide-react";
import RngPassword from './RngPassword';


interface Props {
    lang: string,
    wording: Worder,
    mod: string,
    selectedUID: string,
    sFolder: string,
    setWindow: (e: string) => void;
    setSelectedUID: (e: string) => void;
}

function Entry({ lang, wording, mod, selectedUID, sFolder, setWindow, setSelectedUID }: Props) {

    const passwordInput = useRef<HTMLInputElement>(null);
    const [entry, setEntry] = useState({} as _Entry);
    const [sFolderName, setSFolderName] = useState("");
    const [modifyIcon, setModifyIcon] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [delMod, setDelMod] = useState(false);

    const [passwordUnhash, setPasswordUnhash] = useState("**********");

    const [showRng, setShowRng] = useState(false);

    const entryCategoryEditor = useRef<HTMLDivElement>(null);
    const iconCategoryEditor = useRef<HTMLDivElement>(null);

    function getNameFolder(root: Folder, uid: string): string {
        if (root.uid == uid) return root.name;
        if (!root.childes) return "undefined";
        for (const child of root.childes) {
            const res = getNameFolder(child, uid);
            if (res !== "undefined") return res;
        }
        return "undefined";
    }

    async function exit(save: boolean, uid_del?: string) {
        if (save) {
            if (mod === "add") {
                setEntry({
                    ...entry,
                    uid: await invoke("get_uid")
                })
                setSelectedUID(entry.uid);
            }
            await invoke("save_one_entry", sFolder, selectedUID);
        }
        if (uid_del) {
            await invoke("del_one_entry", sFolder, selectedUID);
            setSelectedUID("-1");

        }
        setWindow("main");
    }

    useEffect(() => {
        async function setup() {
            if (mod === "mod" || mod === "del") {
                setEntry(await invoke('get_one_entry', sFolder, selectedUID));
                setDelMod(mod === "del");
            } else {
                setEntry({
                    title: "New entry",
                    username: "",
                    url: "",
                    notes: "",
                    src: "",
                    uid: "-1",
                } as _Entry);
            }
            const tree = await invoke('get_folder_tree') as Folder;
            if (sFolder == uid_root) {
                setSFolderName(wording[lang].rootFolder);
            } else {
                setSFolderName(getNameFolder(tree, sFolder));
            }
            if (entryCategoryEditor.current) entryCategoryEditor.current.addEventListener('click', () => {
                setModifyIcon(false);
            })
            if (iconCategoryEditor.current) iconCategoryEditor.current.addEventListener('click', () => {
                setModifyIcon(true);
            })
        }
        setup();
    }, [mod]);

    return <> <div id="main-container-entry">
        <p>{sFolderName} • {entry.title} • {wording[lang]["modEntry" + mod]}</p>
        {delMod ? <div id="del-container-entry">
            <p>{wording[lang].areUsureAboutThat}</p>
            <div>
                <button onClick={_e => exit(false, selectedUID)} className="action-button-entry">{wording[lang].yesDel}</button>
                <button onClick={_e => exit(false)} className="action-button-entry">{wording[lang].noNevermind}</button>
            </div>
        </div> :
            <>
                <div id="entry-content">
                    <div id="category-div-entry">
                        <div ref={entryCategoryEditor} id="entry-category-editor">
                            <PencilLine />
                        </div>
                        <div ref={iconCategoryEditor} id="icon-category-editor">
                            <Image />
                        </div>
                    </div>
                    {!modifyIcon ? <div id="entry-div-entry">
                        <div id="entry-password-title">
                            <p>{wording[lang].title}</p> <input></input>
                        </div>
                        <div id="entry-password-username">
                            <p>{wording[lang].username}</p> <input></input>
                        </div>
                        <div id="entry-password-password">
                            <p>{wording[lang].password}</p> <input type={showPassword ? "text" : "password"} ref={passwordInput} value={passwordUnhash} onChange={e => setPasswordUnhash(e.target.value)}></input>
                            <div id="entry-password-password-eye" onClick={_e => setShowPassword(!showPassword)}>
                                {!showPassword ? <Eye /> : <EyeClosed />}
                            </div>
                            <div id="entry-password-password-rng" onClick={_e => setShowRng(true)}>
                                <DicesIcon />
                            </div>
                        </div>
                        <div id="entry-password-url">
                            <p>{wording[lang].url}</p> <input></input>
                        </div>
                        <div id="entry-password-notes">
                            <p>{wording[lang].notes}</p> <textarea></textarea>
                        </div>
                    </div> : <div></div>}
                </div>
                <div id="footer-container-entry">
                    <button onClick={_e => exit(false)} className="action-button-entry">{wording[lang].exit}</button>
                    <button onClick={_e => exit(true)} className="action-button-entry">{wording[lang].apply}</button>
                </div>
            </>
        }
    </div>
        {showRng && (

            <div className="modal-overlay">
                <div id="back-dark"></div>
                <div className="modal">
                    <RngPassword
                        lang={lang}
                        wording={wording}
                        setPasswordResult={setPasswordUnhash}
                        intoEntry={true}
                    />
                    <button id="exit-password-rng-entry" onClick={_ => setShowRng(false)}>{wording[lang].confirmRngPassword}</button>
                </div>
            </div>
        )}
    </>
}

export default Entry;