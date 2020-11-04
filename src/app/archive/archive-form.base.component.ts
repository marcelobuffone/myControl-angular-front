import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from '../base-component/form-base.component';
import { Archive } from './models/archive';


export abstract class ArchiveBaseComponent extends FormBaseComponent {
    
    errors: any[] = [];
    archiveForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            nome: {
                required: 'Name is required',
                minlength: 'Min 2 characters',
                maxlength: 'Max 50 characters'
            }
        }

        super.configureMessagesValidators(this.validationMessages);
    }

    protected configureFormBaseValidators(formInputElements: ElementRef[]) {
        super.configureFormBaseValidators(formInputElements, this.archiveForm);
    }
}