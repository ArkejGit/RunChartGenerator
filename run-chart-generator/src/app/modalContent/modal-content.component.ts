import { Component, Input, Injectable } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
@Component({
  selector: 'modal-content',
  templateUrl: './modal-comtent.component.html'
})
export class ModalContent {
  @Input() link;

  constructor(public activeModal: NgbActiveModal) {}
}