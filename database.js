const dbName = "TestDatabase"
indexedDB.deleteDatabase(dbName); // Debugging, only works within a session
const request = indexedDB.open(dbName);
let db;

request.onsuccess = (event) => {
    db = event.target.result;
    console.log(dbName, "opened!");
};

request.onerror = (event) => {
    console.error(dbName, "error:", event);
};

request.onupgradeneeded = (event) => {
    const db = event.target.result;

    const objectStore = db.createObjectStore("pages", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("url", "url", { unique: false });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "addPage") {
        addPage(request.url).then(sendResponse);
        return true;
    }
  
    if (request.action === "printPages") {
        printPages().then(sendResponse);
        return true;
    }
});

function addPage(url) {
    return new Promise((resolve) => {
        const transaction = db.transaction(["pages"], "readwrite");
        const store = transaction.objectStore("pages");
        store.add({ url: url});
        resolve("added");
    });
}

function printPages() {
    return new Promise((resolve) => {
        const transaction = db.transaction(["pages"], "readonly");
        const store = transaction.objectStore("pages");
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
    });
}