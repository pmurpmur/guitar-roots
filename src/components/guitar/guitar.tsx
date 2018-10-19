import { Component, Prop, State } from '@stencil/core';
import { Store, Action } from '@stencil/redux';

import { stringifyNote } from '../../modules/music/services/note.service';

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
  @State() isNumberSystem: boolean;
  @State() isFlat: boolean;
  @State() scales: Scale[];

  selectRoot: Action;
  selectScale: Action;
  selectTuning: Action;
  toggleNaming: Action;
  toggleAccidental: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => ({
      root: fromMusic.getSelectedNote(state),
      scale: fromMusic.getSelectedScale(state),
      tuning: fromMusic.getSelectedTuning(state),
      isNumberSystem: fromMusic.isNumberSystem(state),
      isFlat: fromMusic.isFlat(state),
      scales: fromMusic.getScales(state),
    }));

    this.store.mapDispatchToProps(this, {
      selectRoot: actions.note.SelectAction,
      selectScale: actions.scale.SelectAction,
      selectTuning: actions.tuning.SelectAction,
      toggleNaming: actions.note.ToggleNamingAction,
      toggleAccidental: actions.note.ToggleAccidentalAction,
    });
  }

  handleVisualToggle = (event) => {
    console.log('here')
    if (event.detail.value === 'naming') {
      this.toggleNaming();
    } else if (event.detail.value === 'accidental') {
      this.toggleAccidental();
    }
  }

  handleTune = slinkyNum => (event) => {
    this.selectTuning(Object.assign([], this.tuning, { [slinkyNum]: event.detail.text }));
  }

  handleSelectScale = (scaleId: number) => () => {
    this.selectScale(scaleId);
  }

  handleRange = (event) => {
    const { value } = event.target;
    this.selectRoot(value === 0 ? null : stringifyNote(value));
    event.srcElement.shadowRoot.querySelector('.range-pin').innerHTML = value === 0 ? 'All' : stringifyNote(value);
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
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Guitar Roots {this.root ? ` - ${stringifyNote(this.root)}` : ''}</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        
        <fret-board />

        <div padding-top class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child is-12 box">
              <ion-range
                min={0}
                max={12}
                step={1}
                snaps={true}
                pin={true}
                color="secondary"
                mode="ios"
                onIonChange={this.handleRange}
              ></ion-range>
            </div>
          </div>
        </div>

        <div class="tile is-ancestor">
          <div class="tile is-parent is-4">
            <article class="tile is-child box notification is-primary">
              <div class="content">
                <p class="title">Scales</p>
                <p class="subtitle">View scales based on the root</p>
                <div class="content">
                  <ion-list class="scale-list">
                    <ion-radio-group>
                      {this.scales.map(scale =>
                        <ion-item>
                          <ion-label text-capitalize>{scale.label}</ion-label>
                          <ion-radio
                            color="secondary"
                            value={scale.label}
                            checked={scale.id === this.scale.id}
                            onIonSelect={this.handleSelectScale(scale.id)}
                            mode="ios"
                          />
                        </ion-item>
                      )}
                    </ion-radio-group>
                  </ion-list>
                </div>
              </div>
            </article>
          </div>
          <div class="tile is-vertical">
            <div class="tile">
              <div class="tile is-parent is-vertical">
                <article class="tile is-child box notification is-info">
                  <p class="title">Visualize...</p>
                  <div class="level">
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">Pitch Letters</p>
                        <ion-toggle
                          value="naming"
                          checked={!this.isNumberSystem}
                          onIonChange={this.handleVisualToggle}
                          color="tertiary"
                        />
                      </div>
                    </div>
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">Number System</p>
                        <ion-toggle
                          value="naming"
                          checked={this.isNumberSystem}
                          onIonChange={this.handleVisualToggle}
                          color="tertiary"
                        />
                      </div>
                    </div>
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">Flat Accidental</p>
                        <ion-toggle
                          value="accidental"
                          checked={this.isFlat}
                          onIonChange={this.handleVisualToggle}
                          color="danger"
                        />
                      </div>
                    </div>
                    
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">Sharp Accidental</p>
                        <ion-toggle
                          value="accidental"
                          checked={!this.isFlat}
                          onIonFocus={this.handleVisualToggle}
                          color="danger"
                        />
                      </div>
                    </div>
                  </div>
                </article>
                <article class="tile is-child box notification is-success">
                  <p class="title">...tiles</p>
                  <p class="subtitle">Bottom tile</p>
                </article>
              </div>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box notification is-danger">
                <p class="title">Tuning</p>
                <p class="subtitle">Try something new</p>
                <div class="content">
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* <nav class="panel">
          <p class="panel-heading">
            Scales
          </p>
          <div class="panel-block">
            <p class="control has-icons-left">
              <input class="input is-small" type="text" placeholder="search" />
              <span class="icon is-small is-left">
                <ion-icon name="search" />
              </span>
            </p>
          </div>
          <div class="panel-block">
            <ion-list>
              <ion-radio-group>
                {this.scales.map(scale =>
                  <ion-item>
                    <ion-label text-capitalize>{scale.label}</ion-label>
                    <ion-radio
                      color="secondary"
                      value={scale.label}
                      onIonSelect={this.handleSetMode(scale)}
                      mode="ios"
                    />
                  </ion-item>
                )}
              </ion-radio-group>
            </ion-list>
          </div>
        </nav> */}

      </ion-content>
    ];
  }
}
