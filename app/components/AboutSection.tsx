'use client';

import Image from 'next/image';
import Arrow from './Arrow';
import Kicker from './Kicker';

export default function AboutSection() {
  return (
    <section id="about">
      <div className="wrap about">
        <figure className="about-art" style={{ margin: 0 }}>
          <Image className="logo-dark-img" src="/logo-dark.png" alt="The Foundry Loom logo" width={400} height={400} />
          <Image className="logo-light-img" src="/logo-light.png" alt="The Foundry Loom logo" width={400} height={400} />
          <figcaption>One continuous thread, from what you know to where you&apos;re heard.</figcaption>
        </figure>
        <div className="about-copy">
          <Kicker>About us</Kicker>
          <h2>A studio for leaders with something real to say</h2>
          <p className="lede" style={{ marginTop: 22 }}>
            The Foundry Loom is a Mumbai-based marketing services agency. We start with the raw material only you have: operating numbers, investment theses, lessons you paid for. Then we shape it into consistent content that reaches decision-makers.
          </p>
          <div className="name-pair">
            <div>
              <h3>Foundry</h3>
              <p>Where raw material is forged. We begin with your substance, never with trends or templates.</p>
            </div>
            <div>
              <h3>Loom</h3>
              <p>Where single threads become fabric. We weave that substance into one narrative across every channel.</p>
            </div>
          </div>
          <a className="btn btn-primary" href="#process">
            How we work <span className="dot"><Arrow /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
