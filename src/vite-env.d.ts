/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GITHUB_USER_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
