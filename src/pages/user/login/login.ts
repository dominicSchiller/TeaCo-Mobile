import { Component, NgZone, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { TeaCoApiProvider } from "../../../providers/teaco-api/teaco-api-provider";
import { LoadingIndicatorComponent } from "../../../components/general/loading-indicator/loading-indicator";
import { MeetingsOverviewPage } from "../../meetings/meetings-overview/meetings-overview";
import { UserSessionProvider } from "../../../providers/user-session/user-session";
import { forwardRef } from '@angular/core';
import {User} from "../../../models/user";
import {FirebaseProvider} from "../../../providers/firebase/firebase";

/**
 * Page Controller for registering a user within the app
 * by his given unique user key.
 */
@IonicPage({
    segment: 'welcome/register',
    defaultHistory: ['WelcomePage']
})
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    /**
     * loading indicator UI component
     */
    @ViewChild(forwardRef(() => LoadingIndicatorComponent)) loadingIndicator: LoadingIndicatorComponent;
    /**
     * The user's personal TeaCo key
     */
    private userKey: string;
    /**
     * The user's personal TeaCo key
     */
    private registeredUser: User;
    /**
     * Status whether this page has been accessed via deep link or not
     */
    private isCalledByDeepLink = false;
    /**
     * Status whether the registration process succeeded or not
     */
    private isRegistrationSuccess = false;
    /**
     * User registration error message
     */
    private errorMsg: string;

    /**
     * Constructor
     * @param navCtrl The app's navigation controller
     * @param navParams The handed navigation params which should contain the user's key
     * @param zone The current template zone this controller refers to
     * @param apiService The TeaCo API Service to communicate with the TeaCo server
     * @param userSession The app's user session service
     * @param fcmService The app's Firebase service
     */
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private zone: NgZone,
        private apiService: TeaCoApiProvider,
        private userSession: UserSessionProvider,
        private fcmService: FirebaseProvider) {

        this.errorMsg = "";
        this.userKey = this.navParams.get('userKey');
        if(this.userKey !== undefined) {
            this.isCalledByDeepLink = true;
            this.registerUserViaDeepLink();
        } else {
            this.userKey = "";
        }
    }

    /**
     * Close the modal dialog.
     */
    private closeModal() {
        this.navCtrl.pop().then();
    }

    private onUserKeyEntered(event) {
        this.userKey = event[0];
    }

    /**
     * Register the user by validating the entered personal key
     * against the TeaCo backend.
     */
    private login() {
        this.loadingIndicator.show();
        this.apiService.getUser(this.userKey).subscribe(user => {
            this.userSession.setActiveUser(user);
            this.zone.run(() => {
                user.key = this.userKey;
                this.registeredUser = user;
                this.hideLoadingIndicator();
                this.showSuccessInformation();
            });
            this.sendPushToken();
        }, error => {
            console.error(error);
            this.showErrorMessage();
            this.hideLoadingIndicator();
        });
    }

    /**
     * Trigger user registration from deep link.
     * Note: This function must be called with delay and asynchronously to ensure
     * it can be triggered directly from the constructor while the UI template has not be rendered.
     */
    private registerUserViaDeepLink() {
        setTimeout(() => {
            this.login();
        }, 100);
    }

    private sendPushToken() {
        this.fcmService.getPushToken().then(token => {
            this.fcmService.updateTeaCoPushToken(token);
        }, error => {
            console.error("Error occurred while getting the FCM push token");
        });
    }

    /**
     * Finish the registration process and navigate to the
     * meetings overview page.
     */
    private finish(): void {
        this.navCtrl.push('MeetingsOverviewPage').then();
    }

    /**
     * Hide the currently visible loading indicator.
     */
    private hideLoadingIndicator() {
        setTimeout( () => {
            this.loadingIndicator.hide();
        }, 400);
    }

    /**
     * Show error message for failed user retrieval.
     */
    private showErrorMessage() {
        this.errorMsg = "Es konnte kein Konto unter diesem Key gefunden werden. Bitte überprüfen Sie Ihre Eingabe.";
        setTimeout(() => {
            this.errorMsg = "";
        }, 4000);
    }

    /**
     * Show registration success information.
     */
    private showSuccessInformation() {
        setTimeout( () => {
            this.isRegistrationSuccess = true;
        }, 600);
    }
}