const express = require("express");
const cors = require("cors");
const { getSubtitles } = require("youtube-captions-scraper");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/youtube-transcript", async (req, res) => {
  console.log("✅ API 요청 들어옴!");

  try {
    const { url } = req.body;
    const videoId = new URL(url).searchParams.get("v");

    console.log("🎯 videoId:", videoId);

    const transcript = await getSubtitles({
      videoID: videoId,
      lang: "en", // 'ko'로 바꾸면 한국어 자막도 가능해
    });

    console.log("📄 받은 자막:", transcript.slice(0, 3)); // 앞부분만 출력
    res.json({ transcript });
  } catch (e) {
    console.error("❌ 에러 발생:", e);
    res.status(500).json({ error: "자막 추출 실패", detail: e.message });
  }
});

app.listen(4000, "0.0.0.0", () => {
  console.log("🚀 서버 시작됨 👉 http://localhost:4000");
});
