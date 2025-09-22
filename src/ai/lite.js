export function coachReply(user, level='B1') {
  const t = user.toLowerCase();

  // Gentle repair: push toward clear explanations
  if (t.includes('job') || t.includes('work'))
    return ask("Interesting. What do you like most about your job?");
  if (t.includes('travel') || t.includes('trip'))
    return ask("Nice! Which city would you like to visit next, and why?");
  if (t.includes('study') || t.includes('learn'))
    return ask("Cool. How do you study English every day?");
  if (t.includes('family'))
    return ask("Thanks for sharing. Who do you spend the most time with?");
  if (t.includes('sport') || t.includes('gym'))
    return ask("Great. How often do you exercise, and what do you do?");
  if (t.includes('food') || t.includes('eat'))
    return ask("Yum! What is your favorite meal, and how do you cook it?");

  const choices = [
    "Got it. Can you give me an example?",
    "I see. What happened next?",
    "Thanks for sharing. How did that make you feel?",
    "Interesting. What’s your plan for next week?",
    "Nice. Could you describe it in more detail?"
  ];
  return ask(choices[Math.floor(Math.random()*choices.length)]);
}

function ask(s) { return s; }