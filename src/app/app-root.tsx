import { Component, Prop, State, Listen } from '@stencil/core';
import { Store, Action } from '@stencil/redux';

import { configureStore } from './app.store'
import * as fromTuning from '../reducers';
import { tuning } from '../actions';


@Component({
  tag: 'app-root',
})
export class AppRoot {
  @Prop({ context: 'store' }) store: Store;
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement;

  @State() modeName: string;

  setMode: Action;


  componentWillLoad() {
    this.store.setStore(configureStore({}));
    this.store.mapStateToProps(this, (state) => ({
      modeName: fromTuning.getModeName(state),
    }));

    this.store.mapDispatchToProps(this, {
      setMode: tuning.SetModeAction,
    });
  }

  handleSetMode = (event) => {
    const isChecked = event.detail.checked && event.detail.value !== this.modeName;
    switch(event.detail.value) {
      case 'major': {
        this.setMode({
          name: isChecked ? event.detail.value : null,
          data: isChecked ? [0, 2, 4, 5, 7, 9, 11] : null,
        });
      } break;
      case 'minor': {
        this.setMode({
          name: isChecked ? event.detail.value : null,
          data: isChecked ? [0, 2, 3, 5, 7, 8, 10] : null,
        });
      } break;
      case 'major-pentatonic': {
        this.setMode({
          name: isChecked ? event.detail.value : null,
          data: isChecked ? [0, 2, 4, 7, 9] : null,
        });
      } break;
      case 'minor-pentatonic': {
        this.setMode({
          name: isChecked ? event.detail.value : null,
          data: isChecked ? [0, 3, 5, 7, 10] : null,
        });
      } break;
    }
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
                <ion-title>Modes</ion-title>
              </ion-toolbar>
            </ion-header>

            <ion-content>
              <ion-list>
                <ion-radio-group>
                  <ion-item>
                    <ion-label>Major</ion-label>
                    <ion-radio
                      color="secondary"
                      value="major"
                      checked={this.modeName === 'major'}
                      onIonSelect={this.handleSetMode}
                      mode="ios"
                    />
                  </ion-item>
                  <ion-item>
                    <ion-label>Minor</ion-label>
                    <ion-radio
                      color="secondary"
                      value="minor"
                      checked={this.modeName === 'minor'}
                      onIonSelect={this.handleSetMode}
                      mode="ios"
                    />
                  </ion-item>
                  <ion-item>
                    <ion-label>Major Pentatonic</ion-label>
                    <ion-radio
                      color="secondary"
                      value="major-pentatonic"
                      checked={this.modeName === 'major-pentatonic'}
                      onIonSelect={this.handleSetMode}
                      mode="ios"
                    />
                  </ion-item>
                  <ion-item>
                    <ion-label>Minor Pentatonic</ion-label>
                    <ion-radio
                      color="secondary"
                      value="minor-pentatonic"
                      checked={this.modeName === 'minor-pentatonic'}
                      onIonSelect={this.handleSetMode}
                      mode="ios"
                    />
                  </ion-item>
                </ion-radio-group>
              </ion-list>
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
