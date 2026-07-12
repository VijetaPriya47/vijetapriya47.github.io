import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import TerminalHero from '@site/src/components/TerminalHero';
import PortfolioSections from '@site/src/components/PortfolioSections';
import MediumCards from '@site/src/components/MediumCards';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Vijeta Priya - Backend & Distributed Systems"
      description="Portfolio of Vijeta Priya - Backend & Distributed Systems Engineer">
      <main>
        <TerminalHero />

        <PortfolioSections />
        <section id="blog" className="home-blog-section">
          <div className="home-blog-content">
            <h2 className="term-heading">
              cat blog/<span className="term-heading-flag">--latest</span>
            </h2>
            <MediumCards />
          </div>
        </section>
      </main>
    </Layout>
  );
}
