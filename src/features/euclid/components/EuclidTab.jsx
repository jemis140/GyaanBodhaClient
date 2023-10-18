import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Card, Typography, message } from "antd";
import { getEuclidConversationChain } from "../api/euclidAPI";
import { realtimeDb } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";
import { useDispatch } from "react-redux";
import ChatInput from "../../../components/common/data/ChatQuestion";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { fetchChatConversations } from "../../../store/modules/euclid/euclidThunks";
import { handleQuestionSubmission } from "../api/euclidFirebaseAPI";
import Conversation from "../../../components/common/conversation/Conversation";
import Description from "../../../components/common/data-display/Desciption";
import Loader from "../../../components/common/conversation/Loader";
import EuclidForm from "./forms/EuclidForm";

const { Title } = Typography;

const EuclidTab = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [question, setQuestion] = useState("");
  const [uniqueId, setUniqueId] = useState("");

  const chatRef = useRef(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    chatRef.current = ref(realtimeDb, `users/${userId}/modules/euclid`);

    // Set up a listener for changes in the chat data
    const chatListener = onValue(chatRef.current, (snapshot) => {
      const chatDataArray = [];
      snapshot.forEach((childSnapshot) => {
        chatDataArray.push(childSnapshot.val());
      });
      setChatData(chatDataArray);

      // Set isLoading to false if chatDataArray is empty or not defined
      if (!!chatDataArray || chatDataArray.length === 0) {
        setIsLoading(false);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      if (chatRef.current) {
        off(chatRef.current, "value", chatListener); // Detach the listener
      }
    };
  }, []);

  useEffect(() => {
    dispatch(fetchChatConversations());
  }, []);

  const handleCreateConversationChain = async (files, url, text) => {
    try {
      setLoading(true);
      const response = await getEuclidConversationChain(files, url, text);
      if (response.status === 200) {
        const id = response.data.unique_id;
        setUniqueId(id);
        setIsChainCreated(true); // Mark the chain as created
        message.success(`Conversation chain created`);
      } else {
        message.error(`Failed to get vector store: ${response.status}`);
      }
    } catch (error) {
      message.error("Generate Vector Store Error:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleAskQuestion = async () => {
    setLoading(true);
    handleQuestionSubmission(question, uniqueId);
    setLoading(false);
    scrollToBottom();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "15px",
      }}
    >
      <Card
        style={{
          background: "linear-gradient(to right, #ffffff, #f0f0f0f)",
          boxShadow: " 0 4px 8px rgba(0, 0, 0.1, 0.1)",
          margin: "15px",
        }}
        bodyStyle={{
          borderColor: "linear-gradient(to left, #4d2882, #b74400)",
          border: "1px solid transparent",
          borderRadius: "8px",
          padding: "20px",
          margin: "10px",
        }}
      >
        <Description moduleType="EUCLID_QA" />
        <EuclidForm onFormSubmit={handleCreateConversationChain} />
        <Row
          gutter={[16, 16]}
          style={{ marginBottom: "10px", marginLeft: "10px" }}
        >
          <Col xs={24} sm={24} md={24} lg={24}>
            {/* QuestionInput component */}
            <Title level={5}>
              Ask Question
              <QuestionCircleOutlined style={{ marginLeft: "5px" }} />
            </Title>
          </Col>
        </Row>
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
