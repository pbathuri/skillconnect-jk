'use client';

import * as React from 'react';

// Simple toast implementation
export function Toaster() {
  return <div id="toaster" className="fixed bottom-4 right-4 z-50" />;
}

export function toast(options: { title: string; description?: string; variant?: 'default' | 'destructive' }) {
  const toaster = document.getElementById('toaster');
  if (!toaster) return;

  const toastEl = document.createElement('div');
  toastEl.className = `p-4 mb-2 rounded-lg shadow-lg animate-slide-in-right ${
    options.variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-white border'
  }`;
  toastEl.innerHTML = `
    <div class="font-semibold">${options.title}</div>
    ${options.description ? `<div class="text-sm opacity-80">${options.description}</div>` : ''}
  `;
  
  toaster.appendChild(toastEl);
  
  setTimeout(() => {
    toastEl.remove();
  }, 5000);
}

