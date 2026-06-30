import { FolderOpenDotIcon, SaveIcon, FileLockIcon, FilePlusCornerIcon, FilePenIcon, Trash2Icon, UserPlusIcon, UserKeyIcon, DicesIcon, SettingsIcon } from 'lucide-react';
import './css/NavBar.css';
import { Worder } from '../type';
import { Entry, invoke } from '../invoke';

interface Props {
    lang: string,
    wording: Worder,
    setWindow: (e: string) => void;
    unlock: (e: boolean) => void;
    entrys: Entry[];
    sFolder: string;
    sEntry: string;
    setSEntryUID: (e: string) => void;
}

function NavBar({ lang, wording, setWindow, unlock, entrys, sFolder, sEntry, setSEntryUID }: Props) {

    function openFile() {

    }

    function saveEntry() {
        invoke("save_entrys", entrys, sFolder);
    }

    return <div id="nav-bar-main">
        <div className="icon-category" id="vault-icon-category">
            <div className="icon-nav-bar" onClick={_e => openFile()} >
                <span className="tooltip">{wording[lang].iconOpen}</span>
                <FolderOpenDotIcon id="open-a-vault" />
            </div>
            <div className="icon-nav-bar" onClick={_e => saveEntry()}>
                <span className="tooltip">{wording[lang].iconSave}</span>
                <SaveIcon id="save-a-vault" />
            </div>

            <div className="icon-nav-bar" onClick={_e => unlock(false)} >
                <span className="tooltip">{wording[lang].iconLock}</span>
                <FileLockIcon id="lock-a-vault" />
            </div>
        </div>

        <div className="icon-category" id="entry-icon-category">
            <div className="icon-nav-bar" onClick={_e => setWindow("entry=add")}>
                <span className="tooltip">{wording[lang].iconAddEntry}</span>
                <FilePlusCornerIcon id="add-a-entry" />
            </div>
            <div className="icon-nav-bar" onClick={_e => {if(sEntry === "-1") if(entrys[0]) {setSEntryUID(entrys[0].uid); setWindow("entry=mod");}}}>
                <span className="tooltip">{wording[lang].iconModifyEntry}</span>
                <FilePenIcon id="modify-a-entry" />
            </div>
            <div className="icon-nav-bar" onClick={_e => {if(sEntry === "-1") if(entrys[0]) {setSEntryUID(entrys[0].uid); setWindow("entry=del");}}}>
                <span className="tooltip">{wording[lang].iconDeleteEntry}</span>
                <Trash2Icon id="delete-a-entry" />
            </div>
        </div>

        <div className="icon-category" id="read-icon-category">
            <div className="icon-nav-bar">
                <span className="tooltip">{wording[lang].iconReadUser}</span>
                <UserPlusIcon id="read-a-entry-user" />
            </div>
            <div className="icon-nav-bar">
                <span className="tooltip">{wording[lang].iconReadPassword}</span>
                <UserKeyIcon id="read-a-entry-password" />
            </div>
        </div>

        <div className="icon-category" id="other-icon-category">
            <div className="icon-nav-bar">
                <span className="tooltip">{wording[lang].iconRngPassword}</span>
                <DicesIcon id="generate-a-password" onClick={_e => setWindow("rng-password")} />
            </div>
            <div className="icon-nav-bar">
                <span className="tooltip">{wording[lang].iconSettings}</span>
                <SettingsIcon id="modify-a-entry" onClick={_e => setWindow("settings")} />
            </div>
        </div>

    </div>
}

//<svg className="icon"></svg>

export default NavBar;