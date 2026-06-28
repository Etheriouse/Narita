import { ReactElement, useEffect, useState } from 'react';
import { Worder } from '../type';
import './css/ExploratorSide.css'
import { invoke, uid_root } from '../invoke';

import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
    lang: string;
    wording: Worder;
    sFolder: string;
    setSFolder: React.Dispatch<React.SetStateAction<string>>;
}

export interface Folder {
    name: string,
    src: string,
    uid: string,
    open: boolean,
    childes: Folder[];
}

function ExplortorSide({ lang, wording, sFolder, setSFolder }: Props) {

    const [folders, setFolders] = useState({} as Folder);
    const [rootOpen, setRootOpen] = useState(false);

    function updateFolder(folder: Folder, uid: string): Folder {
        if (folder.uid == uid) {
            return {
                ...folder,
                open: !folder.open
            };
        }

        if (!folder.childes) return folder;

        return {
            ...folder,
            childes: folder.childes.map(e => {
                return updateFolder(e, uid);
            })
        };
    }

    function renderFolder(folder: Folder): ReactElement<any, any> {
        if (!folder.uid) {
            return <></>
        }
        return <div className={`folder ${folder.uid == sFolder?'selected':''}`} key={folder.uid}>
            <div onClick={()=>setSFolder(folder.uid)} className='folder-data'>
                <div className='folder-icon-open' onClick={() => {
                    setFolders(prev => updateFolder(prev, folder.uid));
                }} >
                    {
                        folder.childes.length > 0 ? (
                            folder.open ?
                                <ChevronDown />
                                : <ChevronUp />
                        ) : <ChevronUp style={{ visibility: 'hidden' }} />
                    }
                </div>
                <img src={`./assets/icons/${folder.src ? folder.src : 'default-icon-folder.png'}`} className='folder-icon'></img>
                <p className='folder-name'>{folder.name}</p>
            </div>
            <div
            //  style={{ display: folder.open ? '' : 'none' }} 
             className={`folder-childe ${folder.open ? "open" : ""}`}>
                {folder.childes ? folder.childes.map(e => {
                    return renderFolder(e);
                }) : <></>}
            </div>
        </div>;
    }

    useEffect(() => {
        async function getFolderTree() {
            setFolders(await invoke('get_folder_tree'));
        }
        getFolderTree();
        return () => {
            invoke("save_folder_tree", folders);
        }
    }, []);

    return <div id="explorator-side-main">
        <div id='folder-root' className={`folder ${uid_root == sFolder?'selected':''}`}>
            <div onClick={()=>setSFolder(uid_root)} className='folder-data'>
                <div className='folder-icon-open' onClick={() => {
                    setRootOpen(!rootOpen);
                }} >
                    {
                        folders.childes ? (
                            rootOpen ?
                                <ChevronDown />
                                : <ChevronUp />
                        ) : <ChevronUp style={{ visibility: 'hidden' }} />
                    }
                </div>
                <img src={`./assets/icons/${folders.src ? folders.src : 'default-icon-folder.png'}`} className='folder-icon'></img>
                <p className='folder-name'>{wording[lang].rootFolder}</p>
            </div>
            <div 
            // style={{ display: rootOpen ? '' : 'none' }}
            className={`folder-childe ${rootOpen ? "open" : ""}`}>
                {renderFolder(folders)}
            </div>
        </div>


    </div>
}

export default ExplortorSide;