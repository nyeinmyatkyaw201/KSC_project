import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormRecommandationModel } from './upload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  constructor(private apiService: ApiService,private api : ApiService,private router: Router,){}
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedFiles: any[] = [];
  imageUrls: string[] = [];
  filesToDelete: any[] = [];
  Recommandationdata: FormRecommandationModel = new FormRecommandationModel();
  
  ngOnInit(): void {
    this.loadUploadedFiles();
  }
  
  handleFileSelect(event: any): void {
    const files: FileList | null = event.target.files;
    if (files) {
      // Clear the existing imageUrls array
      this.imageUrls = [];
      
      for (let i = 0; i < files.length; i++) {
        const file: File = files.item(i) as File;
        this.uploadedFiles.push(file);
        this.getImageUrl(file);
      }
    }
  }
  getImageUrl(file: File): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrls.push(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  viewImage(index: number): void {
    const file = this.uploadedFiles[index];
    if (file && file.t1) {
      this.imageUrls = []; // Clear existing imageUrls array
      const imageUrl = file.t1;
      this.imageUrls.push(imageUrl); // Set the clicked image URL
    } else {
      console.error("Invalid file object:", file);
    }
  }

  saveFiles(): void {
    const formData = new FormData();
    this.uploadedFiles.forEach(file => {
      formData.append('t1', file);
    });

    formData.append('Recommendation_A_Member1_Number', this.Recommandationdata.Recommendation_A_Member1_Number);
    formData.append('Recommendation_A_Member1_Name', this.Recommandationdata.Recommendation_A_Member1_Name);
    formData.append('Recommendation_A_Member2_Number', this.Recommandationdata.Recommendation_A_Member2_Number);
    formData.append('Recommendation_A_Member2_Name', this.Recommandationdata.Recommendation_A_Member2_Name);

    const validFileIds = this.filesToDelete.filter(file => file && file.id !== undefined);

    if (validFileIds.length === 0) {
      console.log('No valid file IDs to delete');
      this.uploadFiles(formData);
      return;
    }

    validFileIds.forEach(file => {
      this.apiService.deletephoto(file.id).subscribe({
        next: (response: any) => {
          console.log('File deleted successfully:', response);
        },
        error: (error: any) => {
          console.error('Error deleting file:', error);
        }
      });
    });

    this.uploadFiles(formData);
  }

  uploadFiles(formData: FormData): void {
    this.apiService.upload(formData).subscribe({
      next: (response: any) => {
        console.log('Files uploaded successfully:', response);
        alert("Successfully uploaded");
        this.uploadedFiles = [];
        this.filesToDelete = [];
        this.loadUploadedFiles();
      },
      error: (error: any) => {
        console.error('Error uploading files:', error);
      }
    });
  }

  loadUploadedFiles(): void {
    this.apiService.Uploadedfile().subscribe((result: any) => {
      this.uploadedFiles = result.data;
      console.log(this.uploadedFiles);
    });
  }

  removeFile(index: number): void {
    const removedFile = this.uploadedFiles.splice(index, 1)[0];
    this.imageUrls.splice(index, 1);

    if (removedFile && removedFile.id !== undefined) {
      this.filesToDelete.push(removedFile);
    } else {
      console.warn('Invalid file ID:', removedFile);
    }
  }
  goback(){
    const parentid = this.api.parentid;
    this.router.navigateByUrl(`registration/${parentid}`)
  }
}
