import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/Services/file-upload.service';
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css'],
  standalone: false
})
export class UploadFilesComponent implements OnInit {
  selectedFiles: File[] = [];
  uploadedFilesUrls: { name: string; url: string }[] = [];
  @Input() orderId!: string;

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {
    this.loadExistingFiles();
  }

  async loadExistingFiles(): Promise<void> {
    if (!this.orderId) return;
    try {
      const storage = getStorage();
      const folderRef = ref(storage, `orders/${this.orderId}`);
      const fileList = await listAll(folderRef);

      this.uploadedFilesUrls = await Promise.all(
        fileList.items.map(async (item) => ({
          name: item.name,
          url: await getDownloadURL(item)
        }))
      );
    } catch (error) {
      console.error('Error loading existing files:', error);
    }
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      this.uploadFiles();
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.selectedFiles = Array.from(event.dataTransfer.files);
      this.uploadFiles();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  async uploadFiles(): Promise<void> {
    if (!this.orderId || this.selectedFiles.length === 0) return;

    try {
      const uploadPromises = this.selectedFiles.map(async (file) => {
        // Convert the Observable to a Promise
        const downloadUrl = await firstValueFrom(this.fileUploadService.uploadFile(file, this.orderId));
        this.uploadedFilesUrls.push({ name: file.name, url: downloadUrl });
        console.log('File uploaded:', file.name, 'URL:', downloadUrl);
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      console.error('File upload error:', error);
    } finally {
      this.selectedFiles = []; // Clear selected files after upload
    }
  }

  async removeFile(fileName: string): Promise<void> {
    if (!this.orderId) return;

    try {
      const storage = getStorage();
      const fileRef = ref(storage, `orders/${this.orderId}/${fileName}`);
      await deleteObject(fileRef);

      this.uploadedFilesUrls = this.uploadedFilesUrls.filter(file => file.name !== fileName);
      console.log(`${fileName} has been removed.`);
    } catch (error) {
      console.error(`Error deleting file (${fileName}):`, error);
    }
  }
}
