/**
 * Sends a message to the Flask backend and retrieves the bot's response.
 * @param {string} message - The user's message.
 * @returns {Promise<string>} The bot's response text.
 */
export async function sendMessageToBot(message) {
  try {
    // IMPORTANT: Replace with your backend URL when deploying.
    // For local development, your Flask app runs on port 10000.
    const response = await fetch('http://127.0.0.1:10000/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'msg': message
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const botResponse = await response.text();
    return botResponse;

  } catch (error) {
    console.error("Error sending message to bot:", error);
    return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }
}
