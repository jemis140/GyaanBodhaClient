import ResearchAssistantPopover from "./ResearchAssistantPopover";
const TextArea = ({ item }) => {
  const gradientBorder = {
    background: "linear-gradient(to bottom, #502f73, #95411e)",
    borderRadius: "px", // Adjust as needed
    border: "1px solid ", // Add a transparent border
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between", // Add this to align tools to the right
      }}
    >
      <div
        style={{
          ...gradientBorder,
          background: "#ffffff", // Even lighter purple or grayish
          padding: "8px 12px",
          borderRadius: "8px",
          wordWrap: "break-word",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          marginBottom: "8px", // Add some space between text and buttons
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between", // Align buttons horizontally
        }}
      >
        {item.content}
      </div>
      <div style={{ marginLeft: "5px" }}>
        {item.type === "human" ? <div /> : <ResearchAssistantPopover />}
      </div>
    </div>
  );
};

export default TextArea;
