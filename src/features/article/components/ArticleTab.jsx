import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Card } from "antd";
import ArticleURLForm from "./ArticleURLForm";
import ArticleSummary from "./Summary";
import Conversation from "../../../components/common/conversation/Conversation";
import Loader from "../../../components/common/conversation/Loader";
import Description from "../../../components/common/data-display/Desciption";
import { getCurrentUserId } from "../../../components/authentication/api/authenticationAPI";
import { useDispatch } from "react-redux";
import { fetchArticleSummary } from "../../../store/modules/article/articleThunks";
import { handleArticleSummaryData } from "../api/articleFirebaseFunctions";
import { getArticleSummary } from "../api/articleAPI";
import { realtimeDb } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";

const ArticleTab = () => {
  const dispatch = useDispatch();
  const [chatData, setChatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const userId = getCurrentUserId();
    console.log(userId);
    chatRef.current = ref(realtimeDb, `chatsArticle/${userId}`);
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
    const userId = getCurrentUserId();
    dispatch(fetchArticleSummary(userId));
  }, []);

  const handleGenerateSummary = async (articleUrl) => {
    try {
      setLoading(true);
      const response = await getArticleSummary(articleUrl);

      if (response.status === 200) {
        setLoading(false);
        const summary = response.data.aiResponse;
        const userId = getCurrentUserId();
        handleArticleSummaryData(summary, userId);
        scrollToBottom();
      } else {
        console.error(`Failed to get article summary: ${response.status}`);
      }
    } catch (error) {
      console.error("Generate Vector Store Error:", error);
    }
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
        <Description moduleType="ARTICLE_SUMMARY" />
        <ArticleURLForm onUrlSubmit={handleGenerateSummary} />
        {loading && <Loader />}
      </Card>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={24} lg={24}>
          {isLoading ? <Loader /> : <Conversation chatData={chatData} />}
        </Col>
      </Row>
    </div>
  );
};

export default ArticleTab;
