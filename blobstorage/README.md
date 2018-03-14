# Azure Typescript Blueprints - Blob Storage

### Connect to blob storage

```Typescript
connectAndCreateContainer(callback: AsynchronousCallback): void {
    let service = new BlobService("<StorageAccountOrConnectionString>");
    service.createContainerIfNotExists(
                    "<ContainerName>", 
                    { 'publicAccessLevel': 'blob' },  
                    (error: Error, result: BlobService.ContainerResult, response: ServiceResponse) => {
      if (error) {
        this.service = null;
        callback(error);
      } else {
        callback();
      }
    });
  }
```