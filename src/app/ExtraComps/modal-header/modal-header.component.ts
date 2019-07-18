import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent implements OnInit {
  name: string = this.navParams.get("name");

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
  ) { }

  ngOnInit() { }



  close() {
    this.modalCtrl.dismiss();
  }

}
