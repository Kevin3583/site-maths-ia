import React from 'react';
import AssistantIA from './components/AssistantIA';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Site de Maths avec Assistant IA</h1>
      <AssistantIA />
    </div>
  );
}
