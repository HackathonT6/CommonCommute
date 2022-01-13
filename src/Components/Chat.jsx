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
  const { userId, setState, displayToast, currentUser } = appContext;
  const [userMessage, setUserMessage] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState([]);
  const scrollRef = React.useRef(null);
  const mobileScrollRef = React.useRef(null);

  React.useEffect(() => {
    let socket = connectChatServer();

    socket.on("message", (text) => {
      setChatMessages((prev) => [...prev, text]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [chatMessages]);

  React.useEffect(() => {
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [chatMessages]);

  const chatToast = () => {
    setState((prev) => ({ ...prev, toastText: "Chatty Toast" }));
    displayToast();
  };

  const handleMessage = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSend = () => {
    const chatMessage = `${currentUser.firstname}: ${userMessage}`;
    let socket = connectChatServer();
    socket.emit("message", chatMessage);
    setUserMessage("");
  };

  return (
    <>
      <div className="page-wrapper">
        <div>Welcome to the Chat</div>
        <div>Are we logged in? {userId ? "Yes" : "No"}</div>
        <Box
          sx={{
            width: "50%",
            borderRadius: "6px 6px 0 0",
            boxShadow: 3,
            p: 4,
            mt: 4,
            flexDirection: "row",
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            height: 400,
            overflow: "scroll",
          }}
          bgcolor="#fff"
          className="scrollhost"
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
                    bgcolor="#335c67"
                    color="#fff"
                  >
                    <div>{message}</div>
                  </Box>
                );
              })}
              <span ref={scrollRef} />
            </div>
          </Box>
        </Box>

        <Box
          sx={{
            borderRadius: "6px 6px 0 0",
            boxShadow: 3,
            p: 4,
            mt: 4,
            flexDirection: "row",
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            minWidth: "100%",
            height: 400,
            overflow: "scroll",
          }}
          bgcolor="#fff"
          className="scrollhost"
        >
          <Box
            sx={{
              m: 1,
              width: "100%",
              fill: (theme) => theme.palette.common.white,
              stroke: (theme) => theme.palette.divider,
              strokeWidth: 1,
            }}
          >
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
                    bgcolor="#335c67"
                    color="#fff"
                  >
                    <div>{message}</div>
                  </Box>
                );
              })}
              <span ref={mobileScrollRef} />
            </div>
          </Box>
        </Box>

        <Box sx={{ fixed: true, width: { xs: "100%", md: "50%" } }}>
          <TextareaAutosize
            className="form-control border-2 border-dark"
            maxRows={6}
            aria-label="minimum height"
            minRows={2}
            id="input-with-icon-textfield"
            placeholder="Enter your message here to begin chatting!"
            variant="standard"
            sx={{ m: 1 }}
            onChange={handleMessage}
            value={userMessage}
          />
          <Button
            id="appButton"
            variant="contained"
            color="success"
            sx={{ m: 1 }}
            onClick={handleSend}
          >
            Send
          </Button>
        </Box>
        <div onClick={chatToast}>
          Click me to trigger a custom Toast for the Chat
        </div>
      </div>
    </>
  );
};

export default Chat;
