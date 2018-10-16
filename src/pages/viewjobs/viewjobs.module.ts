import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewjobsPage } from './viewjobs';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    ViewjobsPage,
  ],
  imports: [
    IonicImageLoader,
    IonicPageModule.forChild(ViewjobsPage),
  ],
})
export class ViewjobsPageModule {}
