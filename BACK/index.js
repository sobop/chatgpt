const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
var cors = require("cors");
const app = express();

const configuration = new Configuration({
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

// CORS 이슈 해결
// let corsOptions = {
//   origin: "https://www.domain.com",
//   credentials: true,
// };
app.use(cors());

// POST 요청 받을 수 있게 만듬
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// POST method route
app.post("/fortuneTell", async function (req, res) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.",
      },
      {
        role: "user",
        content:
          "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.",
      },
      {
        role: "assistant",
        content:
          "안녕하세요, 저는 챗도지입니다. 무엇을 도와드릴까요? 운세, 사랑, 직업, 건강 등 다양한 분야에 대해 상담 가능합니다. 궁금한 것이 있으시면 언제든지 질문해주세요.",
      },
      { role: "user", content: "오늘의 운세가 뭐야?" },
    ],
  });
  let fortune = completion.data.choices[0].message["content"];
  console.log(fortune);
  res.json({ assistant: fortune });
});

app.listen(3000);
