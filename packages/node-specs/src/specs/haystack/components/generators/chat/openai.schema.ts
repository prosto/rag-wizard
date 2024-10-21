import { schemaId } from "@repo/node-specs/schema";
import type { NodeJsonSchema } from "@repo/node-specs/types";

export const schema: NodeJsonSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: schemaId("/haystack/components/generators/chat/openai"),
  title: "OpenAIChatGenerator",
  description:
    "Completes chats using OpenAI's large language models (LLMs).\n\nIt works with the gpt-4 and gpt-3.5-turbo models and supports streaming responses\nfrom OpenAI API. It uses [ChatMessage](https://docs.haystack.deepset.ai/docs/data-classes#chatmessage)\nformat in input and output.\n\nYou can customize how the text is generated by passing parameters to the\nOpenAI API. Use the `**generation_kwargs` argument when you initialize\nthe component or when you run it. Any parameter that works with\n`openai.ChatCompletion.create` will work here too.\n\nFor details on OpenAI API parameters, see\n[OpenAI documentation](https://platform.openai.com/docs/api-reference/chat).\n\n### Usage example\n\n```python\nfrom haystack.components.generators.chat import OpenAIChatGenerator\nfrom haystack.dataclasses import ChatMessage\n\nmessages = [ChatMessage.from_user(\"What's Natural Language Processing?\")]\n\nclient = OpenAIChatGenerator()\nresponse = client.run(messages)\nprint(response)\n```\nOutput:\n```\n{'replies':\n    [ChatMessage(content='Natural Language Processing (NLP) is a branch of artificial intelligence\n        that focuses on enabling computers to understand, interpret, and generate human language in\n        a way that is meaningful and useful.',\n     role=<ChatRole.ASSISTANT: 'assistant'>, name=None,\n     meta={'model': 'gpt-4o-mini', 'index': 0, 'finish_reason': 'stop',\n     'usage': {'prompt_tokens': 15, 'completion_tokens': 36, 'total_tokens': 51}})\n    ]\n}\n```",
  type: "object",
  __pyType: "OpenAIChatGenerator",
  __pyModule: "haystack.components.generators.chat.openai",
  __nodeType: "component",
  __defaultName: "chat-generator",

  $defs: {
    initParameters: {
      type: "object",
      properties: {
        api_key: {
          $ref: "/haystack/utils/auth/secret",
          description:
            "The OpenAI API key.\nYou can set it with an environment variable `OPENAI_API_KEY`, or pass with this parameter\nduring initialization.",
          default: {
            type: "env_var",
            env_vars: ["OPENAI_API_KEY"],
            strict: true,
          },
        },
        model: {
          type: "string",
          default: "gpt-4o-mini",
          __pyType: "str",
          description: "The name of the model to use.",
        },
        streaming_callback: {
          type: "string",
          default: null,
          __pyType:
            "typing.Optional[typing.Callable[[haystack.dataclasses.streaming_chunk.StreamingChunk], NoneType]]",
          description:
            "A callback function that is called when a new token is received from the stream.\nThe callback function accepts [StreamingChunk](https://docs.haystack.deepset.ai/docs/data-classes#streamingchunk)\nas an argument.",
        },
        api_base_url: {
          type: "string",
          default: null,
          __pyType: "typing.Optional[str]",
          description: "An optional base URL.",
        },
        organization: {
          type: "string",
          default: null,
          __pyType: "typing.Optional[str]",
          description:
            "Your organization ID, defaults to `None`. See\n[production best practices](https://platform.openai.com/docs/guides/production-best-practices/setting-up-your-organization).",
        },
        generation_kwargs: {
          type: "object",
          additionalProperties: true,
          default: null,
          __pyType: "typing.Optional[typing.Dict[str, typing.Any]]",
          description:
            "Other parameters to use for the model. These parameters are sent directly to\nthe OpenAI endpoint. See OpenAI [documentation](https://platform.openai.com/docs/api-reference/chat) for\nmore details.\nSome of the supported parameters:\n- `max_tokens`: The maximum number of tokens the output text can have.\n- `temperature`: What sampling temperature to use. Higher values mean the model will take more risks.\n    Try 0.9 for more creative applications and 0 (argmax sampling) for ones with a well-defined answer.\n- `top_p`: An alternative to sampling with temperature, called nucleus sampling, where the model\n    considers the results of the tokens with top_p probability mass. For example, 0.1 means only the tokens\n    comprising the top 10% probability mass are considered.\n- `n`: How many completions to generate for each prompt. For example, if the LLM gets 3 prompts and n is 2,\n    it will generate two completions for each of the three prompts, ending up with 6 completions in total.\n- `stop`: One or more sequences after which the LLM should stop generating tokens.\n- `presence_penalty`: What penalty to apply if a token is already present at all. Bigger values mean\n    the model will be less likely to repeat the same token in the text.\n- `frequency_penalty`: What penalty to apply if a token has already been generated in the text.\n    Bigger values mean the model will be less likely to repeat the same token in the text.\n- `logit_bias`: Add a logit bias to specific tokens. The keys of the dictionary are tokens, and the\n    values are the bias to add to that token.",
        },
        timeout: {
          type: "number",
          default: null,
          __pyType: "typing.Optional[float]",
          description:
            "Timeout for OpenAI client calls. If not set, it defaults to either the\n`OPENAI_TIMEOUT` environment variable, or 30 seconds.",
        },
        max_retries: {
          type: "integer",
          default: null,
          __pyType: "typing.Optional[int]",
          description:
            "Maximum number of retries to contact OpenAI after an internal error.\nIf not set, it defaults to either the `OPENAI_MAX_RETRIES` environment variable, or set to 5.",
        },
      },
      required: ["api_key", "model"],
      additionalProperties: false,
    },
    inputTypes: {
      type: "object",
      properties: {
        messages: {
          type: "array",
          items: {
            $ref: "/haystack/dataclasses/chat-message",
          },
          __pyType:
            "typing.List[haystack.dataclasses.chat_message.ChatMessage]",
          description:
            "A list of ChatMessage instances representing the input messages.",
        },
        streaming_callback: {
          type: "string",
          default: null,
          __pyType:
            "typing.Optional[typing.Callable[[haystack.dataclasses.streaming_chunk.StreamingChunk], NoneType]]",
          description:
            "A callback function that is called when a new token is received from the stream.",
        },
        generation_kwargs: {
          type: "object",
          additionalProperties: true,
          default: null,
          __pyType: "typing.Optional[typing.Dict[str, typing.Any]]",
          description:
            "Additional keyword arguments for text generation. These parameters will\noverride the parameters passed during component initialization.\nFor details on OpenAI API parameters, see\n[OpenAI documentation](https://platform.openai.com/docs/api-reference/chat/create).",
        },
      },
      required: ["messages"],
      additionalProperties: false,
    },
    outputTypes: {
      type: "object",
      properties: {
        replies: {
          type: "array",
          items: {
            $ref: "/haystack/dataclasses/chat-message",
          },
          __pyType:
            "typing.List[haystack.dataclasses.chat_message.ChatMessage]",
        },
      },
      required: ["replies"],
      additionalProperties: false,
    },
  },
};