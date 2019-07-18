import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainServiceService } from 'src/app/Services/mainService/main-service.service';
import { Observable } from 'rxjs';
import { AddFieldsComponent } from '../add-fields/add-fields.component';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/Services/commonService/common.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-fields',
  templateUrl: './view-fields.component.html',
  styleUrls: ['./view-fields.component.scss'],
})
export class ViewFieldsComponent implements OnInit {

  masterCollection: string;
  master;
  // Slave Data
  slaveData: Observable<any>;
  // Fields 
  masterFields: Observable<any>;
  ldngFields: boolean = true;

  questions: Array<any> = [];
  mdmForm: FormGroup;

  constructor(
    public router: ActivatedRoute,
    public mainService: MainServiceService,
    public fb: FormBuilder,
    public modalCtrl: ModalController,
    public commonService: CommonService,
    public alertCtrl: AlertController,
  ) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.masterCollection = params['mastername'];
      this.getMaster(params['mastername']);
      this.getMasterFields(params['mastername']);
      this.getSlaveData(params['mastername']);
    });
    // this.addField();
  }
  getMaster(masterCollection) {
    this.mainService.getSingleMaster(masterCollection).subscribe(snap => {
      this.master = snap.payload.data();
      this.master.id = snap.payload.id;
    })
  }
  getMasterFields(masterCollection) {
    let group: any = {};
    this.mainService.getMasterFields(masterCollection).subscribe(snap => {
      this.questions = snap;
      this.questions.forEach(question => {
        let valArr: Array<any> = [];
        if (question.required) { valArr.push(Validators.required); }
        if (question.pattern) { valArr.push(Validators.pattern(question.pattern)); }
        if (question.minLength) { valArr.push(Validators.minLength(question.minLength)); }
        if (question.maxLength) { valArr.push(Validators.maxLength(question.maxLength)); }
        group[question.key] =
          question.required ?
            new FormControl(question.value || '', Validators.compose(valArr))
            : new FormControl(question.value || '');
      });
      group.timestamp = new FormControl(moment().format());
      this.mdmForm = this.fb.group(group);
    });
  }
  async addField() {
    const modal = await this.modalCtrl.create({
      component: AddFieldsComponent,
      componentProps: {
        name: "Add Field for " + this.master.masterName
      }
    });
    return await modal.present();
  }


  onSubmit() {
    let temp = this.mdmForm.value;
    if (this.mdmForm.valid) {
      this.mainService.addSlaveData(this.masterCollection, temp).then(() => {
        this.mdmForm.reset();
      });
    } else {
      console.log(this.mdmForm.value)
      this.commonService.presentToast("Try again");
    }
  }
  getSlaveData(masterCollection) {
    this.slaveData = this.mainService.getSlaveData(masterCollection);
  }
  async delSlaveConfirm(slaveId, slaveData) {
    const alert = await this.alertCtrl.create({
      header: 'Delete ' + slaveData.name + '? ',
      message: 'This action cannot be recovered.',
      buttons: [
        {
          text: 'No, Its a mistake',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes, I understand',
          handler: () => {
            this.mainService.delSlave(this.masterCollection, slaveId).then(() => {
              this.commonService.presentToast(slaveData.name + " has been deleted");
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
