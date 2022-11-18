import React from 'react';
import chellphoneImg from '../assets/imgs/cellphone.png';

export default function Home() {
  return (
    <main id="home-page">
      <section className="info-section">
        <div className="content-container">
          <h2>A CARTEIRA DA NOVA GERAÇÃO.</h2>
          <p>É para todas as idades!</p>
        </div>
        <div className="img-container">
          <img src={chellphoneImg} alt="Smartphones exibindo detalhes da carteira digital" />
        </div>
      </section>
    </main>
  );
}
