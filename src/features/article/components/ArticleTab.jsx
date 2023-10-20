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
import { realtimeDb, db } from "../../../firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { ref, onValue, off } from "firebase/database";
import LimitMessage from "../../../components/common/feedback/LimitMessage";

const ArticleTab = () => {
  const dispatch = useDispatch();
  const [chatData, setChatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  const [articleSummaryCount, setArticleSummaryCount] = useState(0);
  const [showLimitExceededModal, setShowLimitExceededModal] = useState(false);

  const userId = localStorage.getItem("userId");

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const updateSummaryCountInFirestore = async (userId, newSummaryCount) => {
    const userDocRef = doc(db, "users", userId);
    await setDoc(
      userDocRef,
      { articleSummaryCount: newSummaryCount },
      { merge: true }
    );
  };

  const createNewUserDocument = (userId, initialSummaryCount) => {
    const userDocRef = doc(db, "users", userId);
    setDoc(userDocRef, { articleSummaryCount: initialSummaryCount });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
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

        // Retrieve the user's summary count from Firestore
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          let userSummaryCount =
            userDocSnapshot.data().articleSummaryCount || 0;

          if (userSummaryCount >= 3) {
            // Display the "Limit Exceeded" modal
            setShowLimitExceededModal(true);
          } else {
            handleArticleSummaryData(summary);
            setArticleSummaryCount(userSummaryCount + 1);
            scrollToBottom();
            const newSummaryCount = userSummaryCount + 1;

            // Update the summary count in Firestore
            updateSummaryCountInFirestore(userId, newSummaryCount);
          }
        } else {
          const initialSummaryCount = 1;
          createNewUserDocument(userId, initialSummaryCount);
          setArticleSummaryCount(initialSummaryCount);
          handleArticleSummaryData(summary);
          scrollToBottom();
        }
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
      <LimitMessage
        open={showLimitExceededModal}
        onClose={() => setShowLimitExceededModal(false)}
      />
    </div>
  );
};

export default ArticleTab;
