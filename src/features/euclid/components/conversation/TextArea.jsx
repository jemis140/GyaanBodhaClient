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
        flexDirection: "row",
        alignItems: "start",
        flex: 1,
      }}
    >
      <div
        style={{
          ...gradientBorder,
          background: "#ffffff", // Even lighter purple or grayish
          color: "#111", // Dark grayish text for good contrast
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
      <div
        style={{
          marginLeft: "5px",
          alignItems: "flex-start",
        }}
      >
        {item.type === "human" ? <div /> : <ResearchAssistantPopover />}
      </div>
    </div>
  );
};

export default TextArea;
