export const sessionPersistence = {
    delete: (keyName: string) => {
        sessionStorage.removeItem(keyName);
    },
    deleteAll: () => {
        const keys = Object.keys(sessionStorage);

        keys.forEach(key => {
            sessionStorage.removeItem(key);
        });
    },
    deleteArray: (keyNames: Array<string>) => {
        keyNames.forEach(key => sessionStorage.removeItem(key));
    },
    get: (keyName: string) => {
        const valueString = sessionStorage.getItem(keyName);

        return !!valueString ? JSON.parse(valueString) : null;
    },
    set: (keyName: string, value: Object) => {
        const valueString = JSON.stringify(value);

        sessionStorage.setItem(keyName, valueString);
    },
    setRawString: (keyName: string, rawString: string) => {
        sessionStorage.setItem(keyName, rawString);
    }
};