import React, { useState } from 'react';

export default function AssistantIA() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    if (!question) return;
    setResponse('Chargement...');

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Tu es un assistant en mathématiques niveau collège et lycée.' },
            { role: 'user', content: question },
          ],
        }),
      });

      const data = await res.json();
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content);
      } else {
        setResponse("Désolé, une erreur est survenue.");
      }
    } catch (error) {
      setResponse("Erreur de connexion à l'API.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <textarea
        rows={4}
        className="w-full border rounded p-2 mb-4"
        placeholder="Pose ta question de maths ici..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={handleAsk}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Poser la question
      </button>
      <div className="mt-4 whitespace-pre-wrap">{response}</div>
    </div>
  );
}
