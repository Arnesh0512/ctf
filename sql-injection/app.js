const API_LOGIN_ENDPOINT = '/api/login';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const submitBtn = document.getElementById('submitBtn');

const clientWarning = document.getElementById('clientWarning');
const warningText = document.getElementById('warningText');

const successBanner = document.getElementById('successBanner');
const flagText = document.getElementById('flagText');
const copyFlagBtn = document.getElementById('copyFlagBtn');
const retrievedDataSection = document.getElementById('retrievedDataSection');

const serverErrorBanner = document.getElementById('serverErrorBanner');
const errorTitle = document.getElementById('errorTitle');
const errorDescription = document.getElementById('errorDescription');

// Input validation
const ALPHABET_REGEX = /^[a-zA-Z]+$/;

function validateAlphabetic(value) {
  if (!value) return true;
  return ALPHABET_REGEX.test(value);
}

function updateValidationUI() {
  const userValid = validateAlphabetic(usernameInput.value);
  const passValid = validateAlphabetic(passwordInput.value);

  let hasError = false;
  let reason = '';

  if (!userValid) {
    usernameInput.classList.add('input-invalid');
    hasError = true;
    reason = 'Only alphabetic characters (A-Z, a-z) are permitted in username.';
  } else {
    usernameInput.classList.remove('input-invalid');
  }

  if (!passValid) {
    passwordInput.classList.add('input-invalid');
    hasError = true;
    reason = 'Only alphabetic characters (A-Z, a-z) are permitted in passphrase.';
  } else {
    passwordInput.classList.remove('input-invalid');
  }

  if (hasError) {
    warningText.textContent = reason;
    clientWarning.classList.remove('hidden');
    submitBtn.disabled = true;
  } else {
    clientWarning.classList.add('hidden');
    submitBtn.disabled = false;
  }
}

usernameInput.addEventListener('input', updateValidationUI);
passwordInput.addEventListener('input', updateValidationUI);

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  serverErrorBanner.classList.add('hidden');
  successBanner.classList.add('hidden');

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!ALPHABET_REGEX.test(username) || !ALPHABET_REGEX.test(password)) {
    updateValidationUI();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'COMMUNICATING WITH MAINFRAME...';

  try {
    const res = await fetch(API_LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      handleSuccess(data);
    } else {
      handleError(data);
    }
  } catch (err) {
    handleError({
      message: 'Network error or service unavailable.'
    });
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'AUTHENTICATE WITH MAINFRAME';
  }
});

function handleSuccess(data) {
  successBanner.classList.remove('hidden');
  serverErrorBanner.classList.add('hidden');

  if (data.flag) {
    flagText.textContent = data.flag;
  }

  if (data.records && data.records.length > 0) {
    const formatted = data.records
      .map(r => `• ID: ${r.id} | User: ${r.username} | Role: ${r.role || 'user'}`)
      .join('\n');
    retrievedDataSection.textContent = `Retrieved Records:\n${formatted}`;
  } else {
    retrievedDataSection.textContent = `User: ${data.user?.username || 'admin'}`;
  }
}

function handleError(data) {
  serverErrorBanner.classList.remove('hidden');
  successBanner.classList.add('hidden');

  errorTitle.textContent = 'ACCESS DENIED';
  errorDescription.textContent = data.message || 'Invalid username or password.';
}

copyFlagBtn.addEventListener('click', () => {
  const flag = flagText.textContent;
  if (!flag) return;
  navigator.clipboard.writeText(flag).then(() => {
    copyFlagBtn.textContent = 'COPIED!';
    setTimeout(() => {
      copyFlagBtn.textContent = 'COPY';
    }, 2000);
  });
});
