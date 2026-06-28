import { useEffect, useRef, useState } from "react";
import { Worder } from "../type";
import { Entry as _Entry, invoke, uid_root } from "../invoke";
import { Folder } from "./ExploratorSide";

interface Props {
    lang: string,
    wording: Worder,
    mod: string,
    selectedUID: string,
    sFolder: string,
}

function Entry({ lang, wording, mod, selectedUID, sFolder }: Props) {

    const passwordInput = useRef<HTMLInputElement>(null);
    const [entry, setEntry] = useState({} as _Entry);
    const [sFolderName, setSFolderName] = useState("");

    function getNameFolder(root: Folder, uid: string): string {
        if (root.uid == uid) return root.name;
        if (!root.childes) return "undefined";
        for (const child of root.childes) {
            const res = getNameFolder(child, uid);
            if(res !== "undefined") return res;
        }
        return "undefined";
    }

    useEffect(() => {
        if (passwordInput.current) passwordInput.current.value = '**********';
        async function setup() {
            setEntry(await invoke('get_one_entry', sFolder, selectedUID));
            const tree = await invoke('get_folder_tree') as Folder;
            if(sFolder == uid_root) {
                setSFolderName(wording[lang].rootFolder);
            } else {
                setSFolderName(getNameFolder(tree, sFolder));
            }
        }
        setup();
    }, []);

    return <div id="main-container-entry">
        <p>{sFolderName} • {entry.title} • {wording[lang]["modEntry" + mod]}</p>
        <div>
            <div>
                <div id="entry-category-editor">

                </div>
                <div id="icon-category-editor">

                </div>
            </div>
            <div>
                <div>
                    <p>{wording[lang].title}</p> <input></input>
                </div>
                <div>
                    <p>{wording[lang].username}</p> <input></input>
                </div>
                <div>
                    <p>{wording[lang].password}</p> <input type="password" ref={passwordInput}></input>
                </div>
                <div>
                    <p>{wording[lang].url}</p> <input></input>
                </div>
                <div>
                    <p>{wording[lang].notes}</p> <textarea></textarea>
                </div>
            </div>
        </div>
    </div>
}

export default Entry;