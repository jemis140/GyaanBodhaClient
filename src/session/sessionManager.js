let sessionTimer;

export const startSessionTimer = () => {
  sessionTimer = setTimeout(() => {
    // Session expired, clear sessionStorage and redirect to login
    sessionStorage.clear();
    window.location.href = "/login";
  }, 3600000); // 1 hour in milliseconds
};

export const resetSessionTimer = () => {
  clearTimeout(sessionTimer);
  startSessionTimer();
};

export const updateSessionTimestamp = () => {
  const timestamp = new Date().getTime();
  sessionStorage.setItem("sessionTimestamp", JSON.stringify(timestamp));
};
