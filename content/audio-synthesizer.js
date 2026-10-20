/**
 * Theme Studio for GitHub - Audio Synthesizer Engine
 * Procedural Web Audio API sound generation. Zero dependencies, zero latency, 100% offline.
 */

(function () {
  'use strict';

  class ThemeAudioEngine {
    constructor() {
      this.ctx = null;
      this.masterGain = null;
      this.enabled = true;
      this.volume = 0.7;
      this.soundPack = 'arcade-8bit';
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return false;
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return true;
    }

    setVolume(val) {
      this.volume = Math.max(0, Math.min(1, parseFloat(val) || 0.5));
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      }
    }

    setSoundPack(pack) {
      this.soundPack = pack || 'arcade-8bit';
    }

    setEnabled(enabled) {
      this.enabled = !!enabled;
    }

    // Play star sound (coin / level up arpeggio)
    playStar() {
      if (!this.enabled || !this.init()) return;
      const t = this.ctx.currentTime;

      if (this.soundPack === 'arcade-8bit') {
        // Classic Mario-style coin chime: B5 -> E6
        this._playBeep(987.77, t, 0.08, 'square', 0.25);
        this._playBeep(1318.51, t + 0.08, 0.35, 'square', 0.35);
      } else if (this.soundPack === 'anime-sparkle') {
        // Sparkling fairy arpeggio: C6, E6, G6, C7
        [1046.5, 1318.5, 1567.98, 2093.0].forEach((freq, idx) => {
          this._playBeep(freq, t + idx * 0.045, 0.2, 'sine', 0.2);
        });
      } else if (this.soundPack === 'cyberpunk-synth') {
        // Futuristic dual laser chirp
        this._playGlissando(400, 1800, t, 0.15, 'sawtooth', 0.2);
        this._playGlissando(600, 2400, t + 0.08, 0.2, 'sawtooth', 0.15);
      } else if (this.soundPack === 'tactile-click') {
        this._playClick(t);
      } else {
        // Modern Chime: gentle bell E5 -> B5
        this._playBell(659.25, t, 0.4, 0.3);
        this._playBell(987.77, t + 0.09, 0.6, 0.35);
      }
    }

    // Play fork sound
    playFork() {
      if (!this.enabled || !this.init()) return;
      const t = this.ctx.currentTime;
      // Dual tone split
      this._playBeep(523.25, t, 0.12, 'triangle', 0.3);
      this._playBeep(783.99, t + 0.09, 0.18, 'triangle', 0.3);
    }

    // Play merge PR victory sound (triumphant brass / fanfare)
    playMerge() {
      if (!this.enabled || !this.init()) return;
      const t = this.ctx.currentTime;

      if (this.soundPack === 'arcade-8bit') {
        // 8-bit victory fanfare: G4, C5, E5, G5 sustained
        const notes = [392.00, 523.25, 659.25, 783.99];
        notes.forEach((freq, i) => {
          const duration = (i === notes.length - 1) ? 0.6 : 0.12;
          this._playBeep(freq, t + i * 0.11, duration, 'square', 0.3);
        });
      } else {
        // Rich brass celebratory chord
        [523.25, 659.25, 783.99, 1046.5].forEach((freq) => {
          this._playRichChordNote(freq, t, 0.8, 0.15);
        });
      }
    }

    // Play commit sound
    playCommit() {
      if (!this.enabled || !this.init()) return;
      const t = this.ctx.currentTime;
      this._playClick(t);
      this._playBell(880, t + 0.04, 0.25, 0.2);
    }

    // Play focus mode sound
    playFocusMode(enabled) {
      if (!this.enabled || !this.init()) return;
      const t = this.ctx.currentTime;
      if (enabled) {
        // Power down
        this._playGlissando(800, 200, t, 0.22, 'sine', 0.25);
      } else {
        // Power up
        this._playGlissando(200, 900, t, 0.22, 'sine', 0.25);
      }
    }

    // --- Audio Synthesis Primitives ---

    _playBeep(freq, startTime, duration, type = 'sine', volume = 0.3) {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration);
      } catch (e) {
        // Ignore audio interruption
      }
    }

    _playBell(freq, startTime, duration, volume = 0.3) {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        // Instant attack, logarithmic release
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration);
      } catch (e) {}
    }

    _playGlissando(startFreq, endFreq, startTime, duration, type = 'sine', volume = 0.25) {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(startFreq, startTime);
        osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), startTime + duration);

        gain.gain.setValueAtTime(volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration);
      } catch (e) {}
    }

    _playClick(startTime) {
      try {
        // Noise buffer for mechanical tactile feel
        const bufferSize = this.ctx.sampleRate * 0.03;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        // Bandpass filter to simulate keyboard switch
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, startTime);
        filter.Q.setValueAtTime(3.0, startTime);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.4, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.03);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(startTime);
      } catch (e) {}
    }

    _playRichChordNote(freq, startTime, duration, volume = 0.2) {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(volume, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration);
      } catch (e) {}
    }
  }

  // Export singleton instance
  window.themeAudio = new ThemeAudioEngine();
})();
