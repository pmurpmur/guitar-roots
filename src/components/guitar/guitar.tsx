import { Component, Prop, State } from '@stencil/core';
import { Store, Action } from '@stencil/redux';

import * as fromTuning from '../../reducers';
import { tuning } from '../../actions';


@Component({
  tag: 'page-guitar',
  styleUrl: 'guitar.scss'
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

  showDot(fretIndex: number): any {
    if (fretIndex === 3 || fretIndex === 5 || fretIndex === 7 || fretIndex === 9) {
      return <div class="dot" />;
    } else if (fretIndex === 12) {
      return [
        <div class="dot" />,
        <div class="dot" />,
      ];
    }
  }


  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Guitar Roots</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        
        <div class="fret-board">
          <div class="slinky first" />
          <div class="slinky second" />
          <div class="slinky third" />
          <div class="slinky fourth" />
          <div class="slinky fifth" />
          <div class="slinky sixth" />
          {this.neck.map((fret, iFret) => iFret === 0 ? [
              <div class="open-notes">
                {fret.map(slink =>
                  <div class="note">
                    <div class={`value-bubble ${!slink ? 'hide' : ''}`}>{slink}</div>
                  </div>
                )}
              </div>,
              <div class="nut" />,
            ] : (
              <div class="fret-container">
                <div class="above-fret">
                  {iFret}
                </div>
                <div class="dots">
                  {this.showDot(iFret)}
                </div>
                <div class="fret">
                  {fret.map(slink =>
                    <div class="note">
                      <div class={`value-bubble ${!slink ? 'hide' : ''}`}>{slink}</div>
                    </div>
                  )}
                </div>
              </div>
            )
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
            <ion-select-option value="Ab">Ab</ion-select-option>
            <ion-select-option value="A">A</ion-select-option>
            <ion-select-option value="Bb">Bb</ion-select-option>
            <ion-select-option value="B">B</ion-select-option>
            <ion-select-option value="C">C</ion-select-option>
            <ion-select-option value="Db">Db</ion-select-option>
            <ion-select-option value="D">D</ion-select-option>
            <ion-select-option value="Eb">Eb</ion-select-option>
            <ion-select-option value="E">E</ion-select-option>
            <ion-select-option value="F">F</ion-select-option>
            <ion-select-option value="Gb">Gb</ion-select-option>
            <ion-select-option value="G">G</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-content>
    ];
  }
}
