
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./assets/logo.jpg"; // Certifique-se de colocar sua imagem aqui

function SimuladorSolar() {
  const [consumo, setConsumo] = useState(0);
  const [valorKwh, setValorKwh] = useState(0.95);
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const investimento = consumo * 1000 * 5; // valor estimado fictício
    const economiaMensal = consumo * valorKwh;
    const payback = (investimento / (economiaMensal * 12)).toFixed(1);
    setResultado({ investimento, payback });
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Simulador de Energia Solar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-xl shadow">
          <div className="mb-2">
            <label className="block font-medium">Nome</label>
            <input type="text" className="w-full p-2 rounded border" />
          </div>
          <div className="mb-2">
            <label className="block font-medium">Estado</label>
            <input type="text" className="w-full p-2 rounded border" />
          </div>
          <div className="mb-2">
            <label className="block font-medium">Consumo (kWh/mês)</label>
            <input type="number" value={consumo} onChange={(e) => setConsumo(Number(e.target.value))} className="w-full p-2 rounded border" />
          </div>
          <div className="mb-2">
            <label className="block font-medium">Valor do kWh (R$)</label>
            <input type="number" step="0.01" value={valorKwh} onChange={(e) => setValorKwh(Number(e.target.value))} className="w-full p-2 rounded border" />
          </div>
          <div className="mb-2">
            <label className="block font-medium">Tipo de Telhado</label>
            <input type="text" className="w-full p-2 rounded border" />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Concessionária</label>
            <input type="text" className="w-full p-2 rounded border" />
          </div>
          <button onClick={calcular} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Calcular</button>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold mb-4">Resultado</h2>
          {resultado ? (
            <div>
              <p><strong>Sistema Orçado:</strong> R$ {resultado.investimento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              <p><strong>Payback:</strong> {resultado.payback} anos</p>
            </div>
          ) : (
            <p>Preencha os dados e clique em calcular.</p>
          )}
        </div>
      </div>
    </main>
  );
}

function PaginaProvisoria({ titulo, conteudo }) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{titulo}</h1>
      <p className="text-gray-600 whitespace-pre-line">{conteudo}</p>
    </main>
  );
}

function Home() {
  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Notícias */}
      <section className="md:col-span-1 bg-purple-100 p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Notícias da Empresa</h2>
        <ul className="list-disc list-inside text-sm">
          <li>Nova obra iniciada em março.</li>
          <li>Parceria com empresa do setor agrícola.</li>
          <li>Equipe técnica ampliada.</li>
        </ul>
      </section>

      {/* Acesso rápido */}
      <section className="md:col-span-2 grid grid-cols-2 gap-4">
        <Link to="/solar" className="bg-blue-100 hover:bg-blue-200 p-4 rounded-xl shadow text-center font-semibold">Simulador Energia Solar</Link>
        <Link to="/industrial" className="bg-blue-100 hover:bg-blue-200 p-4 rounded-xl shadow text-center font-semibold">Elétrica Industrial</Link>
        <Link to="/comercial" className="bg-blue-100 hover:bg-blue-200 p-4 rounded-xl shadow text-center font-semibold">Projetos Gerais</Link>
        <Link to="/gerador" className="bg-blue-100 hover:bg-blue-200 p-4 rounded-xl shadow text-center font-semibold">Gerador Automático Diesel</Link>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black font-sans">
        <header className="flex items-center justify-between px-6 py-4 shadow-md">
          <Link to="/">
            <img src={logo} alt="Felix Automação" className="h-12 w-auto" />
          </Link>
          <nav className="space-x-4 text-sm font-medium">
            <Link to="/solar" className="hover:underline">Energia Solar</Link>
            <Link to="/industrial" className="hover:underline">Elétrica Industrial</Link>
            <Link to="/comercial" className="hover:underline">Elétrica Predial/Comercial</Link>
            <Link to="/gerador" className="hover:underline">Gerador Diesel</Link>
            <Link to="/sobre" className="hover:underline">Sobre</Link>
            <Link to="/contato" className="hover:underline">Contato</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solar" element={<SimuladorSolar />} />
          <Route path="/industrial" element={<PaginaProvisoria titulo="Elétrica Industrial" conteudo="Oferecemos soluções completas para instalações elétricas industriais, incluindo:

- Painéis de comando e força
- Infraestrutura elétrica para máquinas e galpões
- Dimensionamento e proteção de cargas
- Manutenção preventiva e corretiva" />} />
          <Route path="/comercial" element={<PaginaProvisoria titulo="Elétrica Comercial e Predial" conteudo="Atuamos em:

- Projetos elétricos comerciais e residenciais
- Obras com acompanhamento técnico
- Parcerias com construtoras e arquitetos
- Instalações modernas e seguras conforme norma" />} />
          <Route path="/gerador" element={<PaginaProvisoria titulo="Gerador Diesel" conteudo="Trabalhamos com geradores a diesel com partida automática, integrados a painéis ATS, intertravamento com nobreaks e sistemas de continuidade total para estabelecimentos que não podem parar." />} />
          <Route path="/sobre" element={<PaginaProvisoria titulo="Sobre a Empresa" conteudo="A Felix Automação é especializada em soluções elétricas e automação industrial, com foco em qualidade, inovação e segurança." />} />
          <Route path="/contato" element={<PaginaProvisoria titulo="Contato" conteudo="Entre em contato conosco:

📧 Email: felix.cnpj@gmail.com
📱 WhatsApp: (54) 98406-2271" />} />
        </Routes>
      </div>
    </Router>
  );
}
