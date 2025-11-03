import React, { useState } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState("");
  const [tempo, setTempo] = useState("");
  const [plano, setPlano] = useState(null); // O plano começa como null

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 💡 O estado 'plano' é redefinido para uma string de loading antes de enviar
    setPlano("Carregando plano de estudos...");

    const payload = {
      tarefas: tarefas,
      tempo: tempo,
    };

    // Usamos try...catch para lidar com falhas de rede ou servidor
    try {
      // CORRIGIDO: URL e variável 'response'
      const response = await fetch('httpsa://assessor-enem-backend-dv.onrender.com/api/gerar-plano', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      // Lemos a resposta JSON (seja sucesso ou erro)
      const data = await response.json();

      if (!response.ok) {
        // Se o status for 400 ou 500, usamos a mensagem de erro do backend
        throw new Error(data.erro || "Falha no servidor.");
      }

      // Sucesso: Atualiza o estado com o texto do plano da IA
      setPlano(data.plano);
    } catch (error) {
      console.error("Erro na comunicação com o Backend", error);

      // Exibe a mensagem de erro na tela
      setPlano(
        "ERRO: Não foi possível gerar o plano. Verifique se o Backend está ligado.",
      );
    }
  };

  return (
    <>
      {/* Background image */}
      <img
        src="/imagemdvdev.png"
        alt=""
        aria-hidden="true"
        className="bg-image"
      />
      <div className="app-container">
        <form className="study-form" onSubmit={handleSubmit}>
          <label htmlFor="tarefas">Suas tarefas do dia</label>
          <textarea
            id="tarefas"
            value={tarefas}
            onChange={(e) => setTarefas(e.target.value)}
            placeholder="Descreva rapidamente o que precisa estudar ou revisar..."
            required
            rows={2}
          />
          <label htmlFor="tempo">Tempo disponível</label>
          <input
            id="tempo"
            type="text"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            placeholder="Tempo disponível (ex: 3 horas)"
            required
          />

          <button className="submit-btn" type="submit">
            Gerar Plano ENEM com IA
          </button>
        </form>
        {/* RENDERIZAÇÃO CONDICIONAL */}
        {plano && (
          <div className="plano-container">
            <hr />
            <h3>Resultado da Assessoria:</h3>
            <div dangerouslySetInnerHTML={{ __html: plano }} />
          </div>
        )}
      </div>
      {/* Assinatura com LinkedIn e GitHub */}
      <footer className="rodape-desenvolvedor">
        <span>
          Desenvolvido por <strong>Daniel Vieira</strong>
        </span>
        <a
          href="https://www.linkedin.com/in/dv-dev/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="social-link"
        >
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            fill="#0A66C2"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginInline: "0.5em -0.1em", verticalAlign: "middle" }}
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.75 19h-2.5v-8.5h2.5v8.5zm-1.25-9.682c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.672 1.5 1.5s-.671 1.5-1.5 1.5zm13.25 9.682h-2.5v-4.604c0-1.098-.021-2.512-1.531-2.512-1.532 0-1.767 1.197-1.767 2.432v4.684h-2.5v-8.5h2.4v1.161h.034c.333-.63 1.142-1.294 2.351-1.294 2.511 0 2.973 1.653 2.973 3.801v4.832z" />
          </svg>
        </a>
        <a
          href="https://github.com/dv-dev1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="social-link"
        >
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginInline: "0.3em", verticalAlign: "middle" }}
          >
            <path
              d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577
              0-.285-.01-1.04-.016-2.042-3.338.724-4.042-1.611-4.042-1.611-.545-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729
              1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.109-.775.419-1.304.762-1.604-2.665-.305-5.467-1.334-5.467-5.931
              0-1.31.469-2.381 1.236-3.221-.124-.304-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.019.005
              2.046.138 3.004.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.872.118 3.176.77.84 1.235 1.911 1.235 3.221
              0 4.609-2.807 5.624-5.479 5.921.43.371.814 1.103.814 2.222 0 1.606-.014 2.899-.014 3.293 0 .319.192.694.801.576
              C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>
      </footer>
    </>
  );
}

export default App;
