import { Worder } from "../type";

interface Props {
    lang: string;
    wording: Worder;
    mod: string,
    selectedUID: string
}

function Entry({ lang, wording, mod, selectedUID }: Props) {
    return <div>entry {mod}</div>
}

export default Entry;