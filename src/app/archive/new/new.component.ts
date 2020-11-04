import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper/lib/interfaces';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ArchiveBaseComponent } from '../archive-form.base.component';
import { Archive } from '../models/archive';
import { ArchiveService } from '../services/archive.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent extends ArchiveBaseComponent implements OnInit {

  imagens: string = environment.imagensUrl;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string;
  imagemNome: string;
  archive: Archive;

  constructor(private fb: FormBuilder,
    private archiveService: ArchiveService,
    private toastr: ToastrService,
    private router: Router) { super(); }

  ngOnInit(): void {

    this.archiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      imagem: [''],
    });
  }

  ngAfterViewInit(): void {
    super.configureFormBaseValidators(this.formInputElements);
  }

  newArchive() {
    if (this.archiveForm.dirty) {
      this.archive = Object.assign({}, this.archive, this.archiveForm.value);

      this.archive.imagemUpload = this.croppedImage.split(',')[1];
      this.archive.imagem = this.imagemNome;
      this.archiveService.newArchive(this.archive)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.hasChanges = false;
    }
  }


  processarSucesso(response: any) {
    this.archiveForm.reset();
    this.errors = [];

    this.hasChanges = false;

    let toast = this.toastr.success('Payment registered with success!', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/archive']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    this.errors.push('O formato do arquivo ' + this.imagemNome + ' não é aceito.');
  }
}
