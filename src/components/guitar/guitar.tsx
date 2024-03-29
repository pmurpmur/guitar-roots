import { Component, Prop, State } from '@stencil/core';
import { InputChangeEvent, CheckedInputChangeEvent } from '@ionic/core';
import { Store } from '@stencil/redux';

import * as utils from '../../helpers/url-utilities';
import { getHashAction } from '../../helpers/redux-utilities';

import { stringifyNote, stringifyNoteUTF, parseNote } from '../../modules/music/services/note.service';

import * as fromMusic from '../../modules/music/reducers';
import { instrument, note, scale, tuning } from '../../modules/music/actions';
import { Scale, Note } from '../../modules/music/models';


@Component({
  tag: 'page-guitar',
  styleUrl: 'guitar.scss',
})
export class GuitarPage {
  @Prop({ context: 'store' }) store: Store;

  @State() root: Note;
  @State() scale: Scale;
  @State() tuning: string[];
  @State() isPitchClass: boolean;
  @State() isNumberSystem: boolean;
  @State() isFlat: boolean;
  @State() isSharp: boolean;
  @State() scales: Scale[];
  @State() hasColor: boolean;
  @State() isLocked: boolean;
  @State() isUnlocked: boolean;

  dispatch: Function;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => ({
      root: fromMusic.getRoot(state),
      scale: fromMusic.getSelectedScale(state),
      tuning: fromMusic.getSelectedTuning(state),
      isPitchClass: fromMusic.isPitchClass(state),
      isNumberSystem: fromMusic.isNumberSystem(state),
      isFlat: fromMusic.isFlat(state),
      isSharp: fromMusic.isSharp(state),
      scales: fromMusic.getScales(state),
      hasColor: fromMusic.hasColor(state),
      isLocked: fromMusic.isLocked(state),
      isUnlocked: fromMusic.isUnlocked(state),
    }));

    this.store.mapDispatchToProps(this, {
      dispatch: action => async dispatch => dispatch(action),
    });

    // update state based on hash
    const prevHashParams = utils.getHashParamsList(window.location.hash);
    prevHashParams.forEach(param => this.dispatch(getHashAction(param)));

    // live update URL hash changes
    window.onhashchange = (event: any) => {
      const oldHash = event.oldURL.substring(event.oldURL.indexOf('#'));
      const newHash = event.newURL.substring(event.newURL.indexOf('#'));
      
      const oldHashParams = utils.getHashParamsEntities(oldHash);
      const newHashParams = utils.getHashParamsList(newHash);

      newHashParams.forEach((newParam) => {
        if (newParam.value !== oldHashParams[newParam.key]) {
          this.dispatch(getHashAction(newParam));
        }
      });
    }
  }

  handleLockToggle = () => {
    if (this.isLocked) {
      this.dispatch(instrument.UnlockInstrumentAction(!this.isUnlocked));
      setTimeout(() => this.dispatch(instrument.LockInstrumentAction(!this.isLocked)), 0);
    } else {
      this.dispatch(instrument.LockInstrumentAction(!this.isLocked));
      setTimeout(() => this.dispatch(instrument.UnlockInstrumentAction(!this.isUnlocked)), 0);
    }
  }

  handleRootRange = (event) => {
    const { value } = event.target;
    this.dispatch(note.SelectRootAction(value === 0 ? null : stringifyNote(value)));
    event.srcElement.shadowRoot.querySelector('.range-pin').innerHTML = value === 0 ? 'None' : stringifyNoteUTF(value, this.isFlat);
  }

  handleSelectNaming = ({ detail }: CustomEvent<InputChangeEvent>) => {
    this.dispatch(note.SelectNamingAction(detail.value));
  }

  handleColorToggle = ({ detail }: CustomEvent<CheckedInputChangeEvent>) => {
    this.dispatch(note.ToggleColorAction(detail.checked));
  }

  handleSelectAccidental = ({ detail }: CustomEvent<InputChangeEvent>) => {
    this.dispatch(note.SelectAccidentalAction(detail.value));
  }

  handleSelectScale = ({ detail }: CustomEvent<InputChangeEvent>) => {
    this.dispatch(scale.SelectAction(detail.value));
  }

  handleSlinkRange = index => ({ detail }: CustomEvent<InputChangeEvent>) => {
    const tune = [ ...this.tuning ];
    tune[index] = stringifyNote(detail.value);
    this.dispatch(tuning.TuneAction(tune));
  }

  handleSetString = num => () => {
    const standardTuning = ['E', 'B', 'G', 'D', 'A', 'E', 'B'];

    const result = [];
    for (let i = 0; i < num; i++) {
      if (i < this.tuning.length) {
        result.push(this.tuning[i]);
      } else {
        result.push(standardTuning[i]);
      }
    }

    this.dispatch(tuning.TuneAction(result));
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

  renderStringButton(slinkNum: number): any {
    return (
      <li class="flex is-column">
        <a
          onClick={this.handleSetString(slinkNum)}
          class={`pagination-link  ${this.tuning.length === slinkNum ? 'is-current' : ''}`}
          aria-label={`${slinkNum} strings`}
        >
          {slinkNum}
        </a>
        <span>{stringifyNoteUTF(parseNote(this.tuning[slinkNum - 1]), this.isFlat)}</span>
      </li>
    );
  }


  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Guitar Roots {this.root ? ` - ${stringifyNoteUTF(this.root, this.isFlat)}` : ''}</ion-title>
          <ion-buttons slot="end">
            <ion-button fill="clear" onClick={this.handleLockToggle}>
              {this.isLocked ? <ion-icon slot="icon-only" name="lock" /> : <ion-icon slot="icon-only" name="unlock" />}
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
        {this.isLocked && (
          <ion-toolbar color="white" class="fret-board-toolbar">
            <fret-board />
          </ion-toolbar>
        )}
      </ion-header>,

      <ion-content>
        
        {this.isUnlocked && <fret-board />}

        <div padding-horizontal class="root-range tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child is-12 box notification background-color--primary">
              <ion-range
                min={0}
                max={12}
                step={1}
                snaps={true}
                pin={true}
                color="tertiary"
                mode="ios"
                value={this.root}
                onIonChange={this.handleRootRange}
              ></ion-range>
            </div>
          </div>
        </div>

        <div padding-horizontal class="tile is-ancestor background-color--light">
          <div class="tile is-parent is-4">
            <article class="tile is-child box notification background-color--primary">
              <p class="title">Scales</p>
              <p class="subtitle">Specify interval patterns</p>
              <div class="content">
                <ion-list class="scale-list">
                  <ion-radio-group onIonChange={this.handleSelectScale}>
                    {this.scales.map(scale =>
                      <ion-item>
                        <ion-label text-capitalize>{scale.label}</ion-label>
                        <ion-radio
                          color="secondary"
                          value={scale.id}
                          checked={scale.id === this.scale.id}
                          mode="ios"
                        />
                      </ion-item>
                    )}
                  </ion-radio-group>
                </ion-list>
              </div>
            </article>
          </div>
          <div class="tile is-vertical">
            <div class="tile">
              <div class="tile is-parent">
                <article class="tile is-child box notification background-color--primary">
                  <ion-toggle
                    float-right
                    color="secondary"
                    value="color"
                    checked={this.hasColor}
                    onIonChange={this.handleColorToggle}
                  />
                  <p class="title">Naming</p>
                  <div class="content">
                    <ion-list class="scale-list">
                      <ion-radio-group onIonChange={this.handleSelectNaming}>
                        <ion-item>
                          <ion-label>Pitch Letters</ion-label>
                          <ion-radio
                            color="secondary"
                            value="pitch"
                            checked={this.isPitchClass}
                            mode="ios"
                          />
                        </ion-item>
                        <ion-item>
                          <ion-label>Number System</ion-label>
                          <ion-radio
                            color="secondary"
                            value="number"
                            checked={this.isNumberSystem}
                            mode="ios"
                          />
                        </ion-item>
                      </ion-radio-group>
                    </ion-list>
                  </div>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box notification background-color--primary">
                  <p class="title">Accidental</p>
                  <div class="content">
                    <ion-list class="scale-list">
                      <ion-radio-group onIonChange={this.handleSelectAccidental}>
                        <ion-item>
                          <ion-label>Flat</ion-label>
                          <ion-radio
                            color="secondary"
                            value="flat"
                            checked={this.isFlat}
                            mode="ios"
                          />
                        </ion-item>
                        <ion-item>
                          <ion-label>Sharp</ion-label>
                          <ion-radio
                            color="secondary"
                            value="sharp"
                            checked={this.isSharp}
                            mode="ios"
                          />
                        </ion-item>
                      </ion-radio-group>
                    </ion-list>
                  </div>
                </article>
              </div>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box notification background-color--primary">
                <div class="level ">
                  <div class="level-left">
                    <p class="title">Tuning</p>
                    <p class="subtitle"></p>
                  </div>

                  <div class="level-right">
                    <div class="pagination">
                      <ul class="pagination-list flex is-row is-top">
                        {this.renderStringButton(1)}
                        {this.renderStringButton(2)}
                        {this.renderStringButton(3)}
                        {this.renderStringButton(4)}
                        {this.renderStringButton(5)}
                        {this.renderStringButton(6)}
                        {this.renderStringButton(7)}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div class="content">
                  {this.tuning.map((slink, index) => (
                    <ion-range
                      no-padding
                      min={1}
                      max={12}
                      step={1}
                      name={`${index}`}
                      value={parseNote(slink)}
                      snaps={true}
                      color="tertiary"
                      mode="md"
                      onIonChange={this.handleSlinkRange(index)}
                    ></ion-range>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>

      </ion-content>
    ];
  }
}
