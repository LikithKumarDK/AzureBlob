import { Component } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CodeSandbox';


  async uploadFile(event: any) {
    const accountName = 'devzeusbusiness';
    const accountKey = 'aYljK4KUDwtLlWilW5SWBLB785jILGqdaASjFEgDkXgc59OvOAZ9ZFolQVoOf7vNZNTBuIhUF/YV+ASt02mxrQ==';
    const containerName = 'organizations';
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const file = event.target.files[0];
    const blobName = file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadBrowserData(file);
      console.log('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
}
