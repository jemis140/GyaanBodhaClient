import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Input } from "antd";
import { Typography, Card } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import UploadDoc from "./UploadDoc";
import { getConversationChain } from "../api/PdfAPI";
import QuestionInput from "./Question";
import Conversation from "../../../components/common/conversation/Conversation";
import { handleQuestionSubmission } from "../pdfFunctions";
import { realtimeDb } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { fetchChatConversations } from "../../../store/modules/pdf/pdfThunks";
import GradientButton from "../../../components/common/general/Button";
import ChatInput from "../../../components/common/data/ChatQuestion";
import Description from "../../../components/common/data-display/Desciption";
import Loader from "../../../components/common/conversation/Loader";
import { message } from "antd";

const { Title } = Typography;

const PdfTab = () => {
  const { Text } = Typography;
  const [files, setFiles] = useState();
  const [uniqueId, setUniqueId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChainCreated, setIsChainCreated] = useState(false);
  const [responseFlag, setResponseFlag] = useState(false);
  const [question, setQuestion] = useState("");

  const dispatch = useDispatch();
  const [chatData, setChatData] = useState([]);
  const chatRef = useRef(null); // Use a ref to store the database reference

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    chatRef.current = ref(realtimeDb, "chats");

    // Set up a listener for changes in the chat data
    const chatListener = onValue(chatRef.current, (snapshot) => {
      const chatDataArray = [];
      snapshot.forEach((childSnapshot) => {
        chatDataArray.push(childSnapshot.val());
      });
      setChatData(chatDataArray);
      setIsLoading(false);
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

  const handleCreateConversationChain = async () => {
    if (!files) {
      message.error("Please upload a document before starting a conversation.");
      return;
    }

    try {
      setLoading(true); // Show loader
      const response = await getConversationChain(files);
      if (response.status === 200) {
        const id = response.data.unique_id;
        setUniqueId(id);
        setIsChainCreated(true); // Mark the chain as created
        message.success(
          `Conversation chain created with unique id: ${uniqueId}`
        );
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
    if (!isChainCreated) {
      message.error("Please upload a document before starting a conversation.");
      return;
    }

    setLoading(true); // Show loader
    await handleQuestionSubmission(question, uniqueId);
    setLoading(false); // Hide loader

    // Scroll to the bottom when response is received
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
          background: "linear-gradient(to right, #ffffff, #f0f0f0)",
          boxShadow: " 0 4px 8px rgba(0, 0.1, 0.1, 0.1)",
        }}
        bodyStyle={{
          borderColor: "linear-gradient(to left, #4d2882, #b74400)",
          border: "1px solid transparent",
          borderRadius: "8px",
          padding: "20px",
          margin: "10px",
        }}
      >
        {/* start of input section */}
        <Description moduleType="PDF_QA" />
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            {/* UploadDoc takes the full width */}
            <UploadDoc setFiles={setFiles} disabled={loading} />
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={16} md={14} lg={10}>
            {/* Process button takes 10% of UploadDoc width */}
            <GradientButton
              onClick={handleCreateConversationChain}
              label="Submit"
              width="30%"
              disabled={loading}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            {/* QuestionInput component */}
            <Title level={5}>
              Ask Question
              <QuestionCircleOutlined style={{ marginLeft: "5px" }} />
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            {/* QuestionInput component */}
            <ChatInput
              question={question}
              setQuestion={setQuestion}
              onAsk={handleAskQuestion}
              disabled={loading}
            />
          </Col>
        </Row>
        {loading && <Loader />}
      </Card>
      {/* end of section */}
      <Row
        gutter={[16, 16]}
        style={{ marginTop: "10px", marginBottom: "20px" }}
      >
        <Col xs={24} sm={24} md={24} lg={24}>
          {/* Conversation component */}
          {isLoading ? <Loader /> : <Conversation chatData={chatData} />}
        </Col>
      </Row>
    </div>
  );
};

export default PdfTab;
