import { Worder } from "../type";

interface Props {
    lang: string,
    wording: Worder
}

function Settings({lang, wording} : Props) {

    return <div>settings {lang}</div>
}

export default Settings;