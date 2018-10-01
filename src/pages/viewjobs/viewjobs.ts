
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { EventDetailsPage } from '../event-details/event-details';
import { HomePopoverComponent } from '../../components/home-popover/home-popover';


 declare var firebase;

@IonicPage()
@Component({
  selector: 'page-viewjobs',
  templateUrl: 'viewjobs.html',
})
export class ViewjobsPage {
  eventsList = [];
  categoryList=[];

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController) {

  }

  ionViewDidLoad() {
    this.getDataFromDB();
    console.log('ionViewDidLoad ViewEventPage');
  }
  addEvent(){
    this.navCtrl.push("AddjobPage");
  }

  getDataFromDB(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present(); 

    firebase.database().ref('/Jobs/').on('value', (snapshot) =>
    {
      snapshot.forEach((snap) =>
      {
        this.eventsList.push({_key : snap.key, EventCategory: snap.val().JobCategory, EventDate: snap.val().postClosingDate, EventName : snap.val().jobDescp, EventTime: snap.val().EventTime, downloadUrl: snap.val().downloadUrl});
       console.log(snap.val().downloadUrl);
       console.log(this.eventsList);
        return false;
      });
      this.categoryList = this.eventsList;
    });

    loading.dismiss();
    console.log(this.eventsList);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(HomePopoverComponent);
    popover.present({
     ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
      try {
        if(popoverData.name == 'Seminars and Conferences'){
          this.categoryList = [];

          for (let event of this.eventsList) {
            if(event.EventCategory == 'sc'){
              this.categoryList.push(event);

            }
          }
        }else if(popoverData.name == 'Trade Shows'){
          this.categoryList = [];

          for (let event of this.eventsList) {
            if(event.EventCategory == 'ts'){
              this.categoryList.push(event);

            }
          }
        }else if(popoverData.name == 'Executive Retreats and Incentive Programs'){
          this.categoryList = [];

          for (let event of this.eventsList) {
            if(event.EventCategory == 'ei'){
              this.categoryList.push(event);

            }
          }
        }else if(popoverData.name == 'Appreciation Events'){
          this.categoryList = [];

          for (let event of this.eventsList) {
            if(event.EventCategory == 'ae'){
              this.categoryList.push(event);

            }
          }
        }else if(popoverData.name == 'Sport Events'){
          this.categoryList = [];

          for (let event of this.eventsList) {
            if(event.EventCategory == 'se'){
              this.categoryList.push(event);

            }
          }
        }else if(popoverData.name == 'Product Launch Events'){
          this.categoryList = [];

          for (let event of this.eventsList) {
            if(event.EventCategory == 'pe'){
              this.categoryList.push(event);

            }
          }
        }else if(popoverData.name == 'Entertainment Events'){
          this.categoryList = [];

          for (let event of this.eventsList) {
            if(event.EventCategory == 'ee'){
              this.categoryList.push(event);

            }
          }
        }else if(popoverData.name == 'All Jobs'){
          
        }
      } catch (error) {
        console.log("No item selected");
      }
    });

  }
  eventDetails(event:any){

    console.log(event.EventCategory)

    this.navCtrl.push("EventDetailsPage",{event:event});
  }


}
