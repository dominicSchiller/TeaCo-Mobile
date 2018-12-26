import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Deeplinks } from "@ionic-native/deeplinks";

import {UserSessionProvider} from "../providers/user-session/user-session";
import { ENV } from "@app/env";

import { NoUserFoundPage } from '../pages/user/no-user-found/no-user-found';
import { RegisterUserPage } from "../pages/user/register-user/register-user";
import {MeetingsOverviewPage} from "../pages/meetings/meetings-overview/meetings-overview";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  @ViewChild(Nav) nav:Nav;

  constructor(
      platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      private deepLinks: Deeplinks,
      private readonly userSession: UserSessionProvider) {

    platform.ready().then(() => {
      console.warn("Running in " + ENV.mode);

      userSession.ready().then(activeUser => {
        this.rootPage = activeUser ? MeetingsOverviewPage : NoUserFoundPage;
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Handle deep links
      this.deepLinks.routeWithNavController(this.nav, {
        '/:userKey': RegisterUserPage
      }, {
        root: true
      }).subscribe( (match) => {
        //alert("Match: " + JSON.stringify(match));
      }, (noMatch) => {
        //alert("No Match: " + JSON.stringify(noMatch));
      });
    });
  }
}

