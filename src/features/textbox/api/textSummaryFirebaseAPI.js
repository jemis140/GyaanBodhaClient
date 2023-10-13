const storeTextChatData = (content, type, userId) => {
  const chatRef = ref(realtimeDb, `users/${userId}/chatsText`);
  const newChatRef = push(chatRef);

  set(newChatRef, {
    type,
    content,
    timestamp: Date.now(),
  });

  storeTextChat([{ type: "ai", content: aiMessage }]);
};

export const handleTextSummaryData = async (summary, userId) => {
  try {
    console.log("ai message", summary);
    const aiMessageContent = summary;
    if (aiMessageContent) {
      storeTextChatData(aiMessageContent, "ai", userId);
    }
  } catch (error) {
    console.error("Get Query Response Error:", error);
  }
};
