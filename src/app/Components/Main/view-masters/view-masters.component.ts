import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AddMastersComponent } from '../add-masters/add-masters.component';
import { MainServiceService } from 'src/app/Services/mainService/main-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-masters',
  templateUrl: './view-masters.component.html',
  styleUrls: ['./view-masters.component.scss'],
})
export class ViewMastersComponent implements OnInit {

  masters: Observable<any>;
  showLoader: boolean = true;
  constructor(
    public modalCtrl: ModalController,
    public mainService: MainServiceService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.getMasters();
  }
  getMasters() {
    this.masters = this.mainService.getMasters();
    this.masters.subscribe(() => this.showLoader = false);
  }

  async addMaster() {
    const modal = await this.modalCtrl.create({
      component: AddMastersComponent,
      componentProps: {
        name: "Add a Master"
      }
    });
    return await modal.present();
  }

  gtMasterDetails(collectionName) {
    this.navCtrl.navigateForward(`/master-details/${collectionName}`);
  }

}
