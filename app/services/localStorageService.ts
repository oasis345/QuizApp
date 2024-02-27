class LocalStorageService {
  public store;

  constructor() {
    if (typeof window !== 'undefined') this.store = window.localStorage;
  }

  get(key: string) {
    if (!this.store) return;

    const storeData = this.store?.getItem(key);
    return storeData ? JSON.parse(storeData) : '';
  }

  set(key: string, item: any) {
    if (!this.store) return;

    this.store?.removeItem(key);
    this.store?.setItem(key, JSON.stringify(item));
  }
}

export const localStorageService = new LocalStorageService();
