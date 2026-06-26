import { isTauri } from "@tauri-apps/api/core";
import { invoke as TauriInvoke } from "@tauri-apps/api/core";
import { Worder } from "./type";
import { Folder } from "./Component/ExploratorSide";


export async function invoke<T = unknown>(fun: string, args?: any): Promise<T> {
    if (isTauri()) {
        console.log(`${fun} is called by rust`);
        return TauriInvoke(fun, args);
    }
    console.log(`${fun} is called by front`);
    const mock = MockApi[fun as keyof typeof MockApi];
    if (mock) {
        return mock(args) as T;
    }
    throw new Error(`Mock API '${fun}' not found`);
}

const MockApi = {
    get_entrys: (): Array<object> => {
        return [
            {
                title: "Crunchyroll",
                username: "thomaslechatdu95@gmail.com",
                url: "https://crunchyroll.fr",
                notes: "Compte crunchyroll de thomas",
                uid: "narita@uid-1234-5678-9012"

            },
            {
                title: "netflix",
                username: "lily",
                url: "http",
                notes: "bla bla",
                uid: "narita@uid-5678-1234-90162"

            },
            {
                title: "netflix",
                username: "lily",
                url: "http",
                notes: "bla bla",
                uid: "narita@uid-9012-5678-a123214"

            },
            {
                title: "netflix",
                username: "lily",
                url: "http",
                notes: "bla bla",
                uid: "narita@uid-901d2-5678-12f3c4"

            },
            {
                title: "netflix",
                username: "lily",
                url: "http",
                notes: "bla bla",
                uid: "narita@uid-9012-56s7a8-12234"

            },
            {
                title: "netflix",
                username: "lily",
                url: "http",
                notes: "bla bla",
                uid: "narita@uid-9012-56s78-123sa4"

            },
            {
                title: "netflix",
                username: "lily",
                url: "http",
                notes: "bla bla",
                uid: "narita@uid-9012-56s728-1234"

            },
            {
                title: "netflix",
                username: "lily",
                url: "http",
                notes: "bla bla",
                uid: "narita@uid-9012-56s1728-123s4"

            },
        ]
    },
    save_entrys: (entrys: Array<Object>) => {
        console.log(entrys);

    },
    wording: (): Worder => {
        return {
            fr: {
                title: "Titre",
                username: "Nom d'utilisateur",
                url: "URL",
                notes: "Notes",
                src: "",
                rootFolder: 'Racine',
            },
            en: {
                title: "Title",
                username: "Username",
                url: "URL",
                notes: "Notes",
                src: "",
                rootFolder: 'Root',
            }
        }
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
    }
}