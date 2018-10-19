import { Component, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';

import * as fromMusic from '../../reducers';
import { NoteDetails, Tuning } from '../../models';


@Component({
  tag: 'fret-board',
  styleUrl: 'fret-board.scss',
  shadow: true,
})
export class FretBoard {
  @Prop({ context: 'store' }) store: Store;

  @State() board: number[][];
  @State() slinks: Tuning;
  @State() notes: NoteDetails[];


  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => ({
      board: fromMusic.getFilteredNoteMatrix(state),
      slinks: fromMusic.getSelectedTuning(state),
      notes: fromMusic.getVisualOptions(state),
    }));
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
    return (
      <div class="fret-board">
        {this.slinks.value.map((_slink, index: number) => <div class={`slink slink_${index + 1} slinks_${this.slinks.value.length}`} />)}
        
        {this.board.map((fret, iFret) => iFret === 0 ? [
            <div class="open-notes">
              {fret.map(note =>
                <div class="note">
                  {note ? <div class="value-bubble">{this.notes[note].pitchClass}</div> : <div class="value-bubble hide" />} 
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
                {fret.map(note =>
                  <div class="note">
                    {note ? <div class="value-bubble">{this.notes[note].pitchClass}</div> : <div class="value-bubble hide" />} 
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}
