import { AddjobPage } from './../pages/addjob/addjob';
import { JobDetailsPage } from './../pages/job-details/job-details';
import { UserObj } from './../models/loggedInUser.mock';
import { sideMenuObj } from './../models/sideMenuPages.mocks';
import { LoginPage } from './../pages/login/login';
import { NoaccessPage } from './../pages/noaccess/noaccess';
import { RegisterPage } from './../pages/register/register';
import { ViewjobsPage } from './../pages/viewjobs/viewjobs';
import { WelcomePage } from './../pages/welcome/welcome';
import { SuggestionPage } from './../pages/suggestion/suggestion';

import { HomePage } from './../pages/home/home';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsersPage } from '../pages/users/users';

declare var firebase;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = 'LoginPage';

  public pages: Array<{ icon: any, title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();  
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
    
  }

  openPage(page) {
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
        //this.pages = pages;
        sideMenuObj.push({icon: 'log-in',title: 'Sign In', component: 'LoginPage'})
       
      this.nav.setRoot(page.component);
    });
  }else{
    this.nav.push(page.component);
  }
   
    

  }
}
