import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxsAsyncStoragePluginModule } from '@ngxs-labs/async-storage-plugin';
import { NgxsIonicStorageService } from './ngxs-ionic-storage.service';
import { IonicStorageModule, StorageConfig } from '@ionic/storage';
import { NgxsIonicStorageConfiguration } from './ngxs-ionic-storage.configuration';
import { NgxsStoragePluginOptions } from '@ngxs-labs/async-storage-plugin/lib/symbols';

@NgModule({
  imports: [
    NgxsAsyncStoragePluginModule,
    IonicStorageModule
  ],
  exports: [
    NgxsAsyncStoragePluginModule,
    IonicStorageModule
  ]
})
export class NgxsIonicStorageModule {
  static forRoot(options: NgxsIonicStorageConfiguration = {}): ModuleWithProviders<NgxsIonicStorageModule> {

    const ngxsAsyncStoragePluginConfig = {} as NgxsStoragePluginOptions;
    if (options.key != null) {
      ngxsAsyncStoragePluginConfig.key = options.key;
    }

    const ngxsStorageConfig = {} as StorageConfig;
    if (options.name != null) {
      ngxsStorageConfig.name = options.name;
    }
    if (options.storeName != null) {
      ngxsStorageConfig.storeName = options.storeName;
    }
    if (options.version != null) {
      ngxsStorageConfig.version = options.version;
    }
    if (options.driverOrder != null) {
      ngxsStorageConfig.driverOrder = options.driverOrder;
    }
    if (options.description != null) {
      ngxsStorageConfig.description = options.description;
    }

    const moduleProviders = NgxsAsyncStoragePluginModule.forRoot(NgxsIonicStorageService, ngxsAsyncStoragePluginConfig).providers;
    moduleProviders.push(...IonicStorageModule.forRoot(ngxsStorageConfig).providers);
    return {
      ngModule: NgxsIonicStorageModule,
      providers: moduleProviders
    };
  }
}
