# Azure Typescript Blueprints - Blob Storage

### Connect to blob storage

```Typescript
connectAndCreateContainer(callback: Function): void {
    let service = new BlobService("<StorageAccountOrConnectionString>");
    service.createContainerIfNotExists(
                    "<ContainerName>", 
                    { 'publicAccessLevel': 'blob' },  
                    (error: Error, result: BlobService.ContainerResult, response: ServiceResponse) => {
      if (error) {
        callback(error);
      } else {
        callback();
      }
    });
  }
```

For a more complete example, see [AzureBlobStorageHandler.ts](AzureBlobStorageHandler.ts)