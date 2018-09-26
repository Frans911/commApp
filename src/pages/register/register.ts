import { HomePage } from './../home/home';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
import { UserObj } from '../../models/loggedInUser.mock';
import { sideMenuObj } from '../../models/sideMenuPages.mocks';



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  todo: FormGroup;
  userSuccess: false ;
  constructor(public loadingCtrl:LoadingController, public alertCtrl: AlertController,public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {

    this.todo = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), Validators.minLength(6), Validators.required])],

      fullName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      // Number: ['', Validators.required],
      address: ['', Validators.required],
      Number: ['', Validators.compose([Validators.pattern('[0-9.e]{10}'), Validators.required])],
      standNumber: ['', Validators.required],
      gender: ['', Validators.required],
      dof: ['', Validators.required],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.closeMenu();
  }

  closeMenu() {
    this.menuCtrl.enable(false, 'myMenu');
  }


  signUp({ value, valid }: { value: any, valid }) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();

    console.log(value);
    var databaseKey;
    var uid;
    firebase.auth().createUserWithEmailAndPassword(this.todo.value.email, this.todo.value.password).then(data => {
      data.user.updateProfile({
        displayName:this.todo.value.fullName,
        photoURL:'../../assets/imgs/empty.jpg'
      });

      console.log(this.todo.value.email);

      uid = data.user.uid;

      databaseKey = firebase.database().ref('/comm/' + (data.user.uid)).set(
        {
          email: this.todo.value.email,
          fullName: this.todo.value.fullName,
          password: this.todo.value.password,
          Number: this.todo.value.Number,
          standNumber: this.todo.value.standNumber,
          gender: this.todo.value.gender,
          dof: this.todo.value.dof,
          address: this.todo.value.address,
          role: "user"
        }
      ).key;

      console.log("Key " + databaseKey)
     
    },
    error => {
      loading.dismiss();
      this.navCtrl.setRoot("RegisterPage")
      this.showPopup("Sign-up Error!", "Please fill in all the fields");
    });

    if (uid == databaseKey) {
      console.log("Key " + databaseKey)
      console.log("Key " + uid)
      UserObj.push({ role: "user" });
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
      //this.navCtrl.push(HomePage);
    }

    
  }



  SignIn() {

    this.navCtrl.push(LoginPage);
  }


  logInWithGoogle() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();    


    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    },
    error => {
      loading.dismiss();
      this.showPopup("Sign-up Error!", "Please fill in all the fields");
    });
  
    // .catch(function (error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });


    // firebase.auth().getRedirectResult().then(function (result) {
    //   if (result.credential) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // ...
    //   }
    //   // The signed-in user info.
    //   var user = result.user;
    // },
    // error => {
    //   loading.dismiss();
    //   this.showPopup("Sign-up Error!", "Please fill in all the fields");
    // });
  
    // ).catch(function (error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });

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

  
  ForgotPassword() {

    this.navCtrl.push('ResetPage');
  }

}





