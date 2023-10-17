import React, { useState, useEffect, useRef } from "react";
import { UpOutlined } from "@ant-design/icons";
import { List, Button, Row, Spin, message, Modal } from "antd";
import UserConversation from "./UserConversation";
import AIConversation from "./AIConversation";
import ResearchAssistantPopover from "./ResearchAssistantPopover";
import NotePopover from "./NotePopover"; // Include NotePopover

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

  const handleCopyText = (text) => {
    // Copy the text to the clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Notify the user that the text has been copied
        message.success("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
        // Notify the user about the error
        message.error("Failed to copy text to clipboard");
      });
  };

  const handleTakeNotes = (item) => {
    if (item.type === "bot") {
      Modal.info({
        title: "Take Notes",
        content: (
          <div>
            <p>Write your notes here:</p>
            <NotePopover
              onNoteSubmit={(note) => {
                // Handle note submission and save to Firebase
                addNoteToFirebase(item, note);
              }}
            />
          </div>
        ),
        onOk() {},
      });
    } else {
      message.warning("You can only add notes for AI Conversation items.");
    }
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
              <AIConversation item={item}>
                <div style={{ marginLeft: "5px" }}>
                  <ResearchAssistantPopover
                    onCopyText={() => handleCopyText(item.content)}
                    onTakeNotes={() => handleTakeNotes(item)}
                    onDelete={() => handleDelete()}
                  />
                </div>
              </AIConversation>
            )}
          </List.Item>
        ))}
      </List>
      <div style={{ bottom: "10px", right: "20px", marginTop: "10px" }}>
        <Row style={{ display: "flex", justifyContent: "flex-end" }}>
          {scrollToTopVisible && (
            <Button
              style={{
                background: "linear-gradient(to right, #5a0a75, #b25400)",
                borderRadius: "50%",
                height: "40px",
                alignItems: "center",
                marginTop: "10px",
                marginRight: "10px",
                position: "absolute",
              }}
              type="primary"
              onClick={scrollToTop}
            >
              <UpOutlined />
            </Button>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Conversation;
