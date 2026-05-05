import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

const LegalPage = () => {
  const { fileName } = useParams(); // Pega o nome do arquivo da URL (ex: terms-of-use)
  const [content, setContent] = useState('');

  useEffect(() => {
    // Busca o arquivo .md na pasta public/docs
    fetch(`/docs/${fileName.toUpperCase().replace(/-/g, '_')}.md`)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error("Erro ao carregar documento:", err));
  }, [fileName]);

  return (
    <main className="container mx-auto p-8 min-h-screen">
      <article className="prose lg:prose-xl mx-auto">
        {/* Renderiza o Markdown com HTML semântico automaticamente */}
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </main>
  );
};

export default LegalPage;