// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

// zeroize pour clear la ram apres dechiffrement mdp
// ssecrets avec mlock pour degager la pagination
// et mprotect pour segfault si qql dautre essaye de lire

use serde::Serialize;
use std::collections::HashMap;

#[derive(Serialize)]
struct Password {
    title: String,
    username: String,
    url: String,
    notes: String,
    src: String,
    uid: String,
}

type Wording = HashMap<String, HashMap<String, String>>;

// Like @Override its a identifier for function that can call by front
#[tauri::command]
fn get_passwords() -> Vec<Password> {
    return vec![Password {
        title: "Google".into(),
        username: "user@gmail.com".into(),
        url: "https://google.com".into(),
        notes: "test".into(),
        src: "".into(),
        uid: "1".into(),
    }, Password {
        title: "Google".into(),
        username: "user@gmail.com".into(),
        url: "https://google.com".into(),
        notes: "test".into(),
        src: "".into(),
        uid: "2".into(),
    }, Password {
        title: "Google".into(),
        username: "user@gmail.com".into(),
        url: "https://google.com".into(),
        notes: "test".into(),
        src: "".into(),
        uid: "32".into(),
    }, Password {
        title: "Google".into(),
        username: "user@gmail.com".into(),
        url: "https://google.com".into(),
        notes: "test".into(),
        src: "".into(),
        uid: "4".into(),
    }, Password {
        title: "Google".into(),
        username: "user@gmail.com".into(),
        url: "https://google.com".into(),
        notes: "test".into(),
        src: "".into(),
        uid: "5".into(),
    }];
}

#[tauri::command]
fn wording() -> Wording {
    let mut root = HashMap::new();

    let mut fr = HashMap::new();
    fr.insert("title".into(), "Titre".into());
    fr.insert("username".into(), "Utilisateur".into());

    let mut en = HashMap::new();
    en.insert("title".into(), "Title".into());
    en.insert("username".into(), "Username".into());

    root.insert("fr".into(), fr);
    root.insert("en".into(), en);

    return root;
}

// Don't touch, tauri library
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_passwords, wording])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
