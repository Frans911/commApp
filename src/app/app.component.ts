import { WelcomePage } from './../pages/welcome/welcome';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoginPage } from './../pages/login/login';


import { sideMenuObj } from './../models/sideMenuPages.mocks';

import { userProfileObj } from './../models/userProfile.mocks';


import { HomePage } from './../pages/home/home';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsersPage } from '../pages/users/users';
import { Storage } from '@ionic/storage';
import 'firebase/auth';

declare var firebase;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  rootPage: any = 'WelcomePage';

  public pages: Array<{ icon: any, title: string, component: any }>;
  public userProfile: Array<{ username: any, photoURL: string }>;
  user;
  userPhotoURL;
  signedIn = false;

  constructor(public gplus: GooglePlus, public storage: Storage, public alertCtrl: AlertController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.splashScreen.hide();
    this.platform.ready().then(() => {

      var nvCtrl = this;
      this.statusBar.show();

      this.storage.get('activeUser').then((loggedUser) => {
        console.log('User-Logged is: ' + loggedUser)

        if (loggedUser != null) {
          //this.splashScreen.hide();
         
          this.storage.get('userDetails').then(user => {
            console.log('User-name is: ' + user.username);
            console.log('User-pic is: ' + user.picture);

            sideMenuObj.pop();
            userProfileObj.pop();
            let userProfile = [
              { username: user.username, photoURL: user.picture }
            ]
            userProfile.forEach(element => {
              userProfileObj.push(element);
            })
          })


          let pages = [
            { icon: 'calendar', title: 'Events', component: 'ViewEventPage' },
            { icon: 'clipboard', title: 'Reports', component: 'ListPage' },
            { icon: 'git-network', title: 'Suggestions', component: 'SuggestionPage' },
            { icon: 'globe', title: 'Jobs/Vacancies', component: 'ViewjobsPage' },
            { icon: 'flag', title: 'Report Member', component: 'ReportuserPage' },
            { icon: 'log-out', title: 'Sign Out', component: HomePage },
          ];

          pages.forEach(element => {
            sideMenuObj.push(element)
          });
          nvCtrl.nav.setRoot(HomePage);
        } else {
          nvCtrl.nav.setRoot(HomePage);
          //this.splashScreen.hide();
        }

      })
      this.splashScreen.hide();
    });
    this.pages = sideMenuObj;
    this.userProfile = userProfileObj;

  }

  currentUser(user: any) {
    var loggedUser = true;
    user = firebase.auth().currentUser;
    this.storage.set('userProf', { pic: user.photoURL })
    console.log("current user " + user.photoURL);
    console.log(user);

  }

  updateProfile() {
    this.nav.setRoot("ProfilePage");
  }

  about() {
    const alert = this.alertCtrl.create({
      title: '<hr color="blue">About App<hr color="blue">',
      subTitle: 'The <b>Community App</b> is meant to unite communities, help find jobs,  share reviews, photos and engage with each other.<br><br>-Platform: Android <br>-App version: 1.1.0<hr color="blue"><h3>Support</h3>-makhelwaneapp@gmail.com <br>-Tell no.: (021) 800 723<br><hr color="blue">'
    });
    alert.present();
  }

  openPage(page) {

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if (page.title == "Sign Out") {
      this.gplus.logout().then(() => {
        firebase.auth().signOut().then(() => {

          this.storage.remove('activeUser');
          this.storage.remove('userDetails');
          // let pages: Array<{ icon: any, title: string, component: any }> = [
          //   { icon: 'home', title: 'Home', component: HomePage },
          //   { icon: 'contact', title: 'Contact Us', component: 'ContactusPage' },
          //   { icon: 'help', title: 'About', component: 'AboutPage' },
          //   { icon: 'log-in', title: 'Sign In', component: 'LoginPage' }
          // ];
          // pages.forEach(element => {
          //   sideMenuObj.push(element)
          //   this.pages = pages;
          // })
          for (var i = 5; i >= 0; i--) {
            sideMenuObj.pop();
          }
          userProfileObj.pop();
          let userProfile: Array<{ username: any, photoURL: string }> = [
            { username: 'Community-App', photoURL: '../assets/imgs/logo.jpg' }
          ];

          userProfile.forEach(element => {
            userProfileObj.push(element);
          })
          //this.pages = pages;
          sideMenuObj.push({ icon: 'log-in', title: 'Sign In', component: 'LoginPage' })

          this.nav.setRoot(page.component);
        }), error => {
          firebase.auth().signOut().then(() => {
          this.storage.remove('activeUser');
          this.storage.remove('userDetails');
          // let pages: Array<{ icon: any, title: string, component: any }> = [
          //   { icon: 'home', title: 'Home', component: HomePage },
          //   { icon: 'contact', title: 'Contact Us', component: 'ContactusPage' },
          //   { icon: 'help', title: 'About', component: 'AboutPage' },
          //   { icon: 'log-in', title: 'Sign In', component: 'LoginPage' }
          // ];
          // pages.forEach(element => {
          //   sideMenuObj.push(element)
          //   this.pages = pages;
          // })
          for (var i = 5; i >= 0; i--) {
            sideMenuObj.pop();
          }
          userProfileObj.pop();
          let userProfile: Array<{ username: any, photoURL: string }> = [
            { username: 'Community-App', photoURL: '../assets/imgs/logo.jpg' }
          ];

          userProfile.forEach(element => {
            userProfileObj.push(element);
          })
          //this.pages = pages;
          sideMenuObj.push({ icon: 'log-in', title: 'Sign In', component: 'LoginPage' })

          this.nav.setRoot(page.component);
        })}
      })
      



      //--------
    } else if (page.title == 'About') {

      const alert = this.alertCtrl.create({
        title: '<hr color="blue">About App<hr color="blue">',
        subTitle: 'The <b>Community App</b> is meant to unite communities, help find jobs,  share reviews, photos and engage with each other.<br><br>-Platform: Android <br>-App version: 1.1.0<hr color="blue"><h3>Support</h3>-makhelwaneapp@gmail.com <br>-Tell no.: (021) 800 723<br><hr color="blue">'

      });
      alert.present();

    } else {
      //this.userPhotoURL = this.user.photoURL;
      this.nav.push(page.component);
    }

    //.--------------------------

  }
}
