import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Card } from "antd";
import { getEuclidConversationChain } from "../api/euclidAPI";
import { realtimeDb } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";
import { useDispatch } from "react-redux";
import ChatInput from "../../../components/common/data/ChatQuestion";
import { fetchChatConversations } from "../../../store/modules/euclid/euclidThunks";
import { handleQuestionSubmission } from "../api/euclidFirebaseAPI";
import Conversation from "../../../components/common/conversation/Conversation";
import Description from "../../../components/common/data-display/Desciption";
import Loader from "../../../components/common/conversation/Loader";
import EuclidForm from "./forms/EuclidForm";

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
      <Card
        style={{
          background: "linear-gradient(to right, #ffffff, #f0f0f0f)",
          boxShadow: " 0 4px 8px rgba(0, 0, 0.1, 0.1)",
          marginLeft: "10px",
          marginBottom: "10px",
        }}
        bodyStyle={{
          borderColor: "linear-gradient(to left, #4d2882, #b74400)",
          border: "1px solid transparent",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "10px",
        }}
      >
        <Description moduleType="EUCLID_QA" />
        <EuclidForm onFormSubmit={handleCreateConversationChain} />
        <Row gutter={[16, 16]} style={{ margin: "10px" }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            {/* QuestionInput component */}
            <ChatInput
              question={question}
              setQuestion={setQuestion}
              onAsk={handleAskQuestion}
            />
          </Col>
        </Row>
      </Card>
      <Row gutter={[16, 16]} style={{ margin: "10px" }}>
        <Col xs={24} sm={24} md={24} lg={24}>
          {/* Conversation component */}
          {isLoading ? <Loader /> : <Conversation chatData={chatData} />}
        </Col>
      </Row>
    </div>
  );
};

export default EuclidTab;
