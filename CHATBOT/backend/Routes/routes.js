
const { Router } = require("express");
const { RegisterUser, LoginUser } = require("../controller/userController");
const { chatWithConstitution } = require("../controller/ChatController");
const { handleChatRequest } = require('../controller/ChatController');

// const { askQuestion } = require("../controller/chat2controller");


const routes = Router();
// the login and registrations routes

routes.post("/register", RegisterUser);
routes.post("/login", LoginUser);

// the chatbot wenyewe 

routes.post('/chat', handleChatRequest);


// routes.post("/ask", askQuestion);




module.exports = routes;