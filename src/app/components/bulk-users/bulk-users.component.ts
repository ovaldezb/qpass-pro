import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/bulk-users/file-upload.service';

@Component({
  selector: 'app-bulk-users',
  templateUrl: './bulk-users.component.html',
  styleUrls: ['./bulk-users.component.scss']
})
export class BulkUsersComponent implements OnInit {

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: any; // Variable to store file

  // Inject service 
  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          console.log(event);

          // Short link via api response
          this.shortLink = event.link;

          this.loading = false; // Flag variable 
        }
      }
    );
  }
}
