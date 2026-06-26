import { isTauri } from "@tauri-apps/api/core";
import { invoke as TauriInvoke } from "@tauri-apps/api/core";
import { Worder } from "./type";


export async function invoke<T = unknown>(fun: string, args?: any): Promise<T> {
    if (isTauri()) {
        console.log(`${fun} is called by rust`);
        return TauriInvoke(fun, args);
    }
    console.log(`${fun} is called by front`);
    const mock = MockApi[fun as keyof typeof MockApi];
    if (mock) {
        return mock() as T;
    }
    throw new Error(`Mock API '${fun}' not found`);
}

const MockApi = {
    "getPasswords": (): Array<object> => {
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
                uid: "narita@uid-5678-1234-9012"

            },
            {
                title: "netflix",
                username: "lily",
                url: "http",
                notes: "bla bla",
                uid: "narita@uid-9012-5678-a1234"

            },
                        {
                title: "netflix",
                username: "lily",
                url: "http",
                notes: "bla bla",
                uid: "narita@uid-901d2-5678-12f34"

            },
                        {
                title: "netflix",
                username: "lily",
                url: "http",
                notes: "bla bla",
                uid: "narita@uid-9012-56s7a8-1234"

            },
                        {
                title: "netflix",
                username: "lily",
                url: "http",
                notes: "bla bla",
                uid: "narita@uid-9012-56s78-1234"

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
                uid: "narita@uid-9012-56s1728-1234"

            },
        ]
    },
    "wording": (): Worder => {
        return {
            fr: {
                title: "Titre",
                username: "Nom d'utilisateur",
                url: "URL",
                notes: "Notes",
                src: "",
            },
            en: {
                title: "Title",
                username: "Username",
                url: "URL",
                notes: "Notes",
                src: "",
            }
        }
    }
}