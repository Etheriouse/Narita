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

export const uid_root: string = "19909a";

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
        {
            title: "Spotify",
            username: "lily.music",
            url: "https://www.spotify.com",
            notes: "Abonnement Premium Famille",
            uid: "narita@uid-4821-7834-12903",
            src: "",
        },
        {
            title: "Amazon",
            username: "lily.shop",
            url: "https://www.amazon.fr",
            notes: "Adresse principale enregistrée",
            uid: "narita@uid-9145-2783-44561",
            src: "",
        },
        {
            title: "Discord",
            username: "lily#4721",
            url: "https://discord.com",
            notes: "Compte principal",
            uid: "narita@uid-6654-9182-11098",
            src: "",
        }
    ],

    "0": [
        {
            title: "Gmail",
            username: "lily@gmail.com",
            url: "https://mail.google.com",
            notes: "Email principal",
            uid: "narita@uid-2245-6612-77890",
            src: "",
        },
        {
            title: "GitHub",
            username: "lily-dev",
            url: "https://github.com",
            notes: "Compte développement",
            uid: "narita@uid-3356-8921-66342",
            src: "",
        },
        {
            title: "Reddit",
            username: "u/lily_cat",
            url: "https://www.reddit.com",
            notes: "Compte perso",
            uid: "narita@uid-7765-2211-90453",
            src: "",
        },
        {
            title: "X",
            username: "@lily_online",
            url: "https://x.com",
            notes: "Compte réseaux sociaux",
            uid: "narita@uid-9012-5567-44321",
            src: "",
        },
        {
            title: "Proton Mail",
            username: "lily_secure",
            url: "https://mail.proton.me",
            notes: "Mail sécurisé",
            uid: "narita@uid-5421-8091-66213",
            src: "",
        }
    ],

    "1": [
        {
            title: "Steam",
            username: "LilyFox",
            url: "https://store.steampowered.com",
            notes: "Bibliothèque principale",
            uid: "narita@uid-1198-7765-23001",
            src: "",
        },
        {
            title: "Epic Games",
            username: "LilyEpic",
            url: "https://store.epicgames.com",
            notes: "Jeux gratuits hebdomadaires",
            uid: "narita@uid-4412-6678-91234",
            src: "",
        },
        {
            title: "Minecraft",
            username: "LilyCraft",
            url: "https://www.minecraft.net",
            notes: "Compte Microsoft lié",
            uid: "narita@uid-9981-2234-77452",
            src: "",
        },
        {
            title: "Riot Games",
            username: "Lily#EUW",
            url: "https://www.riotgames.com",
            notes: "League of Legends",
            uid: "narita@uid-7123-8890-66124",
            src: "",
        },
        {
            title: "PlayStation Network",
            username: "LilyPSN",
            url: "https://www.playstation.com",
            notes: "Compte PS5",
            uid: "narita@uid-5512-9911-40087",
            src: "",
        }
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
            name: "internet",
            src: "",
            uid: "0",
            open: true,
            childes: [
                {
                    name: "gaming",
                    src: "",
                    uid: "1",
                    open: false,
                    childes: []
                },
                {
                    name: "series",
                    src: "",
                    uid: "2",
                    open: false,
                    childes: [
                        {
                            name: "gaming",
                            src: "",
                            uid: "5",
                            open: false,
                            childes: [{
                                name: "gaming",
                                src: "",
                                uid: "4",
                                open: false,
                                childes: []
                            },]
                        }
                    ]
                },
                {
                    name: "social",
                    src: "",
                    uid: "3",
                    open: false,
                    childes: []
                }
            ]
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
    }

}

const Settings = {
    "wording": {
        "fr": {
            "title": "Titre",
            "username": "Nom d'utilisateur",
            "password": "Mots de passe",
            "url": "URL",
            "notes": "Notes",
            "rootFolder": "Racine",
            "vaultPassword": "Mots de passe de coffre",
            "unlock": "Deverouiller",
            "iconOpen": "Ouvrir le coffre",
            "iconSave": "Save folder",
            "iconLock": "Lock le coffre",
            "iconAddEntry": "Ajouter une entrer",
            "iconModifyEntry": "Modifier une entrer",
            "iconDeleteEntry": "Suprimer une entrer",
            "iconReadUser": "Copier le nom d'utilisateur",
            "iconReadPassword": "Copier le mots de passe",
            "iconRngPassword": "Generer un mots de passe",
            "iconSettings": "Paramtre",
            "modEntryadd": "Ajouter une entrer",
            "modEntrymod": "Modifier une entrer",
            "modEntrydel": "Supprimer une entrer",
            "exit": "Quitter",
            "apply": "Appliquer",
            "areUsureAboutThat": "Are u sure about that ?",
            "yesDel": "Yes i do",
            "noNevermind": "Hum, non nervermind",
            "ambigousCharSettings": "Exclude ambigous char",
            "asciiExtendCharSettings": "Include extended ASCII",
            "spaceCharSettings": "Include space char",
            "donotinclude": "Exclude these char",
            "doinclude": "Include these char",
            "lengthPassword": "Longueur",
            "entropy": "Entropie",
            "possiblity": "Posibliter",
            "timecrackReel": "Temps reel",
            "timecrackTheo": "Temps theorique",
            "years": "ans",
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
            "iconModifyEntry": "Modify entry",
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
            "areUsureAboutThat": "T'es sur de toi?",
            "yesDel": "Oui je le suis",
            "noNevermind": "Hum, enfaite non",
            "ambigousCharSettings": "Exclure les charactere ambigus",
            "asciiExtendCharSettings": "Inclure l'ASCII etendu",
            "spaceCharSettings": "Inclure le charactere espace",
            "donotinclude": "Inclure ces charactere",
            "doinclude": "Exclure ces charactrere",
            "lengthPassword": "Lenght",

        },
        "jp": {

        },
        "es": {

        }
    },
    "lang": [
        "fr",
        "en",
        "jp",
        "es"
    ],
    "selected-lang": "en",
    "user-settings": {
        "width_separator": 2000
    }
}