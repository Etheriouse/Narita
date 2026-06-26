import { FolderOpenDotIcon, SaveIcon, FileLockIcon, FilePlusCornerIcon, FilePenIcon, Trash2Icon, UserPlusIcon, UserKeyIcon, DicesIcon, SettingsIcon } from 'lucide-react';
import './css/NavBar.css';

function NavBar() {

    return <div id="nav-bar-main">
        <div className="icon-category" id="vault-icon-category">
            <div className="icon-nav-bar">
                <FolderOpenDotIcon id="open-a-vault" />
            </div>
            <div className="icon-nav-bar">
                <SaveIcon id="save-a-vault" />
            </div>

            <div className="icon-nav-bar">
                <FileLockIcon id="lock-a-vault" />
            </div>
        </div>

        <div className="icon-category" id="entry-icon-category">
            <div className="icon-nav-bar">
                <FilePlusCornerIcon id="add-a-entry" />
            </div>
            <div className="icon-nav-bar">
                <FilePenIcon id="modify-a-entry" />
            </div>
            <div className="icon-nav-bar">
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
                <DicesIcon id="generate-a-password" />
            </div>
            <div className="icon-nav-bar">
                <SettingsIcon id="modify-a-entry" />
            </div>
        </div>

    </div>
}

//<svg className="icon"></svg>

export default NavBar;