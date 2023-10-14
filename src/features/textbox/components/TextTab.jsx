import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "antd";

import TextInput from "./TextForm";
import TextSummary from "./TextConversation";
import { getTextSummary } from "../api/textSummaryAPI";
import { handleTextSummaryData } from "../api/textSummaryFirebaseAPI";
import { realtimeDb } from "../../../firebase";
import { ref, onValue, off } from "firebase/database";
import { useDispatch } from "react-redux";
import { fetchTextSummary } from "../../../store/modules/text/textThunks";
import Description from "../../../components/common/data-display/Desciption";
import Loader from "../../../components/common/conversation/Loader";
import Conversation from "../../../components/common/conversation/Conversation";

const TextTab = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [chatData, setChatData] = useState([]);

  const chatRef = useRef(null);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
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
      const response = await getTextSummary(text);
      if (response.status === 200) {
        const summary = response.data.aiResponse;

        console.log("summary", summary);
        handleTextSummaryData(summary);
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
      </div>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={24} lg={24}>
          {/* Conversation component */}
          {isLoading ? <Loader /> : <Conversation chatData={chatData} />}
        </Col>
      </Row>
    </div>
  );
};

export default TextTab;
