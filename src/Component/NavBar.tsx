import { FolderOpenDotIcon, SaveIcon, FileLockIcon, FilePlusCornerIcon, FilePenIcon, Trash2Icon, UserPlusIcon, UserKeyIcon, DicesIcon, SettingsIcon } from 'lucide-react';
import './css/NavBar.css';
import { Worder } from '../type';

interface Props {
    lang: string,
    wording: Worder,
    window: string,
    setWindow: (e: string) => void;
    unlock: (e: boolean) => void;
}

function NavBar({ lang, wording, window, setWindow, unlock }: Props) {

    return <div id="nav-bar-main">
        <div className="icon-category" id="vault-icon-category">
            <div className="icon-nav-bar">
                <FolderOpenDotIcon id="open-a-vault" />
            </div>
            <div className="icon-nav-bar">
                <SaveIcon id="save-a-vault" />
            </div>

            <div className="icon-nav-bar" onClick={_e => unlock(false)}>
                <FileLockIcon id="lock-a-vault" />
            </div>
        </div>

        <div className="icon-category" id="entry-icon-category">
            <div className="icon-nav-bar">
                <FilePlusCornerIcon id="add-a-entry" onClick={_e => setWindow("entry=add")} />
            </div>
            <div className="icon-nav-bar" onClick={_e => setWindow("entry=mod")}>
                <FilePenIcon id="modify-a-entry" />
            </div>
            <div className="icon-nav-bar" onClick={_e => setWindow("entry=del")}>
                <Trash2Icon id="delete-a-entry" />
            </div>
        </div>

        <div className="icon-category" id="read-icon-category">
            <div className="icon-nav-bar">
                <UserPlusIcon id="read-a-entry-user" />
            </div>
            <div className="icon-nav-bar">
                <UserKeyIcon id="read-a-entry-password" />
            </div>
        </div>

        <div className="icon-category" id="other-icon-category">
            <div className="icon-nav-bar">
                <DicesIcon id="generate-a-password" onClick={_e => setWindow("rng-password")}/>
            </div>
            <div className="icon-nav-bar">
                <SettingsIcon id="modify-a-entry" onClick={_e => setWindow("settings")}/>
            </div>
        </div>

    </div>
}

//<svg className="icon"></svg>

export default NavBar;