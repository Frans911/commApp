import { LoginPage } from './../login/login';
import { RegisterPage } from './../register/register';
import { FeedComponent } from './../../components/feed/feed';
import { Component } from '@angular/core';
import { NavController, InfiniteScroll, Refresher, MenuController, IonicPage, PopoverController } from 'ionic-angular';
import moment from 'moment';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/';
import { HttpClient } from '@angular/common/http';
import { NewsProvider } from './../../providers/news/news';

@IonicPage()
@Component({
  selector: 'page-noaccess',
  templateUrl: 'noaccess.html',
})
export class NoaccessPage {
  date: any;
  data: any;
  feeds = [];
  scroll: any;
  timeAgo;
  constructor(public popoverCtrl: PopoverController, public menuCtrl: MenuController, private inAppBrowser: InAppBrowser, public navCtrl: NavController, private apiData: NewsProvider, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoaccessPage');
    this.menuCtrl.enable(false, 'myMenu');
    this.loadApi();
  }

  loadApi() {
    //find more about time frames..
    //we used this for now bcoz current api doesnt have createdTime of the post.
    moment.locale('en');
    this.timeAgo = moment().startOf('hour').fromNow();


    console.log('HomeePage has loaded.. ');
    this.apiData.getApiData().subscribe(apidata => {
      console.log(apidata);
      this.data = apidata;
      //this.feeds.push(this.data);
      for (var i = 0; i < 10; i++) {
        this.feeds.push(this.data.articles[i]);
        this.data.articles[i].publishedAt = new Date().toDateString().substr(11, 6);
        var nn = this.data.articles[i].publishedAt;

        this.data.articles[i].publishedAt = new Date().toDateString().substr(0, 10) + ', ' + nn;
        console.log(this.data.articles[i].description);
      }
    });

    this.apiData.getW().subscribe(apidata => {
      console.log(apidata);
    });
  }

  // // Opening a URL and returning an InAppBrowserObject
  // const browser = this.inAppBrowser.create(url, '_self', options);

  // // Inject scripts, css and more with browser.X


  doRefresh(refresher: Refresher) {
    console.log('Begin async operation', refresher);
    this.feeds = []; //empty the array..set to default
    this.ionViewDidLoad(); //relaod and repopulate the feeds if theres new updates
    refresher.complete();
    setTimeout(() => {
      console.log('Async operation has ended');

    }, 2000);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(FeedComponent);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      try {
        if (popoverData.title == 'Register') {
          this.navCtrl.push('RegisterPage');

        } else if (popoverData.title == 'Login') {
          this.navCtrl.push('LoginPage');


        }
      } catch (error) {
        console.log("No item selected");
      }
    });
  }
}

