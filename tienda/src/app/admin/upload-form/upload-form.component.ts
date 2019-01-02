import {Component, Input, OnInit} from '@angular/core';
import {UploadService} from '@admin/upload.service';
import {Upload} from '../../models/upload';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  @Input() id;
  selecteFiles: FileList;
  currentFileUploaded: Upload;
  progress: {percentage: number} = {percentage: 0};

  constructor(
    public uploadService: UploadService
  ) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selecteFiles = event.target.files;
  }

  upload() {
    const file = this.selecteFiles.item(0);
    this.currentFileUploaded = new Upload(file);
    this.uploadService.pushFileToStorage(this.currentFileUploaded, this.progress, this.id);
  }
}
