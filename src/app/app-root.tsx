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

  @State() tune: string[];
  @State() modeName: string;

  setMode: Action;
  setTune: Action;


  componentWillLoad() {
    this.store.setStore(configureStore({}));
    this.store.mapStateToProps(this, (state) => ({
      tune: fromTuning.getTune(state),
      modeName: fromTuning.getModeName(state),
    }));

    this.store.mapDispatchToProps(this, {
      setMode: tuning.SetModeAction,
      setTune: tuning.TuneAction,
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

  handleTune = slinkyNum => (event) => {
    this.setTune(Object.assign([], this.tune, { [slinkyNum]: event.detail.text }));
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

    const NoteOptions = ({ tune }: { tune: string }) => [
      <ion-select-option value={1} selected={tune === 'A'}>A</ion-select-option>,
      <ion-select-option value={2} selected={tune === 'A+' || tune === 'Bb'}>Bb</ion-select-option>,
      <ion-select-option value={3} selected={tune === 'B'}>B</ion-select-option>,
      <ion-select-option value={4} selected={tune === 'C'}>C</ion-select-option>,
      <ion-select-option value={5} selected={tune === 'C+' || tune === 'Db'}>Db</ion-select-option>,
      <ion-select-option value={6} selected={tune === 'D'}>D</ion-select-option>,
      <ion-select-option value={7} selected={tune === 'D+' || tune === 'Eb'}>Eb</ion-select-option>,
      <ion-select-option value={8} selected={tune === 'E'}>E</ion-select-option>,
      <ion-select-option value={9} selected={tune === 'F'}>F</ion-select-option>,
      <ion-select-option value={10} selected={tune === 'F+' || tune === 'Gb'}>Gb</ion-select-option>,
      <ion-select-option value={11} selected={tune === 'G'}>G</ion-select-option>,
      <ion-select-option value={12} selected={tune === 'G+' || tune === 'Ab'}>Ab</ion-select-option>,
    ];

    return (
      <ion-app>
        <ion-split-pane when={false}>
          <ion-menu>
            <ion-header>
              <ion-toolbar color="tertiary">
                <ion-title>Tuning</ion-title>
              </ion-toolbar>
            </ion-header>

            <ion-content>
              <ion-list>
                <ion-item>
                  <ion-label>1st String</ion-label>
                  <ion-select
                    onIonChange={this.handleTune(0)}
                    interface="alert"
                    interfaceOptions={{ mode: 'ios' }}
                    placeholder="Tune"
                  >
                    <NoteOptions tune={this.tune[0]} />
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-label>2nd String</ion-label>
                  <ion-select
                    onIonChange={this.handleTune(1)}
                    interface="alert"
                    interfaceOptions={{ mode: 'ios' }}
                    placeholder="Tune"
                  >
                    <NoteOptions tune={this.tune[1]} />
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-label>3rd String</ion-label>
                  <ion-select
                    onIonChange={this.handleTune(2)}
                    interface="alert"
                    interfaceOptions={{ mode: 'ios' }}
                    placeholder="Tune"
                  >
                    <NoteOptions tune={this.tune[2]} />
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-label>4th String</ion-label>
                  <ion-select
                    onIonChange={this.handleTune(3)}
                    interface="alert"
                    interfaceOptions={{ mode: 'ios' }}
                    placeholder="Tune"
                  >
                    <NoteOptions tune={this.tune[3]} />
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-label>5th String</ion-label>
                  <ion-select
                    onIonChange={this.handleTune(4)}
                    interface="alert"
                    interfaceOptions={{ mode: 'ios' }}
                    placeholder="Tune"
                  >
                    <NoteOptions tune={this.tune[4]} />
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-label>6th String</ion-label>
                  <ion-select
                    onIonChange={this.handleTune(5)}
                    interface="alert"
                    interfaceOptions={{ mode: 'ios' }}
                    placeholder="Tune"
                  >
                    <NoteOptions tune={this.tune[5]} />
                  </ion-select>
                </ion-item>
              </ion-list>

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
