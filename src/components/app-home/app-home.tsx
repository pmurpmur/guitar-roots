import { Component, Prop, State } from '@stencil/core';
import { Store, Action } from '@stencil/redux';

import * as fromTuning from '../../reducers';
import { tuning } from '../../actions';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  @Prop({ context: 'store' }) store: Store;

  @State() neck: string[][];
  @State() selectedNote: string;

  selectNote: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => ({
      neck: fromTuning.getNeck(state),
      selectedNote: fromTuning.getSelectedNote(state),
    }));


    this.store.mapDispatchToProps(this, {
      selectNote: tuning.SelectNoteAction,
    });
  }

  handleSelectNote = (event) => {
    const { value } = event.target;
    if (value !== undefined) {
      this.selectNote(value === 'all' ? null : value);
    }
  }

  showDot(fretIndex: number, slinkIndex: number): boolean {
    return (slinkIndex === 3 && (fretIndex === 3 || fretIndex === 5 || fretIndex === 7 || fretIndex === 9))
      || (fretIndex === 12 && (slinkIndex === 2 || slinkIndex === 4));
  }


  render() {

    console.log(this.neck);

    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Guitar Roots</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <div class="fret-board">
          {this.neck.map((fret, iFret) =>
            <div class={`fret ${iFret === 0 ? 'nut' : ''}`}>
              {fret.map((slink, iSlink) =>
                <div class={`string-box ${iSlink === 0 ? 'root' : ''}`}>
                  {this.showDot(iFret, iSlink) && <span class="dot"></span>}
                  {slink && <div class="value-bubble">{slink}</div>}
                </div>
              )}
            </div>
          )}
        </div>

        <ion-item class="root-select">
          <ion-label>Select Root Note</ion-label>
          <ion-select
            value={this.selectedNote}
            onIonChange={this.handleSelectNote}
            ok-text="Okay"
            cancel-text="Dismiss"
          >
            <ion-select-option value="all">Show All</ion-select-option>
            <ion-select-option value="A">A</ion-select-option>
            <ion-select-option value="B">B</ion-select-option>
            <ion-select-option value="C">C</ion-select-option>
            <ion-select-option value="D">D</ion-select-option>
            <ion-select-option value="E">E</ion-select-option>
            <ion-select-option value="F">F</ion-select-option>
            <ion-select-option value="G">G</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-content>
    ];
  }
}
