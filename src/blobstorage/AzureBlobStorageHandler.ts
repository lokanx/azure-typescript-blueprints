import {BlobService, ServiceResponse} from "azure-storage";
import {Writable} from "stream";
import * as fs from 'fs';
import {AsynchronousCallback} from "../common/typeDefinitions";



class AzureBlobStorageHandler {

  private readonly containerName: string = "MyContainer";
  private readonly storageAccountOrConnectionString: string = "<storageAccountOrConnectionString>";

  private service: BlobService = null;

  constructor(callback:AsynchronousCallback) {
    this.init(callback);
  }

  private init(callback: AsynchronousCallback): void {
    this.service = new BlobService(this.storageAccountOrConnectionString);
    this.service.createContainerIfNotExists(this.containerName, { 'publicAccessLevel': 'blob' },  (error: Error, result: BlobService.ContainerResult, response: ServiceResponse) => {
      if (error) {
        this.service = null;
        callback(error);
      } else {
        callback();
      }
    });
  }

  retrieveFile(blobName: string, writable: Writable, callback: AsynchronousCallback) : void {
    if (!this.service) {
      throw new Error("Blob storage offline");
    }


    this.service.getBlobToStream(this.containerName, blobName, writable, (error: Error, result: BlobService.BlobResult, response: ServiceResponse) => {
      if (error) {
        callback(error);
      } else {
        callback();
      }
    });
  }

  storeFile(blobName: string, filePath: string, callback: AsynchronousCallback) : void {
    if (!this.service) {
      throw new Error("Blob storage offline");
    }

    if (fs.existsSync(filePath)) {
      callback(new Error("File do not exist: " + filePath));
    }

    this.service.createBlockBlobFromLocalFile(this.containerName, blobName, filePath, (error: Error, result: BlobService.BlobResult, response: ServiceResponse) => {
        if (error) {
          callback(error);
        } else {
          callback();
        }
    });
  }

  deleteFile(callback: AsynchronousCallback): void {
    if (!this.service) {
      throw new Error("Blob storage offline");
    }

    // TODO: Implement me :)

    callback();
  }

  dropContainer(callback: AsynchronousCallback): void {
    if (!this.service) {
      throw new Error("Blob storage offline");
    }

    this.service.deleteContainerIfExists(this.containerName,  (error: Error, result: boolean, response: ServiceResponse) => {
      if (error) {
        callback(error);
      } else {
        callback();
      }
    });
  }
}
