import { useEffect } from "react";
import { load } from "@tauri-apps/plugin-store";
import { useRequest } from "ahooks";

export enum StorageNameSpace {
  GACHA_ARCHIVE = "gacha_archive.json",
  GACHA_SETTING = "gacha_setting.json",
  APP_SETTING = "app_setting.json",
}

export async function getStorage(namespace: StorageNameSpace) {
  return await load(namespace, { autoSave: true });
}
/**
 *
 * @param namespace The namespace of the storage @see StorageNameSpace
 * @param key The key to be used in local kv storage.Generally, it's the type name in snake-case style, like `gacha_data`
 * @param defaultValue If there is no corresponding value for the specified key, use the `defaultValue` to init the local storage
 * @returns
 */
export default function useStorage<T>(
  namespace: StorageNameSpace,
  key: string,
  defaultValue: T,
): {
  storedValue: T | undefined;
  setValue: (value: T) => Promise<void>;
} {
  const fetchValue = async () => {
    const store = await getStorage(namespace);
    const value = await store.get<T>(key);
    if (value !== undefined && value !== null) {
      return value!;
    } else {
      await store.set(key, defaultValue);
      return defaultValue;
    }
  };

  const {
    data: storedValue,
    mutate,
    run,
  } = useRequest(fetchValue, {
    cacheKey: key,
  });

  useEffect(() => {
    run();
  }, [key]);

  const setValue: (value: T) => Promise<void> = async (value) => {
    const store = await getStorage(namespace); //Maybe it's better to use a global object to enhence performance?
    mutate(value);
    await store.set(key, value);
    await store.save();
  };

  return {
    storedValue,
    setValue,
  };
}
