import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Input } from "antd";
import { Typography, Card } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import UploadDoc from "./UploadDoc";
import { getConversationChain } from "../api/PdfAPI";
import Conversation from "../../../components/common/conversation/Conversation";
import { handleQuestionSubmission } from "../api/pdfFunctions";
import { realtimeDb } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { fetchChatConversations } from "../../../store/modules/pdf/pdfThunks";
import GradientButton from "../../../components/common/general/Button";
import ChatInput from "../../../components/common/data/ChatQuestion";
import Description from "../../../components/common/data-display/Desciption";
import Loader from "../../../components/common/conversation/Loader";
import LimitMessage from "../../../components/common/feedback/LimitMessage";
import NoConversationComponent from "../../../components/common/general/NoConversationMessage";
import { message } from "antd";

const { Title } = Typography;
const updateQuestionCountInFirestore = (userId, questionCount) => {
  // Get a reference to Firestore
  const userDocRef = doc(db, "users", userId);
  setDoc(userDocRef, { questionCount }, { merge: true });
};

const createNewUserDocument = (userId, initialQuestionCount) => {
  const userDocRef = doc(db, "users", userId);
  setDoc(userDocRef, { summaryCount: initialQuestionCount });
};

const PdfTab = () => {
  const { Text } = Typography;
  const [files, setFiles] = useState();
  const [uniqueId, setUniqueId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [questionCount, setQuestionCount] = useState(0);
  const [isChainCreated, setIsChainCreated] = useState(false);
  const [showLimitExceededModal, setShowLimitExceededModal] = useState(false);
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
    const userId = localStorage.getItem("userId");
    chatRef.current = ref(realtimeDb, `users/${userId}/modules/pdf`);

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

  const handleCreateConversationChain = async () => {
    if (!files) {
      message.error("Please upload a document before starting a conversation.");
      return;
    }

    try {
      setLoading(true); // Show loader
      const response = await getConversationChain(files);
      if (response.status === 200) {
        const userId = localStorage.getItem("userId");
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userQuestionCount = userDoc.data().questionCount;
          console.log("userQuestionCount", userQuestionCount);
          if (useQuestionCount >= 3) {
            // Display the "Limit Exceeded" modal
            setShowLimitExceededModal(true);
          } else {
            setQuestionCount((prevCount) => prevCount + 1);
            scrollToBottom();
            const newQuestionCount = userQuestionCount + 1;
            updateQuestionCountInFirestore(userId, newQuestionCount);
          }
        } else {
          const initialQuestionCount = 1;
          createNewUserDocument(userId, initialQuestionCount);
          setQuestionCount(1);
        }

        const id = response.data.unique_id;
        setUniqueId(id);
        setIsChainCreated(true); // Mark the chain as created
        message.success("Conversation chain created");
      } else {
        message.error("Failed to get vector store");
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
        margin: "30px",
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
        {chatData.length === 0 && (
          <NoConversationComponent moduleName="Multiple PDF Conversation chain" />
        )}
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
      <LimitMessage
        open={showLimitExceededModal}
        onClose={() => setShowLimitExceededModal(false)}
      />
    </div>
  );
};

export default PdfTab;
