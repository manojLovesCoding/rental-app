function LiveChatButton() {
  const handleChat = () => {
    // Here you would typically open a chat widget or redirect to a live chat service
    alert("Opening live chat...");
  };

  return (
    <button
      onClick={handleChat}
      className="bg-green-600 text-white py-3 px-6 rounded-md"
    >
      Start Live Chat
    </button>
  );
}

export default LiveChatButton;
