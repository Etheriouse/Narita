import { isTauri } from "@tauri-apps/api/core";
import { invoke as TauriInvoke } from "@tauri-apps/api/core";
import { Worder } from "./type";
import { Folder } from "./Component/ExploratorSide";


export async function invoke<T = unknown>(
    fun: string,
    ...args: any[]
): Promise<T> {
    if (isTauri()) {
        console.log(`${fun} is called by rust`);
        return TauriInvoke(fun, args);
    }

    console.log(`${fun} is called by front`);

    const mock = MockApi[fun as keyof typeof MockApi] as
        ((...args: any[]) => any) | undefined;

    if (mock) {
        return mock(...args) as T;
    }

    throw new Error(`Mock API '${fun}' not found`);
}

export interface Entry {
    title: string,
    username: string,
    url: string,
    notes: string,
    src: string,
    uid: string,
}

export const uid_root: string = "narita@root-folder-id";
export const not_uid: string = "narita@not-selected-id";

export interface Stat {
    width_separator: number
}

function getName(uid: string): Entry {
    for (const [_folder, array] of Object.entries(entrys)) {
        for (const ent of array) {
            if (ent.uid == uid) {
                return ent;
            }
        }
    }
    return {} as Entry;
}

const entrys: Record<string, Array<Entry>> = {
    [uid_root]: [
        {
            title: "Netflix",
            username: "lily",
            url: "https://www.netflix.com",
            notes: "Compte principal",
            uid: "narita@uid-5678-1234-90162",
            src: "",
        },

    ]
};

const MockApi = {
    get_entrys: (folder_uid: string): Array<Entry> => {
        return entrys[folder_uid];
    },
    save_entrys: (entrys: Array<Entry>, folder_uid: string) => {
        console.log(entrys);
    },
    wording: (): Worder => {
        return Settings["wording"] as Worder;
    },
    get_folder_tree: (): Folder => {
        return {

        } as Folder
    },
    save_folder_tree: (folder: Folder) => {
        console.log(folder);
    },
    verify_hash_password: (password: string) => {
        return password == "sakura";
    },
    get_one_entry: (folder_uid: string, uid: string): Entry => {
        return getName(uid);
    },
    save_one_entry: (folder_uid: string, uid: string): void => {

    },
    del_one_entry: (folder_uid: string, uid: string): void => {

    },
    save_stat: (stat: Stat) => {

    },
    load_stat: (): Stat => {
        return Settings["user-settings"] as Stat;
    },
    get_uid: (): string => {
        return 'trust-' + (new Date().getMilliseconds());
    },

    get_selected_lang: (): string => {
        return "en";
    },
    save_selected_lang: (s: string): void => {

    },
    get_langs: (): Array<string> => {
        return ["fr", "en", "jp", "es"];
    },
    get_name_vault: (): string => {
        return "Vault";
    },
    save_name_vault: (s: string): void => {
        console.log(s);
    }

}
const Settings = {
    "wording": {
        "fr": {
            "title": "Titre",
            "username": "Nom d'utilisateur",
            "password": "Mot de passe",
            "url": "URL",
            "notes": "Notes",
            "rootFolder": "Racine",
            "vaultPassword": "Mot de passe du coffre",
            "unlock": "Déverrouiller",
            "iconOpen": "Ouvrir le coffre",
            "iconSave": "Sauvegarder le dossier",
            "iconLock": "Verrouiller le coffre",
            "iconAddEntry": "Ajouter une entrée",
            "iconModifyEntry": "Modifier une entrée",
            "iconDeleteEntry": "Supprimer une entrée",
            "iconReadUser": "Copier le nom d'utilisateur",
            "iconReadPassword": "Copier le mot de passe",
            "iconRngPassword": "Générer un mot de passe",
            "iconSettings": "Paramètres",
            "modEntryadd": "Ajouter une entrée",
            "modEntrymod": "Modifier une entrée",
            "modEntrydel": "Supprimer une entrée",
            "exit": "Quitter",
            "apply": "Appliquer",
            "areUsureAboutThat": "T'es sur de toi?",
            "yesDel": "Oui je le suis",
            "noNevermind": "Hum, enfaite non",
            "ambigousCharSettings": "Exclure les caractères ambigus",
            "asciiExtendCharSettings": "Inclure l'ASCII étendu",
            "spaceCharSettings": "Inclure les espaces",
            "donotinclude": "Exclure ces caractères",
            "doinclude": "Inclure ces caractères",
            "lengthPassword": "Longueur",
            "entropy": "Entropie",
            "possiblity": "Possibilité",
            "timecrackReel": "Temps réel",
            "timecrackTheo": "Temps théorique",
            "years": "ans",
            "confirmRngPassword": "Confirmer",
            "shanonEntropy": "Entropie de Shanon",
            "newEntryName": "Nouvelle entrée",

            "fr": "Français",
            "en": "Anglais",
            "jp": "Japonais",
            "es": "Espagnol"
        },
        "en": {
            "title": "Title",
            "username": "Username",
            "password": "Password",
            "url": "URL",
            "notes": "Notes",
            "rootFolder": "Root",
            "vaultPassword": "Vault password",
            "unlock": "Unlock",
            "iconOpen": "Open vault",
            "iconSave": "Save folder",
            "iconLock": "Lock vault",
            "iconAddEntry": "Add entry",
            "iconModifyEntry": "Edit entry",
            "iconDeleteEntry": "Delete entry",
            "iconReadUser": "Copy username",
            "iconReadPassword": "Copy password",
            "iconRngPassword": "Generate password",
            "iconSettings": "Settings",
            "modEntryadd": "Add an entry",
            "modEntrymod": "Edit an entry",
            "modEntrydel": "Delete an entry",
            "exit": "Exit",
            "apply": "Apply",
            "areUsureAboutThat": "Are you sure about that?",
            "yesDel": "Yes, I am",
            "noNevermind": "Nevermind",
            "ambigousCharSettings": "Exclude ambiguous characters",
            "asciiExtendCharSettings": "Include extended ASCII",
            "spaceCharSettings": "Include space character",
            "donotinclude": "Exclude these characters",
            "doinclude": "Include these characters",
            "lengthPassword": "Length",
            "entropy": "Entropy",
            "possiblity": "Possibility",
            "timecrackReel": "Reel time crack",
            "timecrackTheo": "Theoric time crak",
            "years": "years",
            "confirmRngPassword": "Confirm",
            "shanonEntropy": "Shanon entropy",
            "newEntryName": "New entry",


            "fr": "French",
            "en": "English",
            "jp": "Japanese",
            "es": "Spanish"
        }
    },
    "lang": [
        "fr",
        "en",
        "jp",
        "es"
    ],
    "selected-lang": "en",
    "vault": {
        "name": "Vault",
        "path": "/tkt"
    },
    "user-settings": {
        "width_separator": 2000
    }
}