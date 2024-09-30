// src/app/admin/upload-files/upload-files.component.ts

import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/Services/file-upload.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css'],
})
export class UploadFilesComponent implements OnInit {
  selectedFiles: File[] = [];
  orderId: string = '';


  constructor(private fileUploadService: FileUploadService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the orderId from the route
    this.orderId = this.route.snapshot.paramMap.get('id')!;
  }

  // onFilesSelected(event: any): void {
  //   this.selectedFiles = Array.from(event.target.files);
  // }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files); // Convert FileList to an array
    }
  }

  onDrop(event: any) {
    event.preventDefault();
    this.selectedFiles = event.dataTransfer.files;
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  uploadFiles(): void {
    this.selectedFiles.forEach((file) => {
      this.fileUploadService.uploadFile(file, this.orderId).subscribe(
        (downloadUrl) => {
          console.log('File uploaded, URL:', downloadUrl);
        },
        (error) => {
          console.error('File upload error:', error);
        }
      );
    });
  }
}
