import { isTauri } from "@tauri-apps/api/core";
import { invoke as TauriInvoke } from "@tauri-apps/api/core";


export async function invoke<T = unknown>(fun: string, args?: any): Promise<T> {
    if(isTauri()) {
        return TauriInvoke(fun, args);
    }
    console.log(`${fun} is called by front`);
    return undefined as T;
}