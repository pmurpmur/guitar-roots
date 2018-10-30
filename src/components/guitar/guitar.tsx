import { Component, Prop, State } from '@stencil/core';
import { Store, Action } from '@stencil/redux';

import { stringifyNote, stringifyNoteUTF, parseNote } from '../../modules/music/services/note.service';

import * as utils from '../../helpers/url-utilities';
import * as fromMusic from '../../modules/music/reducers';
import * as actions from '../../modules/music/actions';
import { Scale, Note, Tuning } from '../../modules/music/models';


@Component({
  tag: 'page-guitar',
  styleUrl: 'guitar.scss',
})
export class GuitarPage {
  @Prop({ context: 'store' }) store: Store;

  @State() root: Note;
  @State() scale: Scale;
  @State() tuning: Tuning;
  @State() isPitchClass: boolean;
  @State() isNumberSystem: boolean;
  @State() isFlat: boolean;
  @State() isSharp: boolean;
  @State() scales: Scale[];

  selectRoot: Action;
  selectScale: Action;
  selectTuning: Action;
  selectNaming: Action;
  selectAccidental: Action;
  tuneString: Action;
  setStrings: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => ({
      root: fromMusic.getSelectedNote(state),
      scale: fromMusic.getSelectedScale(state),
      tuning: fromMusic.getSelectedTuning(state),
      isPitchClass: fromMusic.isPitchClass(state),
      isNumberSystem: fromMusic.isNumberSystem(state),
      isFlat: fromMusic.isFlat(state),
      isSharp: fromMusic.isSharp(state),
      scales: fromMusic.getScales(state),
    }));

    this.store.mapDispatchToProps(this, {
      selectRoot: actions.note.SelectAction,
      selectScale: actions.scale.SelectAction,
      selectTuning: actions.tuning.SelectAction,
      selectNaming: actions.note.SelectNamingAction,
      selectAccidental: actions.note.SelectAccidentalAction,
      tuneString: actions.tuning.TuneStringAction,
      setStrings: actions.tuning.SetStringsAction,
    });

    const dispatchURLState = (param: { key: string, value: string }) => {
      const [ key, keyParam ] = param.key.split(':');
      const value = param.value;
      
      switch (key) {
        case 'root': {
          this.selectRoot(value);
        } break;
        case 'naming': {
          this.selectNaming(value);
        } break;
        case 'accidental': {
          this.selectAccidental(value);
        } break;
        case 'tuning': {
          this.selectTuning(value);
        } break;
        case 'strings': {
          this.setStrings(value);
        } break;
        case 'string': {
          this.tuneString({
            stringNum: keyParam,
            pitch: value,
          });
        } break;
        case 'scale': {
          this.selectScale(value);
        } break;
      }
    };

    // update state based on hash
    const prevHashParams = utils.getHashParamsList(window.location.hash);
    prevHashParams.forEach(param => dispatchURLState(param));

    // live update URL hash changes
    window.onhashchange = (event: any) => {
      const oldHash = event.oldURL.substring(event.oldURL.indexOf('#'));
      const newHash = event.newURL.substring(event.newURL.indexOf('#'));
      
      if (/##/.test(event.newURL)) {
        utils.removeHashBlock();
      } else if (oldHash.startsWith('#') && !oldHash.startsWith('##') && newHash.startsWith('#') && !newHash.startsWith('##')) {
        const oldHashParams = utils.getHashParamsEntities(oldHash);
        const newHashParams = utils.getHashParamsList(newHash);

        newHashParams.forEach((newParam) => {
          if (newParam.value !== oldHashParams[newParam.key]) {
            dispatchURLState(newParam);
          }
        });
      }
    }
  }

  handleRange = (event) => {
    const { value } = event.target;
    this.selectRoot(value === 0 ? null : stringifyNote(value));
    event.srcElement.shadowRoot.querySelector('.range-pin').innerHTML = value === 0 ? 'All' : stringifyNoteUTF(value, this.isFlat);
  }

  handleSelectNaming = ({ detail }: { detail: { value: string }}) => {
    this.selectNaming(detail.value);
  }

  handleSelectAccidental = ({ detail }: { detail: { value: string }}) => {
    this.selectAccidental(detail.value);
  }

  handleTune = slinkyNum => (event) => {
    this.selectTuning(Object.assign([], this.tuning, { [slinkyNum]: event.detail.text }));
  }

  handleSelectScale = ({ detail }: { detail: { value: string }}) => {
    this.selectScale(detail.value);
  }

  handleSlinkRange = index => (event) => {
    this.tuneString({
      stringNum: index,
      pitch: stringifyNote(event.detail.value),
    });
  }

  handleSetString = num => () => {
    this.setStrings(num);
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
          class={`pagination-link  ${this.tuning.value.length === slinkNum ? 'is-current' : ''}`}
          aria-label={`${slinkNum} strings`}
        >
          {slinkNum}
        </a>
        <span>{stringifyNoteUTF(parseNote(this.tuning.value[slinkNum - 1]), this.isFlat)}</span>
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
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        
        <fret-board />

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
                onIonChange={this.handleRange}
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
                  {this.tuning.value.map((slink, index) => (
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
