import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button } from "antd";
import { getEuclidConversationChain } from "../api/euclidAPI";
import { realtimeDb } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";
import { useDispatch } from "react-redux";

import { fetchChatConversations } from "../../../store/modules/euclid/euclidThunks";
import { handleQuestionSubmission } from "../api/euclidFirebaseAPI";
import Conversation from "./conversation/Conversation";
import EuclidForm from "./forms/EuclidForm";
import QuestionInput from "./forms/Question";

const EuclidTab = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [chatData, setChatData] = useState([]);
  const [question, setQuestion] = useState("");
  const [uniqueId, setUniqueId] = useState("");

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current = ref(realtimeDb, "chatsEuclid");

    const chatListener = onValue(chatRef.current, (snapshot) => {
      const chatDataArray = [];
      snapshot.forEach((childSnapshot) => {
        chatDataArray.push(childSnapshot.val());
      });
      setChatData(chatDataArray);
      setIsLoading(false);
    });

    return () => {
      if (chatRef.current) {
        off(chatRef.current, "value", chatListener);
      }
    };
  }, []);

  useEffect(() => {
    dispatch(fetchChatConversations());
  }, []);

  const handleCreateConversationChain = async (files, url, text) => {
    try {
      const response = await getEuclidConversationChain(files, url, text);
      if (response.status === 200) {
        const id = response.data.unique_id;
        setUniqueId(id);
        console.log(`conversation chain create with unique id: ${uniqueId}`);
      } else {
        console.error(`Failed to get article summary: ${response.status}`);
      }
    } catch (error) {
      console.error("Generate Vector Store Error:", error);
    }
  };

  const handleAskQuestion = async () => {
    handleQuestionSubmission(question, uniqueId);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "50px",
      }}
    >
      <EuclidForm onFormSubmit={handleCreateConversationChain} />

      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={24} lg={24}>
          {/* QuestionInput component */}
          <QuestionInput
            question={question}
            setQuestion={setQuestion}
            onAsk={handleAskQuestion}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ margin: "10px" }}>
        <Col xs={24} sm={24} md={24} lg={24}>
          {/* Conversation component */}
          {isLoading ? (
            <p>Loading chat data...</p>
          ) : (
            <Conversation chatData={chatData} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EuclidTab;
