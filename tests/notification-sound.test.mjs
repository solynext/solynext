import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

function setup({ unavailable = false } = {}) {
  const contexts = [];
  class AudioContext {
    constructor() {
      if (unavailable) throw new Error('Audio unavailable');
      this.state = 'suspended'; this.currentTime = 0; this.destination = {}; this.notes = []; this.envelopes = [];
      contexts.push(this);
    }
    resume() { this.state = 'running'; return Promise.resolve(); }
    close() { this.state = 'closed'; return Promise.resolve(); }
    createOscillator() {
      const note = { frequency: { setValueAtTime: (frequency, time) => { note.pitch = frequency; note.time = time; } }, connect() {}, disconnect() {}, start(time) { this.startTime = time; }, stop(time) { this.stopTime = time; } };
      this.notes.push(note); return note;
    }
    createGain() {
      const envelope = [];
      this.envelopes.push(envelope);
      return { gain: { setValueAtTime: (...args) => envelope.push(['set', ...args]), linearRampToValueAtTime: (...args) => envelope.push(['linear', ...args]), exponentialRampToValueAtTime: (...args) => envelope.push(['exponential', ...args]) }, connect() {}, disconnect() {} };
    }
  }
  const compiled = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(new URL('../lib/notifications/sound.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('module', 'exports', 'AudioContext', code)(compiled, compiled.exports, AudioContext);
  return { player: compiled.exports.createNotificationSound(), contexts };
}
test('notification audio stays silent until unlocked and uses a soft two-note envelope', () => {
  const { player, contexts } = setup();
  player.play(); assert.equal(contexts.length, 0);
  player.unlock(); player.play();
  assert.equal(contexts.length, 1);
  assert.equal(contexts[0].notes.length, 2);
  assert.equal(contexts[0].notes[1].startTime, 0.12);
  for (const envelope of contexts[0].envelopes) {
    assert.equal(envelope[0][1], 0);
    assert(envelope[1][1] <= 0.045);
    assert.equal(envelope.at(-1)[1], 0);
  }
});
test('simultaneous arrivals produce one chime and later arrivals can play again', () => {
  const { player, contexts } = setup();
  player.unlock(); player.play(); player.play();
  assert.equal(contexts[0].notes.length, 2);
  contexts[0].currentTime = 2;
  player.play(); assert.equal(contexts[0].notes.length, 4);
});
test('suspended audio and unavailable browsers do not interrupt notifications', () => {
  const { player, contexts } = setup();
  player.unlock(); contexts[0].state = 'suspended'; player.play();
  assert.equal(contexts[0].notes.length, 0);
  const unsupported = setup({ unavailable: true }).player;
  assert.doesNotThrow(() => { unsupported.unlock(); unsupported.play(); unsupported.dispose(); });
});
test('unmounting closes audio resources and prevents subsequent playback', () => {
  const { player, contexts } = setup();
  player.unlock(); player.dispose(); player.unlock(); player.play();
  assert.equal(contexts.length, 1);
  assert.equal(contexts[0].state, 'closed');
  assert.equal(contexts[0].notes.length, 0);
});
