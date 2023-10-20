import { doc, setDoc, getDoc } from "firebase/firestore";

const updateSummaryCountInFirestore = (userId, summaryCount) => {
  // Get a reference to Firestore
  const userDocRef = doc(db, "users", userId);
  setDoc(userDocRef, { summaryCount }, { merge: true });
};

const createNewUserDocument = (userId, initialSummaryCount) => {
  const userDocRef = doc(db, "users", userId);
  setDoc(userDocRef, { summaryCount: initialSummaryCount });
};

const trackAndLimitSummaryOrQuestions = async (
  userId,
  userDocRef,
  setCountFunction,
  countFieldName,
  limit
) => {
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userCount = userDoc.data()[countFieldName];

    if (userCount > limit) {
      // Display the "Limit Exceeded" modal or handle the limit exceeded scenario
      return false; // Return false to indicate the limit is exceeded
    } else {
      handleDataFunction(); // Handle the summary or question data
      setCountFunction((prevCount) => prevCount + 1);

      const newCount = userCount + 1;
      updateCountInFirestore(userId, newCount, countFieldName);
    }
  } else {
    const initialCount = 1;
    createNewUserDocument(userId, initialCount, countFieldName);
    setCountFunction(1);
    handleDataFunction();
  }

  return true; // Return true to indicate the operation was successful
};

export { trackAndLimitSummaryOrQuestions };
