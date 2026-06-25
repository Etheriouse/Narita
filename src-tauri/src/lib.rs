// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

// zeroize pour clear la ram apres dechiffrement mdp
// ssecrets avec mlock pour degager la pagination
// et mprotect pour segfault si qql dautre essaye de lire


// Like @Override its a identifier for function that can call by front
#[tauri::command]
// my function 
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


// Don't touch, tauri library
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
