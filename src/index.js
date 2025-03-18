import OpenAI from "openai";

export default {
	async fetch(request, env, ctx) {
        const openai = new OpenAI({
            apiKey: env.OPENAI_API_KEY,
            baseURL: 'https://gateway.ai.cloudflare.com/v1/1719b913db6cbf5b9e3267b924244e58/analyze-juridical-docs/openai'
        })
        
        try {

            var oInput = await request.json();

            var sModel = !!oInput.model ? oInput.model : 'gpt-4o-mini';
            var oMessages = !!oInput.messages ? oInput.messages : oInput;

            const chatCompletion = await openai.chat.completions.create({
                model: sModel,
                messages: oMessages,
                temperature: 0,
                max_tokens: 2048,
                top_p: 1,
                presence_penalty: 0,
                frequency_penalty: 0
            })
/*            
            const response = chatCompletion.choices[0].message.content;
            return new Response(JSON.stringify(response))
  */
            return new Response(JSON.stringify(chatCompletion))
            

            return new Response(JSON.stringify(oInput));
  
        } catch(e) {
            return new Response(e)
        }
	},
};