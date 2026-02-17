import type { PatternModule } from '@core/types'

export const facadePattern: PatternModule = {
  id: 'facade',
  name: 'Facade',
  category: 'structural',
  difficulty: 'beginner',
  description:
    'Provides a unified interface to a set of interfaces in a subsystem, making the subsystem easier to use.',
  whenToUse: [
    'When you need a simple interface to a complex subsystem',
    'When there are many dependencies between clients and implementation classes',
    'When you want to layer your subsystems',
    'When you want to decouple clients from subsystem components',
  ],
  whenNotToUse: [
    'When the subsystem is simple enough to use directly',
    'When clients need fine-grained control over the subsystem',
    'When adding the facade adds unnecessary complexity',
    'When you need to expose all subsystem functionality',
  ],
  badExample: `// ❌ Anti-Pattern: Client directly managing complex subsystem
class VideoDecoder { decode(file: string) { /* complex */ } }
class AudioDecoder { decode(file: string) { /* complex */ } }
class SubtitleParser { parse(file: string) { /* complex */ } }
class VideoRenderer { render(video: any) { /* complex */ } }
class AudioPlayer { play(audio: any) { /* complex */ } }
class SubtitleOverlay { overlay(subs: any) { /* complex */ } }

// Client must know and orchestrate all components
function playVideo(file: string) {
  const videoDecoder = new VideoDecoder();
  const audioDecoder = new AudioDecoder();
  const subtitleParser = new SubtitleParser();
  const videoRenderer = new VideoRenderer();
  const audioPlayer = new AudioPlayer();
  const subtitleOverlay = new SubtitleOverlay();

  const video = videoDecoder.decode(file);
  const audio = audioDecoder.decode(file);
  const subs = subtitleParser.parse(file + '.srt');

  videoRenderer.render(video);
  audioPlayer.play(audio);
  subtitleOverlay.overlay(subs);
  // Complex coordination logic duplicated everywhere
}`,
  goodExample: `// ✅ Best Practice: Facade Pattern
// Complex subsystem classes (hidden from client)
class VideoDecoder { decode(file: string) { return { video: file }; } }
class AudioDecoder { decode(file: string) { return { audio: file }; } }
class SubtitleParser { parse(file: string) { return { subs: file }; } }
class VideoRenderer { render(video: any) { console.log('Rendering'); } }
class AudioPlayer { play(audio: any) { console.log('Playing audio'); } }
class SubtitleOverlay { overlay(subs: any) { console.log('Subtitles on'); } }

// Facade - simple interface to complex subsystem
class VideoPlayerFacade {
  private videoDecoder = new VideoDecoder();
  private audioDecoder = new AudioDecoder();
  private subtitleParser = new SubtitleParser();
  private videoRenderer = new VideoRenderer();
  private audioPlayer = new AudioPlayer();
  private subtitleOverlay = new SubtitleOverlay();

  play(file: string, withSubtitles = false): void {
    console.log('Starting playback...');

    const video = this.videoDecoder.decode(file);
    const audio = this.audioDecoder.decode(file);

    this.videoRenderer.render(video);
    this.audioPlayer.play(audio);

    if (withSubtitles) {
      const subs = this.subtitleParser.parse(file + '.srt');
      this.subtitleOverlay.overlay(subs);
    }
  }

  stop(): void {
    console.log('Stopping playback...');
  }
}

// Client uses simple interface
const player = new VideoPlayerFacade();
player.play('movie.mp4', true);`,
  diagram: {
    nodes: [
      {
        id: 'client',
        type: 'class',
        label: 'Client',
        position: { x: 80, y: 150 },
        size: { width: 120, height: 50 },
      },
      {
        id: 'facade',
        type: 'class',
        label: 'Facade',
        position: { x: 280, y: 130 },
        size: { width: 160, height: 80 },
        methods: ['+operation1()', '+operation2()'],
      },
      {
        id: 'subsystem-a',
        type: 'class',
        label: 'SubsystemA',
        position: { x: 500, y: 50 },
        size: { width: 140, height: 60 },
        methods: ['+methodA()'],
      },
      {
        id: 'subsystem-b',
        type: 'class',
        label: 'SubsystemB',
        position: { x: 660, y: 50 },
        size: { width: 140, height: 60 },
        methods: ['+methodB()'],
      },
      {
        id: 'subsystem-c',
        type: 'class',
        label: 'SubsystemC',
        position: { x: 500, y: 200 },
        size: { width: 140, height: 60 },
        methods: ['+methodC()'],
      },
      {
        id: 'subsystem-d',
        type: 'class',
        label: 'SubsystemD',
        position: { x: 660, y: 200 },
        size: { width: 140, height: 60 },
        methods: ['+methodD()'],
      },
    ],
    edges: [
      { id: 'e1', source: 'client', target: 'facade', type: 'dependency' },
      { id: 'e2', source: 'facade', target: 'subsystem-a', type: 'dependency' },
      { id: 'e3', source: 'facade', target: 'subsystem-b', type: 'dependency' },
      { id: 'e4', source: 'facade', target: 'subsystem-c', type: 'dependency' },
      { id: 'e5', source: 'facade', target: 'subsystem-d', type: 'dependency' },
    ],
    viewport: { width: 850, height: 320 },
  },
  relatedPatterns: ['adapter', 'mediator', 'singleton'],
  tags: ['structural', 'gang-of-four', 'simplification', 'subsystem'],
}
