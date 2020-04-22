import { StorageKey } from '@ngxs-labs/async-storage-plugin/lib/internals';

/**
 * Ngxs Storage and Ionic Storage configuration
 */
export interface NgxsIonicStorageConfiguration {
  /** Storage key-value main key name */
  key?: undefined | StorageKey;
  /** Storage name */
  name?: string;
  /** Storage version, needed for storage updates */
  version?: number;
  /** Store name */
  storeName?: string;
  /** Storage description */
  description?: string;
  /** Indicates the storage order preferences, it tries to save in the first storage, if it's impossibile it tries on the next and so on */
  driverOrder?: string[];
}
