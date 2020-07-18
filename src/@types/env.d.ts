declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTION_NAME: string;
    }
  }
}

export {};
