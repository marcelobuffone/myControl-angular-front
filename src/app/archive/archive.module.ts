import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new/new.component';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchiveService } from './services/archive.service';
import { NgBrazil } from 'ng-brazil';
import { ArchiveRoutingModule } from './archive.route';
import { ArchiveAppComponent } from './archive.app.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    NewComponent,
    IndexComponent,
    ArchiveAppComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgBrazil,
    ArchiveRoutingModule
  ],
  providers: [
    ArchiveService
  ]
})

export class ArchiveModule { }
