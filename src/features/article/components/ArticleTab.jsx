import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card } from "antd";
import ArticleURLForm from "./ArticleURLForm";
import Conversation from "../../../components/common/conversation/Conversation";
import Loader from "../../../components/common/conversation/Loader";
import Description from "../../../components/common/data-display/Desciption";
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

  const userId = sessionStorage.getItem("userId");

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    chatRef.current = ref(realtimeDb, `users/${userId}/modules/article`);
    const chatListener = onValue(chatRef.current, (snapshot) => {
      const chatDataArray = [];
      snapshot.forEach((childSnapshot) => {
        chatDataArray.push(childSnapshot.val());
      });
      setChatData(chatDataArray);
      console.log("Chat Data"), chatData;
      setIsLoading(false);
    });
    return () => {
      if (chatRef.current) {
        off(chatRef.current, "value", chatListener);
      }
    };
  }, []);

  useEffect(() => {
    dispatch(fetchArticleSummary());
  }, []);

  const handleGenerateSummary = async (articleUrl) => {
    try {
      setLoading(true);

      const summaryResponse = await getArticleSummary(articleUrl);

      if (summaryResponse.status === 200) {
        const summary = summaryResponse.data.aiResponse;
        console.log("summary  userId", summary, "\n", "userID", userId);
        handleArticleSummaryData(summary);
        scrollToBottom();
      } else {
        console.error(
          `Failed to get article summary: ${summaryResponse.status}`
        );
      }
    } catch (error) {
      console.error("Generate Vector Store Error:", error);
    } finally {
      setLoading(false);
    }
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
          marginBottom: "10px",
        }}
      >
        <Description moduleType="ARTICLE_SUMMARY" />
        <ArticleURLForm onUrlSubmit={handleGenerateSummary} />
        {loading && <Loader />}
      </Card>
      <Row gutter={[16, 16]} style={{ margin: "8px" }}>
        <Col xs={24} sm={24} md={24} lg={24}>
          {isLoading ? <Loader /> : <Conversation chatData={chatData} />}
        </Col>
      </Row>
    </div>
  );
};

export default ArticleTab;
