import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/Services/mainService/main-service.service';
import { CommonService } from 'src/app/Services/commonService/common.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-masters',
  templateUrl: './add-masters.component.html',
  styleUrls: ['./add-masters.component.scss'],
})
export class AddMastersComponent implements OnInit {
  docExists: boolean = false;
  checkingDoc: boolean = false;
  btnText = "Add Master";
  constructor(
    public mainService: MainServiceService,
    public commonService: CommonService,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  onSubmit() {
    if (this.mainService.master.valid) {
      let temp = this.mainService.master.value;
      this.mainService.addMaster(temp).then(() => {
        this.mainService.master.reset();
        this.close();
      });
    } else {
      this.commonService.presentToast("Master not valid")
    }
  }
  checkDoc(docName) {
    this.checkingDoc = true;
    this.btnText = "Checking Collection";
    if (docName) {
      this.mainService.checkIfDocExists(docName).then(result => {
        if (!result) {
          this.docExists = true;
        } else {
          this.docExists = false;
        }

        this.btnText = "Add Master";
        this.checkingDoc = false;
      });
    }
  }
  close() {
    this.modalCtrl.dismiss();
  }
}
