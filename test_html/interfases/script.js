// Данные
let modelData = Array.from({ length: 15 }, (_, i) => ({
  id: `model_${i + 1}`,
  name: `Model ${i + 1}`
}));

let promptData = Array.from({ length: 15 }, (_, i) => ({
  id: `prompt_${i + 1}`,
  name: `Промпт ${i + 1}: "Создай изображение космического пирата на борту парусной яхты в облаках Венеры."`
}));

let prompt2Data = Array.from({ length: 15 }, (_, i) => ({
  id: `prompt2_${i + 1}`,
  name: `Промпт2 ${i + 1}: "Объясни квантовую запутанность так, чтобы понял 10-летний ребёнок."`
}));

const selections = {
  model: null,
  prompt: null,
  prompt2: null
};

let nextPromptId = 16;
let nextPrompt2Id = 16;

// Утилиты
function renderTable(section, data, page = 1, perPage = 5) {
  const tbody = document.querySelector(`#${section}Table tbody`);
  const paginationEl = document.getElementById(`${section}Pagination`);

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageData = data.slice(start, end);
  const totalPages = Math.ceil(data.length / perPage);

  tbody.innerHTML = '';
  paginationEl.innerHTML = '';

  pageData.forEach(item => {
    const tr = document.createElement('tr');
    if (section === 'prompt' || section === 'prompt2') {
      tr.title = item.name;
    }

    const tdCheck = document.createElement('td');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = item.id;
    cb.checked = selections[section] === item.id;

    cb.addEventListener('change', () => {
      document.querySelectorAll(`#${section}Table input[type="checkbox"]`).forEach(el => {
        if (el !== cb) el.checked = false;
      });
      selections[section] = cb.checked ? item.id : null;
    });

    tdCheck.appendChild(cb);
    const tdName = document.createElement('td');
    tdName.textContent = item.name;
    if (section === 'prompt' || section === 'prompt2') {
      tdName.classList.add('prompt-cell');
    }

    tr.appendChild(tdCheck);
    tr.appendChild(tdName);
    tbody.appendChild(tr);
  });

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === page ? 'active' : '';
    btn.onclick = () => renderTable(section, data, i, perPage);
    paginationEl.appendChild(btn);
  }
}

function addPrompt(section) {
  const inputId = section === 'prompt' ? 'newPromptInput' : 'newPrompt2Input';
  const input = document.getElementById(inputId);
  const text = input.value.trim();

  if (!text) {
    alert('Пожалуйста, введите текст промпта.');
    return;
  }

  const id = section === 'prompt'
    ? `prompt_${nextPromptId++}`
    : `prompt2_${nextPrompt2Id++}`;

  const newItem = { id, name: text };

  if (section === 'prompt') {
    promptData.push(newItem);
    renderTable('prompt', promptData);
  } else {
    prompt2Data.push(newItem);
    renderTable('prompt2', prompt2Data);
  }

  input.value = '';
}

async function submitAllSelections() {
  const payload = {};
  if (selections.model) payload.model_id = selections.model;
  if (selections.prompt) payload.prompt_id = selections.prompt;
  if (selections.prompt2) payload.prompt2_id = selections.prompt2;

  const lines = [];
  if (selections.model) lines.push(`Модель: ${selections.model}`);
  if (selections.prompt) lines.push(`Промпт: ${selections.prompt}`);
  if (selections.prompt2) lines.push(`Промпт 2: ${selections.prompt2}`);

  const resultEl = document.getElementById('resultContent');
  if (lines.length === 0) {
    resultEl.textContent = 'Ничего не выбрано';
    alert('❗ Ничего не выбрано. Пожалуйста, выберите хотя бы один элемент.');
    return;
  } else {
    resultEl.textContent = lines.join('\n');
  }

  try {
    const response = await fetch('/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      console.warn('Сервер вернул ошибку, но выбор отображён.');
    }
  } catch (err) {
    console.error('Ошибка запроса:', err);
  }
}

// Обработчики меню
function showAbout() {
  alert('ℹ️ Это интерфейс для выбора модели и промптов для генерации с использованием больших языковых моделей (LLM).');
}

function goToAdmin() {
  // Пример: переход на другую страницу или открытие модального окна
  if (confirm('Перейти в админку?\n(В настоящей системе здесь может быть защищённый раздел.)')) {
    // window.location.href = '/admin'; // раскомментировать при наличии бэкенда
    alert('🛠️ Админка пока недоступна в демо-режиме.');
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderTable('model', modelData);
  renderTable('prompt', promptData);
  renderTable('prompt2', prompt2Data);

  // Основные кнопки
  document.getElementById('submitBtn').addEventListener('click', submitAllSelections);
  document.getElementById('addPromptBtn').addEventListener('click', () => addPrompt('prompt'));
  document.getElementById('addPrompt2Btn').addEventListener('click', () => addPrompt('prompt2'));

  // Меню
  document.getElementById('aboutBtn').addEventListener('click', showAbout);
  document.getElementById('adminBtn').addEventListener('click', goToAdmin);

  // Enter для промптов
  document.getElementById('newPromptInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addPrompt('prompt');
  });
  document.getElementById('newPrompt2Input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addPrompt('prompt2');
  });
});