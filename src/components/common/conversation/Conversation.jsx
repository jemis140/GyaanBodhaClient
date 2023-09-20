import React from "react";
import { useState, useEffect, useRef } from "react";
import { UpOutlined } from "@ant-design/icons";
import { List, Button } from "antd";
import UserConversation from "../../../components/common/conversation/UserConversation";
import AIConversation from "../../../components/common/conversation/AIConversation";

const Conversation = ({ chatData, responseFlag }) => {
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);

  const chatListRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToTop = window.scrollY === 0;
      setScrollToTopVisible(!isScrolledToTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (responseFlag && chatListRef.current) {
      const chatList = chatListRef.current;
      chatList.scrollTop = chatList.scrollHeight;
    }
  }, [responseFlag]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={chatData}
        style={{
          padding: "16px",
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {chatData.map((item) => (
          <List.Item
            key={item.id}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {item.type === "human" ? (
              <UserConversation item={item} />
            ) : (
              <AIConversation item={item} />
            )}
          </List.Item>
        ))}
      </List>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "20px",
          marginTop: "10px",
        }}
      >
        {scrollToTopVisible && (
          <Button
            style={{
              background: "linear-gradient(to right, #5a0a75, #b25400)",
              borderRadius: "50%",
              width: "40px" /* Set the width and height to make it circular */,
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            type="primary"
            onClick={scrollToTop}
          >
            <UpOutlined />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Conversation;
