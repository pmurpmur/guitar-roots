import { Component, Prop, State } from '@stencil/core';
import { Store } from '@stencil/redux';

import * as fromMusic from '../../reducers';
import { NoteDetails } from '../../models';


@Component({
  tag: 'fret-board',
  styleUrl: 'fret-board.scss',
  shadow: true,
})
export class FretBoard {
  @Prop({ context: 'store' }) store: Store;

  @State() board: number[][];
  @State() slinks: string[];
  @State() notes: NoteDetails[];
  @State() isNumberSystem: boolean;


  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => ({
      board: fromMusic.getFilteredNoteMatrix(state),
      slinks: fromMusic.getSelectedTuning(state),
      notes: fromMusic.getVisualOptions(state),
      isNumberSystem: fromMusic.isNumberSystem(state),
    }));
  }

  renderDot(fretIndex: number): any {
    const intervalIndex = fretIndex % 12;
    if (intervalIndex === 3 || intervalIndex === 5 || intervalIndex === 7 || intervalIndex === 9) {
      return <div class="dot" />;
    } else if (intervalIndex === 0) {
      return [
        <div class="dot" />,
        <div class="dot" />,
      ];
    }
  }

  renderNoteBubble(note: NoteDetails): any {
    if (note) {
      if (this.isNumberSystem && note.number !== null) {
        return (
          <div class="value-bubble">
            {`${note.number}`}
          </div>
        );
      } else {
        return (
          <div class="value-bubble">
            {note.letter}{note.accidental === 'b' ? '\u266D' : ''}{note.accidental === '#' ? '\u266F' : ''}
          </div>
        );
      }
    }
    return <div class="value-bubble hide" />;
  }


  render() {
    return (
      <div class="fret-board-wrapper">
        <div class="fret-board">
          {this.slinks.map((_slink, index: number) => <div class={`slink slink_${index + 1} slinks_${this.slinks.length}`} />)}
          
          {this.board.map((fret, iFret) => iFret === 0 ? [
              <div class="open-notes">
                {fret.map(note =>
                  <div class="note">
                    {this.renderNoteBubble(this.notes[note])}
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
                      {this.renderNoteBubble(this.notes[note])}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}
