import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  BookOpen,
  Users,
  LayoutGrid,
  MessageSquare,
  UploadCloud,
  Eye,
  Save,
  Edit,
  Smartphone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import ComicPanel from '../components/ComicPanel';

const LandingPage = () => {
  const samplePanel1 = {
    panelNumber: 1,
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80',
    character: 'AX-09 Valkyrie',
    dialogue: 'Sensor sweep complete. The mainframe has been breached in Sector 4.',
    narration: 'Neo-Avalon, 2099. The rain hides what the corporate telemetry refuses to see.',
    dialogueStyle: 'speech',
    bubblePosition: 'top-left',
    soundEffect: 'BZZZT!',
  };

  const samplePanel2 = {
    panelNumber: 2,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    character: 'Commander Voss',
    dialogue: 'Initiate protocol Overdrive! We must extract the core before they trace our signal!',
    narration: 'There was only one way out, and it meant heading straight through the defense grid.',
    dialogueStyle: 'shout',
    bubblePosition: 'top-right',
    soundEffect: 'KRAAA-KOW!',
  };

  const howItWorksSteps = [
    {
      step: '01',
      title: 'CREATE YOUR STORY',
      description: 'Define your storyline, premise, genre, and world-building backdrop.',
      icon: BookOpen,
    },
    {
      step: '02',
      title: 'BUILD YOUR CHARACTERS',
      description: 'Cast protagonists, cyborgs, AI entities, and antagonists with rich backstories.',
      icon: Users,
    },
    {
      step: '03',
      title: 'DESIGN YOUR PANELS',
      description: 'Arrange panels, upload imagery, and drop comic speech bubbles and narration.',
      icon: LayoutGrid,
    },
    {
      step: '04',
      title: 'PUBLISH YOUR COMIC',
      description: 'Preview the full comic book, export high-res panels, and share your vision.',
      icon: Zap,
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Story Builder',
      desc: 'Formulate arcs, genres, titles, and cinematic descriptions with ease.',
    },
    {
      icon: Users,
      title: 'Character Management',
      desc: 'Maintain cast profiles, roles, avatars, and character-assigned speech bubbles.',
    },
    {
      icon: LayoutGrid,
      title: 'Panel Creator',
      desc: 'Seamlessly configure panel sequences, scenes, and visual storytelling pacing.',
    },
    {
      icon: MessageSquare,
      title: 'Dialogue Editor',
      desc: 'Create realistic comic speech bubbles, shouts, thoughts, and narration boxes.',
    },
    {
      icon: UploadCloud,
      title: 'Image Upload',
      desc: 'Upload custom artwork or choose from our curated sci-fi visual presets.',
    },
    {
      icon: Eye,
      title: 'Comic Preview',
      desc: 'Inspect your complete comic page in real-time as you assemble your narrative.',
    },
    {
      icon: Save,
      title: 'Save Comics',
      desc: 'Secure cloud persistence keeps your works-in-progress safe across sessions.',
    },
    {
      icon: Edit,
      title: 'Edit Comics',
      desc: 'Easily update dialogue, swap imagery, or reorganize panel numbers on the fly.',
    },
    {
      icon: Smartphone,
      title: 'Responsive Viewer',
      desc: 'Designed for desktop monitors, laptops, tablets, and smartphones alike.',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '60px' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          padding: '80px 24px 40px',
          overflow: 'hidden',
          backgroundColor: '#05070B',
          backgroundImage:
            'radial-gradient(circle at 50% 20%, rgba(0, 191, 255, 0.12) 0%, transparent 60%)',
        }}
      >
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          {/* Glowing Badge */}
          <div style={{ display: 'inline-block', marginBottom: '20px' }}>
            <span
              className="badge badge-cyan"
              style={{ padding: '6px 16px', fontSize: '0.8rem', letterSpacing: '0.08em' }}
            >
              <Sparkles size={14} /> AI-POWERED DIGITAL COMIC ENGINE
            </span>
          </div>

          <h1
            className="font-sci-fi"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1.1,
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}
          >
            Turn Your Stories <br />
            <span className="text-gradient">Into Comics.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-muted)',
              maxWidth: '700px',
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}
          >
            Create characters, build scenes, add dialogue, and bring your stories to life
            through futuristic digital comic creation.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '50px',
            }}
          >
            <Link to="/create-comic" className="btn btn-primary btn-lg font-sci-fi">
              <Zap size={18} /> CREATE YOUR COMIC
            </Link>
            <a href="#example-comic" className="btn btn-outline btn-lg font-sci-fi">
              EXPLORE DEMO
            </a>
          </div>

          {/* Hero Visual: Interactive Comic Panels Teaser */}
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              padding: '16px',
              backgroundColor: '#0B1118',
              borderRadius: '16px',
              border: '1px solid rgba(0, 191, 255, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 191, 255, 0.15)',
            }}
          >
            <ComicPanel panel={samplePanel1} height="320px" />
            <ComicPanel panel={samplePanel2} height="320px" />
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section id="how-it-works" className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>
            CREATION WORKFLOW
          </span>
          <h2 className="font-sci-fi" style={{ fontSize: '2.4rem', textTransform: 'uppercase' }}>
            How ComicCraft Works
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            From blank canvas to published digital comic in 4 intuitive steps.
          </p>
        </div>

        <div className="grid-cols-4">
          {howItWorksSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  className="font-sci-fi"
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: 'rgba(0, 191, 255, 0.25)',
                    marginBottom: '16px',
                    lineHeight: 1,
                  }}
                >
                  {step.step}
                </div>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 191, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    border: '1px solid rgba(0, 191, 255, 0.3)',
                  }}
                >
                  <Icon size={20} color="var(--accent-cyan)" />
                </div>
                <h3
                  className="font-sci-fi"
                  style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#FFFFFF' }}
                >
                  {step.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section id="features" className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>
            ENGINE CAPABILITIES
          </span>
          <h2 className="font-sci-fi" style={{ fontSize: '2.4rem', textTransform: 'uppercase' }}>
            Engineered For Creators
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            A comprehensive suite of tools built for modern comic creation.
          </p>
        </div>

        <div className="grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="card" style={{ display: 'flex', gap: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 191, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(0, 191, 255, 0.25)',
                  }}
                >
                  <Icon size={22} color="var(--accent-cyan)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '6px', color: '#FFFFFF' }}>
                    {f.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. EXAMPLE COMIC SHOWCASE */}
      <section id="example-comic" className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>
            LIVE SHOWCASE
          </span>
          <h2 className="font-sci-fi" style={{ fontSize: '2.4rem', textTransform: 'uppercase' }}>
            Experience ComicCraft
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            Here is a sample panel sequence generated with ComicCraft's studio tools.
          </p>
        </div>

        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            backgroundColor: '#0B1118',
            padding: '24px',
            borderRadius: '16px',
            border: '2px solid rgba(0, 191, 255, 0.3)',
            boxShadow: '0 0 40px rgba(0, 191, 255, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '16px',
            }}
          >
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
                CYBERPUNK / SCI-FI
              </span>
              <h3 className="font-sci-fi" style={{ fontSize: '1.4rem' }}>
                NEON SYNDICATE: EPISODE 01
              </h3>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Author: <strong style={{ color: '#FFFFFF' }}>ComicCraft Studio</strong>
            </div>
          </div>

          {/* Panels vertically stacked */}
          <ComicPanel panel={samplePanel1} height="360px" />
          <ComicPanel panel={samplePanel2} height="360px" />
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="container">
        <div
          className="card pulse-glow"
          style={{
            textAlign: 'center',
            padding: '60px 24px',
            background: 'linear-gradient(180deg, #111827 0%, #0B1118 100%)',
            border: '1px solid rgba(0, 191, 255, 0.5)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <h2
              className="font-sci-fi"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              Start Creating Your <span className="text-cyan">Comic Universe</span>
            </h2>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '1rem',
                lineHeight: 1.6,
                marginBottom: '32px',
              }}
            >
              Join visual storytellers, artists, and writers around the globe.
              No design experience required.
            </p>
            <Link to="/register" className="btn btn-primary btn-lg font-sci-fi">
              CREATE FREE ACCOUNT <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
