import { signOut } from "../components/authentication/api/authenticationAPI";

const SESSION_TIMEOUT = 60 * 1000; // 1 hour in milliseconds

let sessionTimer;

const startSessionTimer = () => {
  sessionTimer = setTimeout(() => {
    // Implement logout logic here
    // For example, sign out the user using your authentication API
    // Here, we're assuming signOut returns a Promise
    signOut()
      .then(() => {
        console.log("User logged out due to inactivity.");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }, SESSION_TIMEOUT);
};

const resetSessionTimer = () => {
  clearTimeout(sessionTimer);
  startSessionTimer();
};

const clearSessionTimer = () => {
  clearTimeout(sessionTimer);
};

export { startSessionTimer, resetSessionTimer, clearSessionTimer };
