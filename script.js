async function generateDecision(command) {
    const apiKey = "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";
    try {
        const generated = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4', // Ensure the model name is correct and available for your API key
                messages: [
                    { role: 'user', content: command }
                ],
                temperature: 0.50
            })
        });

        if (!generated.ok) {
            throw new Error('Failed to fetch response from the API');
        }

        const data = await generated.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error interacting with the API:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const prompt = `You are a decision-making AI designed to assist college students with daily activities, not just school activities but also fun activities, by providing short and direct recommendations. Your purpose is to help users make quick decisions without overthinking.

Your capabilities include understanding natural language queries related to daily tasks and generating concise responses. Your responses should be straightforward, not exceeding one sentence, and tailored to the context of the query.

Example generated decision:
"Take a break." or "Go for a walk" or "Take a nap" only one sentence per generation.

But don’t stick to these examples; I want you to generate your own random decisions.

now recommend me a single decision.`;

    try {
        const button = document.querySelector('.decide-button');
        button.addEventListener('click', async () => {
            const generatedResponse = await generateDecision(prompt);
            let result = document.querySelector('.response');
            result.textContent = generatedResponse ? generatedResponse : "Error generating decision. Please try again.";
        });
    } catch (error) {
        console.log("Error:", error);
    }
});

// Redirects for social media links
let messenger = document.getElementById("messenger");
let github = document.getElementById("github");

messenger.addEventListener('click', () => {
    window.location.href = "https://www.facebook.com/vince.6910";
});

github.addEventListener('click', () => {
    window.location.href = "https://github.com/VinceWarren";
});
