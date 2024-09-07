export const DBConfig = {
  name: "UserDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "users",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: 'username', keypath: 'username', options: { unique: true } },
        { name: 'email', keypath: 'email', options: { unique: true } },
        { name: 'password', keypath: 'password', options: { unique: false } },
        { name: 'isBlocked', keypath: 'isBlocked', options: { unique: false } },
        { name: 'logins', keypath: 'logins', options: { unique: false } },
      ],
    },
  ],
};

