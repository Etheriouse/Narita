import { useRef } from "react";
import { invoke } from "../invoke";
import { Worder } from "../type";
import './css/Login.css'

interface Props {
    lang: string;
    wording: Worder;
    unlock: (s: boolean) => void;
}

function Login({ lang, wording, unlock }: Props) {

    const vaultPassword = useRef<HTMLInputElement>(null);

    async function verifyVaultPassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const password = new FormData(form).get("vault-password") as string
        const result: boolean = await invoke('verify_hash_password', password);
        setTimeout(() => {
            if (result) {
                unlock(result);
            } else {
                if (vaultPassword.current) {
                    vaultPassword.current.classList.remove('incorrect');
                    vaultPassword.current.offsetWidth;
                    vaultPassword.current.classList.add('incorrect');
                }
            }
        }, 350);
    }

    return <div id='login-container'>
        <form onSubmit={verifyVaultPassword}>
            <label id="vault-password-label" htmlFor="vault-password">
                {wording[lang].vaultPassword}
            </label>
            <input ref={vaultPassword} onClick={_e => vaultPassword.current ? vaultPassword.current.classList.remove('incorrect') : ''} type="password" id="vault-password" name="vault-password"></input>
            <button type='submit'>{wording[lang].unlock}</button>
        </form>
    </div>
}

export default Login;