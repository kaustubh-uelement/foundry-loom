'use client';

import { PERSONAS } from '@/app/lib/data';
import Kicker from './Kicker';

export default function WhoSection() {
  return (
    <section id="who" style={{ paddingTop: 0 }}>
      <div className="wrap panel">
        <div className="who-top">
          <div>
            <Kicker>Who this is for</Kicker>
            <h2>People whose expertise should be better known</h2>
            <p className="big">
              If you have built, invested or operated in a serious way,{' '}
              <strong>you already have the material. We make sure the right rooms hear it</strong>: customers, investors, future hires, editors and event organisers.
            </p>
          </div>
          <div className="feature">
            <div className="cap glass">
              <h3>Ready to be known for what you know?</h3>
              <p>If you want your ideas to open doors to deals, capital, talent and stages, this is for you.</p>
            </div>
          </div>
        </div>
        <div className="personas">
          {PERSONAS.map(([who, name, body]) => (
            <article className="persona" key={name}>
              <span className="who">{who}</span>
              <div className="cap glass">
                <h3>{name}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
