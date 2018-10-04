import { userProfileObj } from './../../models/userProfile.mocks';
import { InAppBrowser } from '@ionic-native/in-app-browser';


import { HomePage } from './../home/home';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserObj } from '../../models/loggedInUser.mock';
import { sideMenuObj } from '../../models/sideMenuPages.mocks';
import { ResetPage } from '../reset/reset';
import { MyApp } from '../../app/app.component';

import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

declare var firebase;
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //pages: Array<{ icon: any, title: string, component: any }>;
  private todo: FormGroup;
  userSuccess = false;
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,  public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {

    this.todo = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), Validators.minLength(6), Validators.maxLength(12), Validators.required])],

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.closeMenu();
  }
  closeMenu() {
    this.menuCtrl.enable(false, 'myMenu');
  }



  LogIn() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();

    let pages = [
      { icon: 'calendar', title: 'Events', component: 'ViewEventPage' },
      { icon: 'clipboard', title: 'Reports', component: 'ListPage' },
      { icon: 'git-network', title: 'Suggestions', component: 'SuggestionPage' },
      { icon: 'globe', title: 'Jobs/Vacancies', component: 'ViewjobsPage' },
      { icon: 'flag', title: 'Report Member', component: 'ReportuserPage' },
      { icon: 'log-out', title: 'Sign Out', component: HomePage },
    ];
   
    firebase.auth().signInWithEmailAndPassword(this.todo.value.email, this.todo.value.password).then(user => {
      console.log("works");
      firebase.database().ref("/comm/").once('value', (snapshot) => {
        snapshot.forEach((snap) => {
          if (user.user.uid == snap.key) {
            if (snap.val().role == 'Admin') {
              this.userSuccess = true;
              this.showPopup("Success", "Admin succesfully logged in");
              UserObj.push({ role: snap.val().role });
              sideMenuObj.pop();
              //MyApp.CURRENT_USER = firebase.auth().currentUser;
              pages.forEach(element => {
                sideMenuObj.push(element)
              })
              
              this.navCtrl.setRoot(HomePage);
            } else if (snap.val().role == 'user') {
              this.userSuccess = true;
              this.showPopup("Success", "User succesfully logged  in");
              UserObj.push({ role: snap.val().role });
              sideMenuObj.pop();
              userProfileObj.pop();
              let userProfile = [
                {username:user.user.displayName,photoURL:user.user.photoURL}
              ]
              userProfile.forEach(element => {
                userProfileObj.push(element);
              })
              // var myAppObj = new MyApp();
              // myAppObj.currentUser(firebase.auth().currentUser);

              pages.forEach(element => {
                sideMenuObj.push(element)
              })
              // let userProfile = [
              //   {username:user.}
              // ]
              
              this.navCtrl.setRoot(HomePage);
              
            }else{
              this.showPopup("Error!", "Problem Loggin In");
            }
          }

        })
        //return isfound;
      })
    },
    error => {
      loading.dismiss();
      this.showPopup("Login Error!", "Please enter correct credentials!");
    });
  }

  logInWithGoogle(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();

    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res) =>{
      console.log('Google+');

      let pages = [
        { icon: 'calendar', title: 'Events', component: 'ViewEventPage' },
        { icon: 'clipboard', title: 'Reports', component: 'ListPage' },
        { icon: 'git-network', title: 'Suggestions', component: 'SuggestionPage' },
        { icon: 'globe', title: 'Jobs/Vacancies', component: 'ViewjobsPage' },
        { icon: 'flag', title: 'Report Member', component: 'ReportuserPage' },
        { icon: 'log-out', title: 'Sign Out', component: HomePage },
      ];
      sideMenuObj.pop();
      pages.forEach(element => {
        sideMenuObj.push(element)
      })
      this.navCtrl.setRoot(HomePage);
    });
    loading.dismiss();
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: "<u>"+title+"</u>",
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.userSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  SignUp(){
    this.navCtrl.push('RegisterPage');
  }

  ForgotPassword(){
    this.navCtrl.push('ResetPage');
  }

}
