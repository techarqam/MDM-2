import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/Services/mainService/main-service.service';

@Component({
  selector: 'app-add-fields',
  templateUrl: './add-fields.component.html',
  styleUrls: ['./add-fields.component.scss'],
})
export class AddFieldsComponent implements OnInit {

  constructor(
    public mainService: MainServiceService
  ) { }

  ngOnInit() { }

  selectType(type) {    
    console.log(type);
  }


  onSubmit() {
    let temp = this.mainService.masterField;
  }

}
