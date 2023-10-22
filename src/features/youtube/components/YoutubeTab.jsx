import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Input, message, Card, Typography } from "antd";
import { realtimeDb } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";
import { useDispatch } from "react-redux";
import { getYoutubeConversationChain } from "../api/youtubeAPI";
import { QuestionCircleOutlined } from "@ant-design/icons";
import YoutubeQuestionInput from "./YoutubeQuestion";
import YoutubeURLInput from "./YoutubeUrlInput";
import Conversation from "../../../components/common/conversation/Conversation";
import { handleYoutubeQuestionSubmission } from "../api/youtubeFunctions";
import { fetchYoutubeChatConversations } from "../../../store/modules/youtube/youtubeThunks";
import ChatInput from "../../../components/common/data/ChatQuestion";
import GradientButton from "../../../components/common/general/Button";
import Description from "../../../components/common/data-display/Desciption";
import Loader from "../../../components/common/conversation/Loader";
import { scrollToBottom } from "../../../utils/helperFunctions";
import GenerateReportConvesation from "../../../components/common/data/GeneReportConversation";
import NoConversationComponent from "../../../components/common/general/NoConversationMessage";

const { Title } = Typography;
const YoutubeTab = () => {
  const dispatch = useDispatch();

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChainCreated, setIsChainCreated] = useState(false); // Add loading state
  const [chatData, setChatData] = useState([]);

  const chatRef = useRef(null); // Use a ref to store the database reference

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    chatRef.current = ref(realtimeDb, `users/${userId}/modules/youtube`);

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
    // if (!!chatDataArray || chatDataArray.length === 0) {
    //   setIsLoading(false); // To do: in case of empty chat No conversation
    // }

    return () => {
      if (chatRef.current) {
        off(chatRef.current, "value", chatListener); // Detach the listener
      }
    };
  }, []);

  useEffect(() => {
    dispatch(fetchYoutubeChatConversations());
  }, []);

  const handleCreateConversationChain = async () => {
    if (youtubeUrl.length == 0) {
      message.error("Please enter valid URL to start Q/A chain.");
      return;
    }
    try {
      const response = await getYoutubeConversationChain(youtubeUrl);
      if (response.status == 200) {
        // Create a Blob URL to download the file
        const id = response.data.unique_id;
        setUniqueId(id);
        setIsChainCreated(true);
        scrollToBottom();
        console.log(`conversation chain create with unique id: ${uniqueId}`);
      } else {
        console.error(`Failed to get vector store: ${response.status}`);
      }
    } catch (error) {
      console.error("Generate Vector Store Error:", error);
    }
  };

  const handleAskQuestion = async () => {
    if (!isChainCreated) {
      message.error("Please process video first to start Q/A chain.");
      return;
    }
    handleYoutubeQuestionSubmission(question, uniqueId);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "25px",
      }}
    >
      <Card
        style={{
          background: "linear-gradient(to right, #ffffff, #f0f0f0f)",
          boxShadow: " 0 4px 8px rgba(0, 0, 0.1, 0.1)",
        }}
        bodyStyle={{
          borderColor: "linear-gradient(to left, #4d2882, #b74400)",
          border: "1px solid transparent",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "10px",
        }}
      >
        <Description moduleType="YT_QA" />
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            {/* UploadDoc takes the full width */}
            <YoutubeURLInput setYoutubeUrl={setYoutubeUrl} />
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={8} md={6} lg={3}>
            {/* Process button takes 10% of UploadDoc width */}
            <GradientButton
              label="Submit"
              onClick={handleCreateConversationChain}
              width="100%"
            />
          </Col>
          <Col xs={24} sm={8} md={6} lg={3}>
            <GenerateReportConvesation
              style={{
                padding: "6px 12px",
                marginLeft: "10px", // Increase the spacing between buttons
                borderRadius: "4px",
                width: "100%",
              }}
              chatData={chatData}
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
            />
          </Col>
        </Row>
        {loading && <Loader />}
        {chatData.length === 0 && (
          <NoConversationComponent moduleName="Youtube Conversation Chain" />
        )}
      </Card>
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

export default YoutubeTab;
