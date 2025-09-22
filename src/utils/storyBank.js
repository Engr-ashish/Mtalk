const stories = {
  A2: {
    title: "A Simple Plan",
    text: "Lena wants to speak English better. Every morning, she reads a short story and listens to the audio. She repeats new words out loud. In the evening, she talks for five minutes with an AI coach. She makes mistakes, but she keeps going. After three weeks, she feels more confident. She can answer simple questions without long pauses. She is happy with her progress.",
    vocab: ["repeat","out loud","confident","pause","progress"],
    questions: [
      "What does Lena do every morning?",
      "How long does she talk in the evening?",
      "Does she make mistakes?",
      "How does she feel after three weeks?"
    ]
  },
  B1: {
    title: "The Habit Challenge",
    text: "Maya wanted to improve her English in 90 days. Each morning, she listened to a short podcast while making tea. She repeated new phrases out loud on her walk to work. In the evening, she had a five-minute call with an AI coach. At first, she felt shy and made many mistakes. But she kept a small notebook of phrases and reviewed them on Sundays. After three weeks, she noticed she paused less. By day 60, she could tell short stories smoothly. On day 90, she recorded a five-minute talk about her favorite book and felt proud.",
    vocab: ["improve","repeat","phrase","shy","notice","pause","smoothly","proud"],
    questions: [
      "What did Maya do every morning?",
      "How did she practice speaking during her walk?",
      "When did she review her phrases?",
      "What changed after three weeks?",
      "How did she feel on day 90?"
    ]
  },
  B2: {
    title: "Small Steps, Big Change",
    text: "Arjun designed a simple system for daily English practice. He paired input and output: listen while cooking, then speak for five minutes during a walk. He measured his progress weekly by recording a one-minute summary. At first, his speech was slow and full of fillers. By tracking common mistakes, he built targeted drills. Over time, his rhythm improved and his ideas became clearer. The system was boring but effective.",
    vocab: ["pair","output","summary","fillers","targeted","rhythm","effective"],
    questions: [
      "How did Arjun pair input and output?",
      "How did he measure progress?",
      "What changed over time?",
      "Why was the system effective?"
    ]
  }
};

export function getStoryForLevel(level='B1') {
  return stories[level] || stories.B1;
}