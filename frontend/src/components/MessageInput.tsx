function MessageInput() {
  return (
    <div className="border-t p-4">

      <div className="flex gap-2">

        <input
          className="flex-1 border p-2 rounded"
          placeholder="Send a message..."
        />

        <button
          className="bg-black text-white px-4 rounded"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default MessageInput;