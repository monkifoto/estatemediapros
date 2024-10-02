import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/Services/file-upload.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css'],
})
export class UploadFilesComponent implements OnInit {
  selectedFiles: File[] = [];
  uploadedFilesUrls: { name: string, url: string }[] = [];  // List to store file URLs and names
  @Input() orderId!: string;

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit() {
    this.loadExistingFiles();
  }

  // Fetch existing files for this order from Firebase
  loadExistingFiles() {
    this.fileUploadService.getFilesForOrder(this.orderId).subscribe(files => {
      this.uploadedFilesUrls = files;
    });
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      this.uploadFiles();  // Automatically start uploading the files
    }
  }

  onDrop(event: any) {
    event.preventDefault();
    this.selectedFiles = Array.from(event.dataTransfer.files);
    this.uploadFiles();  // Automatically start uploading the files
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  // Automatically upload files when selected/dropped
  uploadFiles(): void {
    this.selectedFiles.forEach((file) => {
      this.fileUploadService.uploadFile(file, this.orderId).subscribe(
        (downloadUrl) => {
          // Add the uploaded file's URL and name to the list for display
          this.uploadedFilesUrls.push({ name: file.name, url: downloadUrl });
          console.log('File uploaded, URL:', downloadUrl);
        },
        (error) => {
          console.error('File upload error:', error);
        }
      );
    });
    // Clear the selectedFiles array after starting upload
    this.selectedFiles = [];
  }

  // Remove file from Firebase storage and the gallery
  removeFile(fileName: string): void {
    this.fileUploadService.deleteFile(fileName, this.orderId).subscribe(() => {
      // Remove the file from the gallery after successful deletion
      this.uploadedFilesUrls = this.uploadedFilesUrls.filter(file => file.name !== fileName);
      console.log(`${fileName} has been removed.`);
    });
  }
}
