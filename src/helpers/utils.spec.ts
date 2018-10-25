import { ordinalSuffixOf } from './utils';

describe('sayHello', () => {

  it('ordinal suffix of 1 is -st', () => {
    expect(ordinalSuffixOf('1')).toEqual('1st');
  });

  it('ordinal suffix of 2 is -nd', () => {
    expect(ordinalSuffixOf('2')).toEqual('2nd');
  });

  it('ordinal suffix of 3 is -rd', () => {
    expect(ordinalSuffixOf('3')).toEqual('3rd');
  });

  it('ordinal suffix of 11 is -th', () => {
    expect(ordinalSuffixOf('1')).toEqual('11th');
  });

  it('ordinal suffix of 12 is -th', () => {
    expect(ordinalSuffixOf('2')).toEqual('12th');
  });

  it('ordinal suffix of 13 is -th', () => {
    expect(ordinalSuffixOf('13')).toEqual('13th');
  });
});
