import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Spin, Modal, Button } from "antd";
import { useSelector } from "react-redux";
import TextInput from "./TextForm";
import TextSummary from "./TextConversation";
import { getTextSummary } from "../api/textSummaryAPI";
import { handleTextSummaryData } from "../api/textSummaryFirebaseAPI";
import { realtimeDb, db } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { fetchTextSummary } from "../../../store/modules/text/textThunks";
import GenerateReport from "../../../components/common/data/GenerateReport";
import Description from "../../../components/common/data-display/Desciption";
import Loader from "../../../components/common/conversation/Loader";
import Conversation from "../../../components/common/conversation/Conversation";
import LimitMessage from "../../../components/common/feedback/LimitMessage";
// import {
//   createNewUserDocumen,
//   updateSummaryCountInFirestore,
//   trackAndLimitSummaryOrQuestions,
// } from "../../../utils/firebaseUtils";

const updateSummaryCountInFirestore = (userId, summaryCount) => {
  // Get a reference to Firestore
  const userDocRef = doc(db, "users", userId);
  setDoc(userDocRef, { summaryCount });
};

const createNewUserDocument = (userId, initialSummaryCount) => {
  const userDocRef = doc(db, "users", userId);
  setDoc(userDocRef, { summaryCount: initialSummaryCount });
};

const TextTab = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [chatData, setChatData] = useState([]);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summaryCount, setSummaryCount] = useState(0);
  const [showLimitExceededModal, setShowLimitExceededModal] = useState(false);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    chatRef.current = ref(realtimeDb, `users/${userId}/modules/text`);

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
    dispatch(fetchTextSummary());
  }, []);

  const handleGenerateSummary = async (text) => {
    try {
      setIsGeneratingSummary(true);

      const response = await getTextSummary(text);

      if (response.status === 200) {
        const summary = response.data.aiResponse;

        const userId = localStorage.getItem("userId");
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          let userSummaryCount = userDoc.data().summaryCount || 0;

          if (userSummaryCount >= 35) {
            // Display the "Limit Exceeded" modal
            setShowLimitExceededModal(true);
          } else {
            handleTextSummaryData(summary);
            setSummaryCount(userSummaryCount + 1);
            scrollToBottom();
            const newSummaryCount = userSummaryCount + 1;
            updateSummaryCountInFirestore(userId, newSummaryCount);
          }
        } else {
          const initialSummaryCount = 1;
          createNewUserDocument(userId, initialSummaryCount);
          setSummaryCount(initialSummaryCount);
          handleTextSummaryData(summary);
          scrollToBottom();
        }
      } else {
        console.error(`Failed to get article summary: ${response.status}`);
      }
    } catch (error) {
      console.error("Generate Vector Store Error:", error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          marginBottom: "20px",
          marginTop: "30px",
          justifyContent: "center",
        }}
      >
        <TextInput onTextSubmit={handleGenerateSummary} />
        <GenerateReport
          style={{
            padding: "6px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          chatData={chatData}
        />
      </div>
      {isGeneratingSummary ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            {isLoading ? <Loader /> : <Conversation chatData={chatData} />}
          </Col>
        </Row>
      )}
      <LimitMessage
        open={showLimitExceededModal}
        onClose={() => setShowLimitExceededModal(false)}
      />
    </div>
  );
};

export default TextTab;
