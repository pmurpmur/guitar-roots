import { Component, Prop, Listen } from '@stencil/core';
import { Store } from '@stencil/redux';

import { configureStore } from '../../app/app.store'


@Component({
  tag: 'app-root',
})
export class AppRoot {
  @Prop({ context: 'store' }) store: Store;
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement;


  componentWillLoad() {
    this.store.setStore(configureStore({}));
  }


  /**
   * Handle service worker updates correctly.
   * This code will show a toast letting the
   * user of the PWA know that there is a
   * new version available. When they click the
   * reload button it then reloads the page
   * so that the new service worker can take over
   * and serve the fresh content
   */
  @Listen('window:swUpdate')
  async onSWUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'New version available',
      showCloseButton: true,
      closeButtonText: 'Reload'
    });
    await toast.present();
    await toast.onWillDismiss();
    window.location.reload();
  }

  render() {
    return (
      <ion-app>
        <ion-split-pane when={false}>
          <ion-menu>
            <ion-header>
              <ion-toolbar color="tertiary">
                <ion-title>About</ion-title>
              </ion-toolbar>
            </ion-header>

            <ion-content>
              <section class="section">
                <div class="container width--full">
                  <h1 class="title">Hi.</h1>
                  <h2 class="subtitle">
                    <strong>Guitar Roots is an ever changing project that aims to give users a unique and interactive way to visualize the guitar and similarly stringed instruments. </strong>
                  </h2>
                  <h2 class="subtitle">
                    Email Pat at <a href="mailto:pmurpmur@gmail.com">pmurpmur@gmail.com</a> with any ideas, suggestions, or comments.
                  </h2>
                </div>
              </section>
            </ion-content>
          </ion-menu>

          <ion-router useHash={false}>
            <ion-route url="/" component="page-guitar" />
          </ion-router>
          <ion-nav main />
        </ion-split-pane>
      </ion-app>
    );
  }
}
