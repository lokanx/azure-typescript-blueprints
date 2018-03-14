# Azure Typescript Blueprints - Blob Storage

### Connect to blob storage

```Typescript
init(callback: AsynchronousCallback): void {
    let service = new BlobService("<storageAccountOrConnectionString>");
    service.createContainerIfNotExists(
                    "<containerName>", 
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