const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const stage = document.getElementById('stage');
const startScreen = document.getElementById('start-screen');
const lessonScreen = document.getElementById('lesson-screen');
const endScreen = document.getElementById('end-screen');
const lessonCard = document.getElementById('lesson-card');
const feedbackPanel = document.getElementById('feedback-panel');
const stepNumber = document.getElementById('step-number');
const progressFill = document.getElementById('progress-fill');
const progressMeter = document.getElementById('progress-meter');
const retryCountElement = document.getElementById('retry-count');
const endCopy = document.getElementById('end-copy');

const steps = [
  {
    type: 'choice',
    title: 'Listen and choose',
    prompt: 'Which word has the strongest R sound?',
    options: [
      { label: 'rabbit', correct: true },
      { label: 'bucket', correct: false },
      { label: 'panda', correct: false }
    ],
    success: 'Exactly — “rabbit” begins with a clear R that helps your tongue find the spot.',
    failure: 'This one is trickier. “Rabbit” is the choice that starts with the R sound you are practicing.'
  },
  {
    type: 'pair',
    title: 'Spot the R pair',
    prompt: 'Select the pair of words that both contain R.',
    options: [
      { label: 'rain • rock', correct: true },
      { label: 'hat • jump', correct: false },
      { label: 'moon • lake', correct: false }
    ],
    success: 'Well done! Both words in that pair hold the R sound clearly.',
    failure: 'Try again — aim for the pair where both words include the R sound.'
  },
  {
    type: 'mirror',
    title: 'Mirror mode',
    prompt: 'Press show to see how your mouth should feel when saying R.',
    details: 'If you have a mirror, watch your tongue rise just behind your teeth. If not, imagine the motion and say “red river.”',
    buttonText: 'Show mirror cue',
    success: 'Nice work! Feeling the tongue placement makes the sound more reliable.',
    failure: 'When you repeat, try to keep the lips relaxed and the tongue lifted behind the teeth.'
  },
  {
    type: 'phrase',
    title: 'Practice phrase',
    prompt: 'Which phrase is built to emphasize the R sound clearly?',
    options: [
      { label: 'strong rider', correct: true },
      { label: 'flute singer', correct: false },
      { label: 'quiet sunset', correct: false }
    ],
    success: 'Great choice! That phrase puts the R sound in two strong spots.',
    failure: 'Keep going — choose the phrase that keeps the R sound in focus.'
  }
];

let currentStep = 0;
let retryCount = 0;
let completed = false;

function initProgressMeter() {
  progressMeter.innerHTML = steps.map(() => '<span></span>').join('');
}

function showScreen(screen) {
  [startScreen, lessonScreen, endScreen].forEach((node) => node.classList.remove('active'));
  screen.classList.add('active');
}

function updateProgress() {
  stepNumber.textContent = currentStep + 1;
  const progress = ((currentStep) / steps.length) * 100;
  progressFill.style.width = `${progress}%`;
  progressMeter.querySelectorAll('span').forEach((bar, index) => {
    bar.classList.toggle('active', index < currentStep);
  });
}

function renderLessonCard() {
  lessonCard.innerHTML = '';
  feedbackPanel.hidden = true;
  const step = steps[currentStep];
  const card = document.createElement('div');
  card.className = 'exercise-card';

  const title = document.createElement('h2');
  title.textContent = step.title;
  card.appendChild(title);

  const copy = document.createElement('p');
  copy.className = 'exercise-copy';
  copy.textContent = step.prompt;
  card.appendChild(copy);

  if (step.type === 'choice' || step.type === 'pair' || step.type === 'phrase') {
    const grid = document.createElement('div');
    grid.className = 'choice-grid';
    step.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'choice-btn';
      button.type = 'button';
      button.textContent = option.label;
      button.addEventListener('click', () => handleSelection(option, button));
      grid.appendChild(button);
    });
    card.appendChild(grid);
  }

  if (step.type === 'mirror') {
    const detail = document.createElement('div');
    detail.className = 'mirror-overlay';
    detail.textContent = step.details;
    card.appendChild(detail);

    const mirrorButton = document.createElement('button');
    mirrorButton.className = 'mirror-btn';
    mirrorButton.type = 'button';
    mirrorButton.textContent = step.buttonText;
    mirrorButton.addEventListener('click', () => handleMirror(step));
    card.appendChild(mirrorButton);
  }

  lessonCard.appendChild(card);
  requestAnimationFrame(() => card.classList.add('visible'));
}

function handleSelection(option, button) {
  const correct = option.correct;
  if (correct) {
    button.classList.add('correct');
    showFeedback(true, steps[currentStep].success);
  } else {
    button.classList.add('incorrect');
    showFeedback(false, steps[currentStep].failure);
  }
}

function handleMirror(step) {
  showFeedback(true, step.success, true);
}

function showFeedback(success, message, allowAdvance = false) {
  feedbackPanel.hidden = false;
  feedbackPanel.className = 'feedback-panel active';
  feedbackPanel.innerHTML = '';

  const feedbackCopy = document.createElement('div');
  feedbackCopy.className = `feedback-copy ${success ? 'correct' : 'incorrect'}`;
  feedbackCopy.textContent = message;
  feedbackPanel.appendChild(feedbackCopy);

  const actions = document.createElement('div');
  actions.className = 'feedback-actions';

  if (success) {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'primary-btn feedback-btn';
    nextBtn.textContent = currentStep < steps.length - 1 ? 'Continue' : 'Finish lesson';
    nextBtn.addEventListener('click', () => advanceLesson());
    actions.appendChild(nextBtn);
  } else {
    const retryBtn = document.createElement('button');
    retryBtn.className = 'primary-btn feedback-btn';
    retryBtn.textContent = 'Retry this card';
    retryBtn.addEventListener('click', () => {
      retryCount += 1;
      retryCountElement.textContent = retryCount;
      renderLessonCard();
    });
    actions.appendChild(retryBtn);
  }

  feedbackPanel.appendChild(actions);
}

function advanceLesson() {
  currentStep += 1;
  if (currentStep >= steps.length) {
    completeLesson();
    return;
  }
  updateProgress();
  renderLessonCard();
}

function completeLesson() {
  completed = true;
  showScreen(endScreen);
  progressFill.style.width = '100%';
  progressMeter.querySelectorAll('span').forEach((bar) => bar.classList.add('active'));
  retryCountElement.textContent = retryCount;
  endCopy.textContent = retryCount > 0
    ? `You retried ${retryCount} time${retryCount === 1 ? '' : 's'} and completed the lesson — that persistence is a real win.`
    : 'Excellent flow. You completed the lesson cleanly and stayed focused!';
}

function startLesson() {
  currentStep = 0;
  retryCount = 0;
  retryCountElement.textContent = 0;
  completed = false;
  initProgressMeter();
  updateProgress();
  showScreen(lessonScreen);
  renderLessonCard();
}

function resetLesson() {
  showScreen(startScreen);
}

startButton.addEventListener('click', startLesson);
restartButton.addEventListener('click', resetLesson);

initProgressMeter();
showScreen(startScreen);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      console.warn('Service worker registration failed');
    });
  });
}
