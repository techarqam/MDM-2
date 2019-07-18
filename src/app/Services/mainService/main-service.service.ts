import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  master = new FormGroup({
    masterName: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(3)
    ])),
    collectionName: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(3)
    ])),
    timestamp: new FormControl(moment().format()),
  });

  masterFieldType = new FormGroup({
    controlType: new FormControl(""),
  });

  masterField = new FormGroup({
    controlType: new FormControl(""),
    key: new FormControl(""),
    label: new FormControl(""),
    maxLength: new FormControl(""),
    minLength: new FormControl(""),
    order: new FormControl(""),
    required: new FormControl(""),
    type: new FormControl(""),
    value: new FormControl(""),
    timestamp: new FormControl(moment().format()),
  });



  constructor(
    public db: AngularFirestore,
  ) { }

  addMaster(data) {
    return this.db.collection("Forms").doc(data.collectionName.toLowerCase()).set({ masterName: data.masterName, timestamp: data.timestamp });
  }
  checkIfDocExists(doc) {
    return new Promise((resolve, reject) => {
      this.db.collection("Forms").doc(doc).get().subscribe(snap => {
        if (!snap.exists) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }

  getMasters() {
    return this.db.collection("Forms").snapshotChanges();
  }

  getSingleMaster(masterCollection) {
    return this.db.collection("Forms").doc(masterCollection).snapshotChanges();
  }
  getMasterFields(masterCollection) {
    return this.db.collection("Forms").doc(masterCollection).collection("Fields", ref => ref.orderBy('order', 'asc')).valueChanges();
  }
  addSlaveData(masterCollection, data) {
    return this.db.collection(masterCollection).add(data);
  }
  getSlaveData(masterCollection) {
    return this.db.collection(masterCollection).snapshotChanges();
  }
  delSlave(masterCollection, id) {
    return this.db.collection(masterCollection).doc(id).delete();
  }
}
