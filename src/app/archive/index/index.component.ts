import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Archive } from '../models/archive';
import { ArchiveService } from '../services/archive.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  public archives: Archive[];
  errorMessage: string;
  fileSelectedToDelete: string;

  archiveSelectedToDelete: string;

  errors: any[] = [];


  constructor(private archiveService: ArchiveService,
              private modalService: NgbModal,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.archiveService.getAll()
      .subscribe(
        archives => this.archives = archives,
        error => this.errorMessage);
  }

  openModal(content, id) {
    this.archiveSelectedToDelete = id;
    this.modalService.open(content);
  }

  deleteFile() {

    if (this.archiveSelectedToDelete) {
      this.archiveService.DeleteArchive(this.archiveSelectedToDelete)
        .subscribe(
          payment => { this.deleteSucess(payment) },
          error => { this.fail(error) }
        );
    }
    this.modalService.dismissAll();
  }

  deleteSucess(evento: any) {
    let toast = this.toastr.success('Payment deleted with success!', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  fail(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('an error has occurred!', 'Oops :(');
  }
}