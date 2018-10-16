import { Component, Prop, State } from '@stencil/core';
import { Store, Action } from '@stencil/redux';

import * as fromTuning from '../../reducers';
import { tuning } from '../../actions';
import { noteToString } from '../../helpers/music-theory';


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

  handleRange = (event) => {
    const { value } = event.target;
    this.selectNote(value === 0 ? null : noteToString(value));

    event.srcElement.shadowRoot.querySelector('.range-pin').innerHTML = value === 0 ? 'All' : noteToString(value);
  }

  renderDot(fretIndex: number): any {
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
        <ion-toolbar color="tertiary">
          <ion-title>Guitar Roots {this.selectedNote ? ` - ${this.selectedNote}` : ''}</ion-title>
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
                  {this.renderDot(iFret)}
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

        <ion-item>
          <ion-range
            min={0}
            max={12}
            step={1}
            snaps={true}
            pin={true}
            color="secondary"
            onIonChange={this.handleRange}
          ></ion-range>
        </ion-item>
      </ion-content>
    ];
  }
}
