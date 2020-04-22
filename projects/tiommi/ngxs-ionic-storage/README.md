# NgxsIonicStorage

It's an NGXS Storage Plugin implementation made for using IonicStorage

It make possible to automatically save your NGXS state in any of this storages:

 * SQLite
 * IndexedDB
 * WebSQL
 * LocalStorage

## Config Options

| PROPERTY | TYPE | DEFAULT VALUE | DESCRIPTION |
|:--------:|:----:|:-------------:|:-----------:|
| __key__ | `string` | _@@STORE_ | Main key name |
| __name__ | `string` | _\_ionicstorage_ | Storage name;
| __version__ | `number` | 1.0 | Storage version, needed for storage updates |
| __storeName__ | `string` | _\_ionickv_ | Main store name | 
| __description__ | `string` | | Storage description |
| __driverOrder__ | `string[]` | _\['sqlite', 'indexeddb', 'websql', 'localstorage']_ | Indicates the storage order preferences, it tries to save in the first storage, if it's impossibile it tries on the next and so on. |

for more informations check out the [IonicStorage original documentation](https://www.ngxs.io/plugins/storage#options)

## Built With

* [Angular](https://angular.io/) _vers. 9.0_ - Platform for building mobile and desktop web applications
* [IonicStorage](https://ionicframework.com/docs/angular/storage) - Library to store key/value pairs and JSON objects 
* [NGXS](https://www.ngxs.io/) - State management pattern + library for Angular
* [NGXS Async Storage Plugin](https://github.com/ngxs-labs/async-storage-plugin) - NGXS Plugin to persist the state on the client asynchronously

## Authors 

* __Thomas Iommi__ - _Initial work_ - [GitHub](https://github.com/ThomasIommi)

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENCE.md) file for details
