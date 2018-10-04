
import { sideMenuObj } from './../models/sideMenuPages.mocks';
import { userProfileObj } from './../models/userProfile.mocks';

import { HomePage } from './../pages/home/home';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsersPage } from '../pages/users/users'; 
//import firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import 'firebase/auth';

 declare var firebase;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
 
  rootPage: any = HomePage;
  
  public pages: Array<{ icon: any, title: string, component: any }>; 
  public userProfile:Array<{username:any,photoURL:string}>;
  user;
  userPhotoURL;
  signedIn = false;

  constructor(public alertCtrl: AlertController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp(); 
    //firebase.initializeApp(config);
   

    
    // used for an example of ngFor and navigation
   
    // logo-buffer folder-open globe paper-plane send swap
    
  }





  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.pages = sideMenuObj;  
    this.userProfile = userProfileObj;
    
  }

  currentUser(user:any){
    user = firebase.auth().currentUser; 
    console.log("current user "+user.photoURL);
    console.log(user);
  }

  updateProfile(){
    this.nav.setRoot("ProfilePage");
  }

  

  openPage(page) {
    
    try {
      this.user = firebase.auth().currentUser
      
    } catch (error) {
      
    }
    console.log("openPage user "+this.user)
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title=="Sign Out"){ 
      firebase.auth().signOut().then(()=>{
        let pages: Array<{ icon: any, title: string, component: any }> = [
          { icon: 'home', title: 'Home', component: HomePage },
          { icon: 'contact', title: 'Contact Us', component: 'ContactusPage' },
          { icon: 'help', title: 'About', component: 'AboutPage' },
          {icon: 'log-in',title: 'Sign In', component: 'LoginPage'}
        ];
        // pages.forEach(element => {
        //   sideMenuObj.push(element)
        //   this.pages = pages;
        // })
        for(var i = 5; i >= 0; i--){
          sideMenuObj.pop();
        }
      userProfileObj.pop();
        let  userProfile:Array<{username:any,photoURL:string}> = [
          {username:'Community-App',photoURL:'../assets/imgs/logo.jpg'}
        ];
        
        userProfile.forEach(element =>{
          userProfileObj.push(element);
        })
        //this.pages = pages;
        sideMenuObj.push({icon: 'log-in',title: 'Sign In', component: 'LoginPage'})
       
      this.nav.setRoot(page.component);
    });
  }else if(page.title=='About'){
 
      const alert = this.alertCtrl.create({
        title: '<hr color="blue">About App<hr color="blue">',
        subTitle: 'The <b>Community App</b> is meant to unite communities, help find jobs,  share reviews, photos and engage with each other.<br><br>-Platform: Android <br>-App version: 1.1.0<hr color="blue"><h3>Support</h3>-makhelwaneapp@gmail.com <br>-Tell no.: (021) 800 723<br><hr color="blue">'
        
      });
      alert.present();
    
  }else{
    console.log(this.user);
    //this.userPhotoURL = this.user.photoURL;
    this.nav.push(page.component);
  }
   
    //.--------------------------

  }
}
