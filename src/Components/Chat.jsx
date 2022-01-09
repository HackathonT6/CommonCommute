import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppContext from "../Context/AppContext";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import axios from "axios";
import uuid from "react-uuid";
import { io } from "socket.io-client";

const connectChatServer = () => {
  const socket = io(`ws://localhost:8080`);
  // For testing
  // socket.on("message", (text) => {
  //   console.log(text);
  // });
  return socket;
};

const Chat = () => {
  const appContext = React.useContext(AppContext);
  const { userId, setState, displayToast } = appContext;
  const [userMessage, setUserMessage] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState([]);

  React.useEffect(() => {
    let socket = connectChatServer();

    socket.on("message", (text) => {
      setChatMessages((prev) => [...prev, text]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const chatToast = () => {
    setState((prev) => ({ ...prev, toastText: "Chatty Toast" }));
    displayToast();
  };

  const handleMessage = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSend = () => {
    const chatMessage = `${userId}: ${userMessage}`;
    let socket = connectChatServer();
    socket.emit("message", chatMessage);
  };

  return (
    <>
      <div className="page-wrapper">
        <div>Welcome to the Chat</div>
        <div>Are we logged in? {userId ? "Yes" : "No"}</div>
        <Box
          sx={{
            width: "50%",
            borderRadius: 3,
            boxShadow: 3,
            p: 4,
            m: 4,
            flexDirection: "row",
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
          }}
          bgColor="#fff"
        >
          <Box sx={{ m: 1, width: "100%" }}>
            <div>
              {chatMessages.map((message) => {
                return (
                  <Box
                    key={uuid()}
                    sx={{
                      p: 1,
                      m: 1,
                      borderRadius: 3,
                      boxShadow: 3,
                    }}
                    bgcolor="#6500c3"
                    color="#fff"
                  >
                    <div>{message}</div>
                  </Box>
                );
              })}
            </div>
            <Box sx={{ mt: 5 }}>
              <TextareaAutosize
                className="form-control"
                maxRows={6}
                aria-label="minimum height"
                minRows={1}
                id="input-with-icon-textfield"
                placeholder="Enter your message here to begin chatting!"
                variant="standard"
                sx={{ m: 1, borderRadius: 6 }}
                onChange={handleMessage}
                value={userMessage}
              />
              <Button
                variant="contained"
                color="success"
                sx={{ m: 1 }}
                onClick={handleSend}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            p: 4,
            m: 4,
            flexDirection: "row",
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
          }}
          bgColor="#fff"
        >
          <Box sx={{ m: 1, width: "100%" }}>
            <div>
              {chatMessages.map((message) => {
                return (
                  <Box
                    key={uuid()}
                    sx={{
                      p: 1,
                      m: 1,
                      borderRadius: 3,
                      boxShadow: 3,
                    }}
                  >
                    <div>{message}</div>
                  </Box>
                );
              })}
            </div>
            <Box sx={{ mt: 5 }}>
              <TextareaAutosize
                className="form-control"
                maxRows={6}
                aria-label="minimum height"
                minRows={2}
                id="input-with-icon-textfield"
                placeholder="Enter your message here to begin chatting!"
                variant="standard"
                sx={{ m: 1, borderRadius: 6 }}
                onChange={handleMessage}
                value={userMessage}
              />
              <Button
                variant="contained"
                color="success"
                sx={{ m: 1 }}
                onClick={handleSend}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
        <div onClick={chatToast}>
          Click me to trigger a custom Toast for the Chat
        </div>
      </div>
    </>
  );
};

export default Chat;
