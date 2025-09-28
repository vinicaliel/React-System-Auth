import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <span className="logo-icon">☀️</span>
              <span>SolarDetect</span>
            </div>
            <nav className="nav">
              <Link to="/login" className="nav-link">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Detecte e Monitore <span className="highlight">Placas Solares</span> com Tecnologia Avançada
              </h1>
              <p className="hero-description">
                Plataforma inovadora para detecção, registro e monitoramento de instalações de energia solar.
                Conectando estudantes e empresas para um futuro mais sustentável.
              </p>
              <div className="hero-buttons">
                <Link to="/register/student" className="btn btn-primary">
                  <span className="btn-icon">👨‍🎓</span>
                  Sou Estudante
                </Link>
                <Link to="/register/company" className="btn btn-secondary">
                  <span className="btn-icon">🏢</span>
                  Sou Empresa
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="solar-panel-graphic">
               
                <div className="panels">
                  <div className="panel"></div>
                  <div className="panel"></div>
                  <div className="panel"></div>
                  <div className="panel"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <div className="container">
            <h2 className="section-title">Por que Energia Solar?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <span className="benefit-icon">🌱</span>
                <h3>Sustentabilidade</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
              </div>
              <div className="benefit-card">
                <span className="benefit-icon">⚡</span>
                <h3>Economia</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
              </div>
              <div className="benefit-card">
                <span className="benefit-icon">☀️</span>
                <h3>Renovável</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="platform-section">
          <div className="container">
            <div className="platform-content">
              <div className="platform-text">
                <h2>Nossa Plataforma</h2>
                <p>
                  O SolarDetect utiliza tecnologia de ponta para identificar e catalogar 
                  instalações de energia solar, criando uma rede conectada entre estudantes 
                  pesquisadores e empresas do setor.
                </p>
                <ul className="platform-features">
                  <li>
                    <span className="feature-icon">→</span>
                    Detecção automática via satélite
                  </li>
                  <li>
                    <span className="feature-icon">→</span>
                    Análise de eficiência energética
                  </li>
                  <li>
                    <span className="feature-icon">→</span>
                    Conexão entre estudantes e empresas
                  </li>
                  <li>
                    <span className="feature-icon">→</span>
                    Relatórios detalhados e insights
                  </li>
                </ul>
              </div>
              <div className="platform-stats">
                <div className="stat-card">
                  <div className="stat-number">10k+</div>
                  <div className="stat-label">Placas Detectadas</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Empresas Parceiras</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">2k+</div>
                  <div className="stat-label">Estudantes Ativos</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Pronto para começar?</h2>
              <p>Junte-se à revolução da energia solar no Brasil</p>
              <div className="cta-buttons">
                <Link to="/register/student" className="btn btn-primary">
                  Cadastrar como Estudante
                </Link>
                <Link to="/register/company" className="btn btn-outline">
                  Cadastrar como Empresa
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2025 SolarDetect. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;