"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const azure_storage_1 = require("azure-storage");
const fs = require("fs");
class AzureBlobStorageHandler {
    constructor(callback) {
        this.containerName = "MyContainer";
        this.storageAccountOrConnectionString = "<storageAccountOrConnectionString>";
        this.service = null;
        this.init(callback);
    }
    init(callback) {
        this.service = new azure_storage_1.BlobService(this.storageAccountOrConnectionString);
        this.service.createContainerIfNotExists(this.containerName, { 'publicAccessLevel': 'blob' }, (error, result, response) => {
            if (error) {
                this.service = null;
                callback(error);
            }
            else {
                callback();
            }
        });
    }
    retrieveFile(blobName, writable, callback) {
        if (!this.service) {
            throw new Error("Blob storage offline");
        }
        this.service.getBlobToStream(this.containerName, blobName, writable, (error, result, response) => {
            if (error) {
                callback(error);
            }
            else {
                callback();
            }
        });
    }
    storeFile(blobName, filePath, callback) {
        if (!this.service) {
            throw new Error("Blob storage offline");
        }
        if (fs.existsSync(filePath)) {
            callback(new Error("File do not exist: " + filePath));
        }
        this.service.createBlockBlobFromLocalFile(this.containerName, blobName, filePath, (error, result, response) => {
            if (error) {
                callback(error);
            }
            else {
                callback();
            }
        });
    }
    deleteFile(callback) {
        if (!this.service) {
            throw new Error("Blob storage offline");
        }
        // TODO: Implement me :)
        callback();
    }
    dropContainer(callback) {
        if (!this.service) {
            throw new Error("Blob storage offline");
        }
        this.service.deleteContainerIfExists(this.containerName, (error, result, response) => {
            if (error) {
                callback(error);
            }
            else {
                callback();
            }
        });
    }
}
//# sourceMappingURL=AzureBlobStorageHandler.js.map