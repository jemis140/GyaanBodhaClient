import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Input } from "antd";
import { Typography, Card } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import UploadDoc from "./UploadDoc";
import { getConversationChain } from "../api/PdfAPI";
import Conversation from "../../../components/common/conversation/Conversation";
import { handleQuestionSubmission } from "../api/pdfFunctions";
import { realtimeDb, db } from "../../../firebase";
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
import GenerateReportConvesation from "../../../components/common/data/GeneReportConversation";
import { message } from "antd";

const { Title } = Typography;

const updateQuestionCountInFirestore = (userId, pdfQuestionCount) => {
  // Get a reference to Firestore
  const userDocRef = doc(db, "users", userId);
  setDoc(userDocRef, { pdfQuestionCount });
};

const createNewUserDocument = (userId, initialSummaryCount) => {
  const userDocRef = doc(db, "users", userId);
  setDoc(userDocRef, { pdfQuestionCount: initialSummaryCount });
};

const PdfTab = () => {
  const { Text } = Typography;
  const [files, setFiles] = useState();
  const [uniqueId, setUniqueId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChainCreated, setIsChainCreated] = useState(false);
  const [showLimitExceededModal, setShowLimitExceededModal] = useState(false);
  const [responseFlag, setResponseFlag] = useState(false);
  const [question, setQuestion] = useState("");
  // Define pdfQuestionCount state variable at the top level
  const [pdfQuestionCount, setPdfQuestionCount] = useState(0);
  const dispatch = useDispatch();
  const [chatData, setChatData] = useState([]);
  const chatRef = useRef(null); // Use a ref to store the database reference

  const checkFileLimit = (files) => {
    if (files.length > 3) {
      message.error("You can upload a maximum of three files.");
      return false;
    }
    return true;
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const pdfQuestionRateLimiter = async () => {
    const userId = localStorage.getItem("userId");
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      let questionCount = userDoc.data().pdfQuestionCount || 0;

      // Define the maximum number of questions allowed
      const questionLimit = 100; // Change the limit to 7

      if (questionCount >= questionLimit) {
        // Disable the "Submit" button when the limit is reached
        setShowLimitExceededModal(true);
        return true;
      } else {
        setPdfQuestionCount(questionCount + 1);
        const newPdfQuestionCount = questionCount + 1;
        updateQuestionCountInFirestore(userId, newPdfQuestionCount);
        return false;
      }
    } else {
      const initialQuestionCount = 1;
      createNewUserDocument(userId, initialQuestionCount);
      setPdfQuestionCount(1);
      return false;
    }
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
    if (!files || !checkFileLimit(files)) {
      return;
    }

    try {
      setLoading(true); // Show loader
      const response = await getConversationChain(files);
      if (response.status === 200) {
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
    console.log("inside handle ask pdf question");

    setLoading(true); // Show loader
    console.log("inside handle ask pdf question");
    handleQuestionSubmission(question, uniqueId);
    setLoading(false); // Hide loader

    // Scroll to the bottom when the response is received
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
          <div lg={10} style={{ marginRight: "10px", marginLeft: "5px" }}>
            {/* Process button takes 10% of UploadDoc width */}
            <GradientButton
              onClick={handleCreateConversationChain}
              label="Submit"
              width="100px"
              disabled={loading}
            />
          </div>
          <div>
            <GenerateReportConvesation
              style={{
                padding: "6px 12px",
                marginLeft: "10px", // Increase the spacing between buttons
                borderRadius: "4px",
              }}
              chatData={chatData}
            />
          </div>
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
        {chatData.length === 0 && loading !== true && (
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
