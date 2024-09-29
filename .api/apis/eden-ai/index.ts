import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'eden-ai/2.0 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**originalityai**|`v1`|0.01 (per 400 char)|400 char
   * |**sapling**|`v1`|5.0 (per 1000000 char)|1000 char
   * |**winstonai**|`v2`|14.0 (per 1000000 char)|1 char
   *
   *
   * </details>
   *
   * <details><summary>Supported Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Chinese**|`zh`|
   * |**Dutch**|`nl`|
   * |**English**|`en`|
   * |**French**|`fr`|
   * |**German**|`de`|
   * |**Spanish**|`es`|
   *
   * </details><details><summary>Supported Detailed Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Auto detection**|`auto-detect`|
   * |**Chinese (China)**|`zh-CN`|
   *
   * </details>
   *
   * @summary AI Content Detection
   * @throws FetchError<400, types.TextAiDetectionCreateResponse400>
   * @throws FetchError<403, types.TextAiDetectionCreateResponse403>
   * @throws FetchError<404, types.TextAiDetectionCreateResponse404>
   * @throws FetchError<500, types.TextAiDetectionCreateResponse500>
   */
  text_ai_detection_create(body: types.TextAiDetectionCreateBodyParam): Promise<FetchResponse<200, types.TextAiDetectionCreateResponse200>> {
    return this.core.fetch('/text/ai_detection', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**emvista**|`v1.0`|3.0 (per 1000000 char)|1 char
   * |**openai**|`v3.0.0`|20.0 (per 1000000 token)|1 token
   * |**amazon**|`boto3 (v1.15.18)`|1.0 (per 1000000 char)|300 char
   * |**microsoft**|`v3.1`|0.25 (per 1000000 char)|1000 char
   * |**privateai**|`v3`|5.0 (per 1000000 char)|100 char
   *
   *
   * </details>
   *
   * <details><summary>Supported Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Afrikaans**|`af`|
   * |**Arabic**|`ar`|
   * |**Bambara**|`bm`|
   * |**Belarusian**|`be`|
   * |**Bengali**|`bn`|
   * |**Bulgarian**|`bg`|
   * |**Burmese**|`my`|
   * |**Catalan**|`ca`|
   * |**Chinese**|`zh`|
   * |**Croatian**|`hr`|
   * |**Czech**|`cs`|
   * |**Danish**|`da`|
   * |**Dutch**|`nl`|
   * |**English**|`en`|
   * |**Estonian**|`et`|
   * |**Finnish**|`fi`|
   * |**French**|`fr`|
   * |**Georgian**|`ka`|
   * |**German**|`de`|
   * |**Hebrew**|`he`|
   * |**Hindi**|`hi`|
   * |**Hungarian**|`hu`|
   * |**Icelandic**|`is`|
   * |**Indonesian**|`id`|
   * |**Italian**|`it`|
   * |**Japanese**|`ja`|
   * |**Khmer**|`km`|
   * |**Korean**|`ko`|
   * |**Latvian**|`lv`|
   * |**Lithuanian**|`lt`|
   * |**Luxembourgish**|`lb`|
   * |**Malay (macrolanguage)**|`ms`|
   * |**Modern Greek (1453-)**|`el`|
   * |**Norwegian**|`no`|
   * |**Norwegian Bokmål**|`nb`|
   * |**Panjabi**|`pa`|
   * |**Persian**|`fa`|
   * |**Polish**|`pl`|
   * |**Portuguese**|`pt`|
   * |**Romanian**|`ro`|
   * |**Russian**|`ru`|
   * |**Slovak**|`sk`|
   * |**Slovenian**|`sl`|
   * |**Spanish**|`es`|
   * |**Swahili (macrolanguage)**|`sw`|
   * |**Swedish**|`sv`|
   * |**Tagalog**|`tl`|
   * |**Tamil**|`ta`|
   * |**Thai**|`th`|
   * |**Turkish**|`tr`|
   * |**Ukrainian**|`uk`|
   * |**Vietnamese**|`vi`|
   *
   * </details><details><summary>Supported Detailed Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Auto detection**|`auto-detect`|
   * |**Chinese (Simplified)**|`zh-Hans`|
   * |**Chinese (Traditional)**|`zh-Hant`|
   * |**Portuguese (Brazil)**|`pt-BR`|
   * |**Portuguese (Portugal)**|`pt-PT`|
   *
   * </details>
   *
   * @summary Anonymization
   * @throws FetchError<400, types.TextAnonymizationCreateResponse400>
   * @throws FetchError<403, types.TextAnonymizationCreateResponse403>
   * @throws FetchError<404, types.TextAnonymizationCreateResponse404>
   * @throws FetchError<500, types.TextAnonymizationCreateResponse500>
   */
  text_anonymization_create(body: types.TextAnonymizationCreateBodyParam): Promise<FetchResponse<200, types.TextAnonymizationCreateResponse200>> {
    return this.core.fetch('/text/anonymization', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Model|Version|Price|Billing unit|
   * |----|----|-------|-----|------------|
   * |**openai**|**gpt-3.5-turbo-1106**|`v1Beta`|2.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-3.5-turbo-16k**|`v1Beta`|4.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-4-turbo-2024-04-09**|`v1Beta`|30.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-4o**|`v1Beta`|15.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-4-1106-preview**|`v1Beta`|30.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-4-vision-preview**|`v1Beta`|30.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-3.5-turbo-0125**|`v1Beta`|1.5 (per 1000000 token)|1 token
   * |**openai**|**gpt-4-32k-0314**|`v1Beta`|120.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-4o-mini**|`v1Beta`|0.6 (per 1000000 token)|1 token
   * |**openai**|-|`v1Beta`|2.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-4-0314**|`v1Beta`|60.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-4**|`v1Beta`|60.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-3.5-turbo**|`v1Beta`|2.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-3.5-turbo-0301**|`v1Beta`|2.0 (per 1000000 token)|1 token
   * |**openai**|**o1-preview**|`v1Beta`|60.0 (per 1000000 token)|1 token
   * |**openai**|**o1-preview-2024-09-12**|`v1Beta`|60.0 (per 1000000 token)|1 token
   * |**google**|**chat-bison**|`v1`|0.5 (per 1000000 char)|1000 char
   * |**google**|**gemini-1.5-flash**|`v1`|2.1 (per 1000000 token)|1 token
   * |**google**|**gemini-1.5-pro**|`v1`|21.0 (per 1000000 token)|1 token
   * |**google**|-|`v1`|2.1 (per 1000000 token)|1 token
   * |**cohere**|-|`2022-12-06`|2.0 (per 1000000 token)|1 token
   * |**cohere**|**command-light**|`2022-12-06`|0.6 (per 1000000 token)|1 token
   * |**cohere**|**command-nightly**|`2022-12-06`|2.0 (per 1000000 token)|1 token
   * |**cohere**|**command**|`2022-12-06`|2.0 (per 1000000 token)|1 token
   * |**cohere**|**command-light-nightly**|`2022-12-06`|0.6 (per 1000000 token)|1 token
   * |**cohere**|**command-r**|`2022-12-06`|1.5 (per 1000000 token)|1 token
   * |**cohere**|**command-r-plus**|`2022-12-06`|15.0 (per 1000000 token)|1 token
   * |**meta**|**llama3-1-405b-instruct-v1:0**|`v1`|160.0 (per 1000000 token)|1 token
   * |**meta**|**llama3-1-70b-instruct-v1:0**|`v1`|3.5 (per 1000000 token)|1 token
   * |**meta**|**llama3-1-8b-instruct-v1:0**|`v1`|0.6 (per 1000000 token)|1 token
   * |**meta**|-|`v1`|2.56 (per 1000000 token)|1 token
   * |**meta**|**llama3-70b-instruct-v1:0**|`v1`|3.5 (per 1000000 token)|1 token
   * |**meta**|**llama3-8b-instruct-v1:0**|`v1`|0.6 (per 1000000 token)|1 token
   * |**mistral**|**small**|`v0.0.1`|6.0 (per 1000000 token)|1 token
   * |**mistral**|**medium**|`v0.0.1`|8.1 (per 1000000 token)|1 token
   * |**mistral**|**tiny**|`v0.0.1`|0.25 (per 1000000 token)|1 token
   * |**mistral**|**large-latest**|`v0.0.1`|24.0 (per 1000000 token)|1 token
   * |**mistral**|-|`v0.0.1`|24.0 (per 1000000 token)|1 token
   * |**perplexityai**|**llama-3.1-sonar-huge-128k-online**|`v1.0`|10.0 (per 1000000 token)|1
   * token
   * |**perplexityai**|-|`v1.0`|1.0 (per 1000000 token)|1 token
   * |**perplexityai**|**llama-3.1-sonar-small-128k-chat**|`v1.0`|0.2 (per 1000000 token)|1
   * token
   * |**perplexityai**|**llama-3.1-sonar-small-128k-online**|`v1.0`|5.2 (per 1000000 token)|1
   * token
   * |**perplexityai**|**llama-3.1-8b-instruct**|`v1.0`|0.2 (per 1000000 token)|1 token
   * |**perplexityai**|**llama-3.1-70b-instruct**|`v1.0`|1.0 (per 1000000 token)|1 token
   * |**perplexityai**|**llama-3.1-sonar-large-128k-chat**|`v1.0`|1.0 (per 1000000 token)|1
   * token
   * |**perplexityai**|**llama-3.1-sonar-large-128k-online**|`v1.0`|6.0 (per 1000000 token)|1
   * token
   * |**anthropic**|-|`bedrock-2023-05-31`|15.0 (per 1000000 token)|1 token
   * |**anthropic**|**claude-3-sonnet-20240229-v1:0**|`bedrock-2023-05-31`|15.0 (per 1000000
   * token)|1 token
   * |**anthropic**|**claude-instant-v1**|`bedrock-2023-05-31`|2.4 (per 1000000 token)|1
   * token
   * |**anthropic**|**claude-v2**|`bedrock-2023-05-31`|24.0 (per 1000000 token)|1 token
   * |**anthropic**|**claude-3-haiku-20240307-v1:0**|`bedrock-2023-05-31`|1.25 (per 1000000
   * token)|1 token
   * |**anthropic**|**claude-3-5-sonnet-20240620-v1:0**|`bedrock-2023-05-31`|15.0 (per
   * 1000000 token)|1 token
   *
   *
   * </details>
   *
   * <details><summary>Supported Detailed Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Auto detection**|`auto-detect`|
   *
   * </details><details><summary>Supported Models</summary><details><summary>openai</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**openai**|`gpt-3.5-turbo`|
   * ||`gpt-3.5-turbo-0125`|
   * ||`gpt-3.5-turbo-0301`|
   * ||`gpt-3.5-turbo-1106`|
   * ||`gpt-3.5-turbo-16k`|
   * ||`gpt-4`|
   * ||`gpt-4-0314`|
   * ||`gpt-4-1106-preview`|
   * ||`gpt-4-32k-0314`|
   * ||`gpt-4-turbo-2024-04-09`|
   * ||`gpt-4-vision-preview`|
   * ||`gpt-4o`|
   * ||`gpt-4o-mini`|
   * ||`o1-preview`|
   * ||`o1-preview-2024-09-12`|
   *
   * </details><details><summary>google</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**google**|`chat-bison`|
   * ||`gemini-1.5-flash`|
   * ||`gemini-1.5-pro`|
   *
   * </details><details><summary>cohere</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**cohere**|`command`|
   * ||`command-light`|
   * ||`command-light-nightly`|
   * ||`command-nightly`|
   * ||`command-r`|
   * ||`command-r-plus`|
   *
   * </details><details><summary>meta</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**meta**|`llama3-1-405b-instruct-v1:0`|
   * ||`llama3-1-70b-instruct-v1:0`|
   * ||`llama3-1-8b-instruct-v1:0`|
   * ||`llama3-70b-instruct-v1:0`|
   * ||`llama3-8b-instruct-v1:0`|
   *
   * </details><details><summary>mistral</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**mistral**|`large-latest`|
   * ||`medium`|
   * ||`small`|
   * ||`tiny`|
   *
   * </details><details><summary>perplexityai</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**perplexityai**|`llama-3.1-70b-instruct`|
   * ||`llama-3.1-8b-instruct`|
   * ||`llama-3.1-sonar-huge-128k-online`|
   * ||`llama-3.1-sonar-large-128k-chat`|
   * ||`llama-3.1-sonar-large-128k-online`|
   * ||`llama-3.1-sonar-small-128k-chat`|
   * ||`llama-3.1-sonar-small-128k-online`|
   *
   * </details><details><summary>anthropic</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**anthropic**|`claude-3-5-sonnet-20240620-v1:0`|
   * ||`claude-3-haiku-20240307-v1:0`|
   * ||`claude-3-sonnet-20240229-v1:0`|
   * ||`claude-instant-v1`|
   * ||`claude-v2`|
   *
   * </details>
   *
   * </details>
   *
   * @summary Chat
   * @throws FetchError<400, types.TextChatCreateResponse400>
   * @throws FetchError<403, types.TextChatCreateResponse403>
   * @throws FetchError<404, types.TextChatCreateResponse404>
   * @throws FetchError<500, types.TextChatCreateResponse500>
   */
  text_chat_create(body: types.TextChatCreateBodyParam): Promise<FetchResponse<200, types.TextChatCreateResponse200>> {
    return this.core.fetch('/text/chat', 'post', body);
  }

  /**
   * Streamed version of Chat feature, the raw text will be streamed chunk by chunk.
   *
   * NOTE: For this feature, you an only request one provider at a time.
   *
   * @summary Chat Stream
   */
  text_chat_stream_create(body: types.TextChatStreamCreateBodyParam): Promise<FetchResponse<200, types.TextChatStreamCreateResponse200>> {
    return this.core.fetch('/text/chat/stream', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**openai**|`v1`|2.0 (per 1000000 token)|1 token
   * |**google**|`v1`|0.5 (per 1000000 char)|1 char
   * |**nlpcloud**|`v1`|25.0 (per 1000 request)|1 request
   *
   *
   * </details>
   *
   * <details><summary>Supported Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Achinese**|`ace`|
   * |**Afrikaans**|`af`|
   * |**Akan**|`ak`|
   * |**Amharic**|`am`|
   * |**Arabic**|`ar`|
   * |**Armenian**|`hy`|
   * |**Assamese**|`as`|
   * |**Asturian**|`ast`|
   * |**Awadhi**|`awa`|
   * |**Ayacucho Quechua**|`quy`|
   * |**Balinese**|`ban`|
   * |**Bambara**|`bm`|
   * |**Banjar**|`bjn`|
   * |**Bashkir**|`ba`|
   * |**Basque**|`eu`|
   * |**Belarusian**|`be`|
   * |**Bemba (Zambia)**|`bem`|
   * |**Bengali**|`bn`|
   * |**Bhojpuri**|`bho`|
   * |**Bosnian**|`bs`|
   * |**Buginese**|`bug`|
   * |**Bulgarian**|`bg`|
   * |**Burmese**|`my`|
   * |**Catalan**|`ca`|
   * |**Cebuano**|`ceb`|
   * |**Central Atlas Tamazight**|`tzm`|
   * |**Central Aymara**|`ayr`|
   * |**Central Kanuri**|`knc`|
   * |**Central Kurdish**|`ckb`|
   * |**Chhattisgarhi**|`hne`|
   * |**Chinese**|`zh`|
   * |**Chokwe**|`cjk`|
   * |**Crimean Tatar**|`crh`|
   * |**Croatian**|`hr`|
   * |**Czech**|`cs`|
   * |**Danish**|`da`|
   * |**Dutch**|`nl`|
   * |**Dyula**|`dyu`|
   * |**Dzongkha**|`dz`|
   * |**Eastern Yiddish**|`ydd`|
   * |**Egyptian Arabic**|`arz`|
   * |**English**|`en`|
   * |**Esperanto**|`eo`|
   * |**Estonian**|`et`|
   * |**Ewe**|`ee`|
   * |**Faroese**|`fo`|
   * |**Fijian**|`fj`|
   * |**Finnish**|`fi`|
   * |**Fon**|`fon`|
   * |**French**|`fr`|
   * |**Friulian**|`fur`|
   * |**Galician**|`gl`|
   * |**Ganda**|`lg`|
   * |**Georgian**|`ka`|
   * |**German**|`de`|
   * |**Guarani**|`gn`|
   * |**Gujarati**|`gu`|
   * |**Haitian**|`ht`|
   * |**Halh Mongolian**|`khk`|
   * |**Hausa**|`ha`|
   * |**Hebrew**|`he`|
   * |**Hindi**|`hi`|
   * |**Hungarian**|`hu`|
   * |**Icelandic**|`is`|
   * |**Igbo**|`ig`|
   * |**Iloko**|`ilo`|
   * |**Indonesian**|`id`|
   * |**Irish**|`ga`|
   * |**Italian**|`it`|
   * |**Japanese**|`ja`|
   * |**Javanese**|`jv`|
   * |**Kabiyè**|`kbp`|
   * |**Kabuverdianu**|`kea`|
   * |**Kabyle**|`kab`|
   * |**Kachin**|`kac`|
   * |**Kamba (Kenya)**|`kam`|
   * |**Kannada**|`kn`|
   * |**Kashmiri**|`ks`|
   * |**Kazakh**|`kk`|
   * |**Khmer**|`km`|
   * |**Kikuyu**|`ki`|
   * |**Kimbundu**|`kmb`|
   * |**Kinyarwanda**|`rw`|
   * |**Kirghiz**|`ky`|
   * |**Kongo**|`kg`|
   * |**Korean**|`ko`|
   * |**Lao**|`lo`|
   * |**Latgalian**|`ltg`|
   * |**Ligurian**|`lij`|
   * |**Limburgan**|`li`|
   * |**Lingala**|`ln`|
   * |**Lithuanian**|`lt`|
   * |**Lombard**|`lmo`|
   * |**Luba-Katanga**|`lu`|
   * |**Luo (Kenya and Tanzania)**|`luo`|
   * |**Lushai**|`lus`|
   * |**Luxembourgish**|`lb`|
   * |**Macedonian**|`mk`|
   * |**Magahi**|`mag`|
   * |**Maithili**|`mai`|
   * |**Malayalam**|`ml`|
   * |**Maltese**|`mt`|
   * |**Manipuri**|`mni`|
   * |**Maori**|`mi`|
   * |**Marathi**|`mr`|
   * |**Mesopotamian Arabic**|`acm`|
   * |**Minangkabau**|`min`|
   * |**Modern Greek (1453-)**|`el`|
   * |**Moroccan Arabic**|`ary`|
   * |**Mossi**|`mos`|
   * |**Najdi Arabic**|`ars`|
   * |**Nepali (macrolanguage)**|`ne`|
   * |**Nigerian Fulfulde**|`fuv`|
   * |**North Azerbaijani**|`azj`|
   * |**North Levantine Arabic**|`apc`|
   * |**Northern Kurdish**|`kmr`|
   * |**Northern Uzbek**|`uzn`|
   * |**Norwegian Bokmål**|`nb`|
   * |**Norwegian Nynorsk**|`nn`|
   * |**Nuer**|`nus`|
   * |**Nyanja**|`ny`|
   * |**Occitan (post 1500)**|`oc`|
   * |**Oriya (macrolanguage)**|`or`|
   * |**Pangasinan**|`pag`|
   * |**Panjabi**|`pa`|
   * |**Papiamento**|`pap`|
   * |**Pedi**|`nso`|
   * |**Persian**|`fa`|
   * |**Plateau Malagasy**|`plt`|
   * |**Polish**|`pl`|
   * |**Portuguese**|`pt`|
   * |**Romanian**|`ro`|
   * |**Rundi**|`rn`|
   * |**Russian**|`ru`|
   * |**Samoan**|`sm`|
   * |**Sango**|`sg`|
   * |**Sanskrit**|`sa`|
   * |**Santali**|`sat`|
   * |**Sardinian**|`sc`|
   * |**Scottish Gaelic**|`gd`|
   * |**Serbian**|`sr`|
   * |**Shan**|`shn`|
   * |**Shona**|`sn`|
   * |**Sicilian**|`scn`|
   * |**Silesian**|`szl`|
   * |**Sindhi**|`sd`|
   * |**Sinhala**|`si`|
   * |**Slovak**|`sk`|
   * |**Slovenian**|`sl`|
   * |**Somali**|`so`|
   * |**South Azerbaijani**|`azb`|
   * |**South Levantine Arabic**|`ajp`|
   * |**Southern Pashto**|`pbt`|
   * |**Southern Sotho**|`st`|
   * |**Southwestern Dinka**|`dik`|
   * |**Spanish**|`es`|
   * |**Standard Latvian**|`lvs`|
   * |**Standard Malay**|`zsm`|
   * |**Sundanese**|`su`|
   * |**Swahili (macrolanguage)**|`sw`|
   * |**Swati**|`ss`|
   * |**Swedish**|`sv`|
   * |**Ta'izzi-Adeni Arabic**|`acq`|
   * |**Tagalog**|`tl`|
   * |**Tajik**|`tg`|
   * |**Tamashek**|`tmh`|
   * |**Tamil**|`ta`|
   * |**Tatar**|`tt`|
   * |**Telugu**|`te`|
   * |**Thai**|`th`|
   * |**Tibetan**|`bo`|
   * |**Tigrinya**|`ti`|
   * |**Tok Pisin**|`tpi`|
   * |**Tosk Albanian**|`als`|
   * |**Tsonga**|`ts`|
   * |**Tswana**|`tn`|
   * |**Tumbuka**|`tum`|
   * |**Tunisian Arabic**|`aeb`|
   * |**Turkish**|`tr`|
   * |**Turkmen**|`tk`|
   * |**Twi**|`tw`|
   * |**Uighur**|`ug`|
   * |**Ukrainian**|`uk`|
   * |**Umbundu**|`umb`|
   * |**Urdu**|`ur`|
   * |**Venetian**|`vec`|
   * |**Vietnamese**|`vi`|
   * |**Waray (Philippines)**|`war`|
   * |**Welsh**|`cy`|
   * |**West Central Oromo**|`gaz`|
   * |**Wolof**|`wo`|
   * |**Xhosa**|`xh`|
   * |**Yoruba**|`yo`|
   * |**Yue Chinese**|`yue`|
   * |**Zulu**|`zu`|
   *
   * </details><details><summary>Supported Detailed Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Arabic (world)**|`ar-001`|
   * |**Chinese (Traditional)**|`zh-Hant`|
   * |**Persian (Afghanistan)**|`fa-AF`|
   *
   * </details>
   *
   * @summary Code Generation
   * @throws FetchError<400, types.TextCodeGenerationCreateResponse400>
   * @throws FetchError<403, types.TextCodeGenerationCreateResponse403>
   * @throws FetchError<404, types.TextCodeGenerationCreateResponse404>
   * @throws FetchError<500, types.TextCodeGenerationCreateResponse500>
   */
  text_code_generation_create(body: types.TextCodeGenerationCreateBodyParam): Promise<FetchResponse<200, types.TextCodeGenerationCreateResponse200>> {
    return this.core.fetch('/text/code_generation', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**cohere**|`2022-12-06`|0.5 (per 1000 request)|1 request
   * |**openai**|`v3.0.0`|20.0 (per 1000000 token)|1 token
   *
   *
   * </details>
   *
   *
   *
   * @summary Custom Text Classification
   * @throws FetchError<400, types.TextCustomClassificationCreateResponse400>
   * @throws FetchError<403, types.TextCustomClassificationCreateResponse403>
   * @throws FetchError<404, types.TextCustomClassificationCreateResponse404>
   * @throws FetchError<500, types.TextCustomClassificationCreateResponse500>
   */
  text_custom_classification_create(body: types.TextCustomClassificationCreateBodyParam): Promise<FetchResponse<200, types.TextCustomClassificationCreateResponse200>> {
    return this.core.fetch('/text/custom_classification', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**openai**|`v3.0.0`|20.0 (per 1000000 token)|1 token
   * |**cohere**|`2022-12-06`|2.0 (per 1000000 token)|1 token
   *
   *
   * </details>
   *
   *
   *
   * @summary Custom Named Entity Recognition
   * @throws FetchError<400, types.TextCustomNamedEntityRecognitionCreateResponse400>
   * @throws FetchError<403, types.TextCustomNamedEntityRecognitionCreateResponse403>
   * @throws FetchError<404, types.TextCustomNamedEntityRecognitionCreateResponse404>
   * @throws FetchError<500, types.TextCustomNamedEntityRecognitionCreateResponse500>
   */
  text_custom_named_entity_recognition_create(body: types.TextCustomNamedEntityRecognitionCreateBodyParam): Promise<FetchResponse<200, types.TextCustomNamedEntityRecognitionCreateResponse200>> {
    return this.core.fetch('/text/custom_named_entity_recognition', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Model|Version|Price|Billing unit|
   * |----|----|-------|-----|------------|
   * |**openai**|**1536__text-embedding-ada-002**|`v3.0.0`|0.1 (per 1000000 token)|1 token
   * |**openai**|-|`v3.0.0`|0.1 (per 1000000 token)|1 token
   * |**google**|-|`v1`|0.1 (per 1000000 char)|1 char
   * |**google**|**768__textembedding-gecko**|`v1`|0.1 (per 1000000 char)|1 char
   * |**cohere**|**1024__embed-english-light-v2.0**|`v1`|0.1 (per 1000000 char)|1 char
   * |**cohere**|-|`v1`|0.1 (per 1000000 char)|1 char
   * |**cohere**|**768__embed-multilingual-v2.0**|`v1`|0.1 (per 1000000 char)|1 char
   * |**cohere**|**4096__embed-english-v2.0**|`v1`|0.1 (per 1000000 char)|1 char
   * |**mistral**|**1024__mistral-embed**|`v0.0.1`|0.1 (per 1000000 token)|1 token
   * |**mistral**|-|`v0.0.1`|0.1 (per 10000001 token)|1 token
   * |**jina**|-|`v1`|0.018 (per 1000000 token)|1 token
   * |**jina**|**jina-embeddings-v2-base-en**|`v1`|0.018 (per 1000000 token)|1 token
   *
   *
   * </details>
   *
   * <details><summary>Supported Models</summary><details><summary>openai</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**openai**|`1536__text-embedding-ada-002`|
   *
   * </details><details><summary>google</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**google**|`768__textembedding-gecko`|
   *
   * </details><details><summary>cohere</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**cohere**|`1024__embed-english-light-v2.0`|
   * ||`4096__embed-english-v2.0`|
   * ||`768__embed-multilingual-v2.0`|
   *
   * </details><details><summary>mistral</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**mistral**|`1024__mistral-embed`|
   *
   * </details><details><summary>jina</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**jina**|`jina-embeddings-v2-base-en`|
   *
   * </details>
   *
   * </details>
   *
   * @summary Embeddings
   * @throws FetchError<400, types.TextEmbeddingsCreateResponse400>
   * @throws FetchError<403, types.TextEmbeddingsCreateResponse403>
   * @throws FetchError<404, types.TextEmbeddingsCreateResponse404>
   * @throws FetchError<500, types.TextEmbeddingsCreateResponse500>
   */
  text_embeddings_create(body: types.TextEmbeddingsCreateBodyParam): Promise<FetchResponse<200, types.TextEmbeddingsCreateResponse200>> {
    return this.core.fetch('/text/embeddings', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**nlpcloud**|`v1`|25.0 (per 1000 request)|1 request
   * |**vernai**|`v1`|2.0 (per 1000 request)|1 request
   *
   *
   * </details>
   *
   *
   *
   * @summary Emotion Detection
   * @throws FetchError<400, types.TextEmotionDetectionCreateResponse400>
   * @throws FetchError<403, types.TextEmotionDetectionCreateResponse403>
   * @throws FetchError<404, types.TextEmotionDetectionCreateResponse404>
   * @throws FetchError<500, types.TextEmotionDetectionCreateResponse500>
   */
  text_emotion_detection_create(body: types.TextEmotionDetectionCreateBodyParam): Promise<FetchResponse<200, types.TextEmotionDetectionCreateResponse200>> {
    return this.core.fetch('/text/emotion_detection', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**amazon**|`boto3 1.26.8`|1.0 (per 1000000 char)|300 char
   * |**google**|`v1`|2.0 (per 1000000 char)|1000 char
   *
   *
   * </details>
   *
   * <details><summary>Supported Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**English**|`en`|
   * |**Japanese**|`ja`|
   * |**Spanish**|`es`|
   *
   * </details>
   *
   * @summary Entity Sentiment
   * @throws FetchError<400, types.TextEntitySentimentCreateResponse400>
   * @throws FetchError<403, types.TextEntitySentimentCreateResponse403>
   * @throws FetchError<404, types.TextEntitySentimentCreateResponse404>
   * @throws FetchError<500, types.TextEntitySentimentCreateResponse500>
   */
  text_entity_sentiment_create(body: types.TextEntitySentimentCreateBodyParam): Promise<FetchResponse<200, types.TextEntitySentimentCreateResponse200>> {
    return this.core.fetch('/text/entity_sentiment', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Model|Version|Price|Billing unit|
   * |----|----|-------|-----|------------|
   * |**cohere**|**command**|`2022-12-06`|2.0 (per 1000000 token)|1 token
   * |**cohere**|**command-light**|`2022-12-06`|0.6 (per 1000000 token)|1 token
   * |**cohere**|**command-nightly**|`2022-12-06`|2.0 (per 1000000 token)|1 token
   * |**cohere**|**command-light-nightly**|`2022-12-06`|0.6 (per 1000000 token)|1 token
   * |**cohere**|-|`2022-12-06`|2.0 (per 1000000 token)|1 token
   * |**openai**|-|`v1`|2.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-3.5-turbo-instruct**|`v1`|2.0 (per 1000000 token)|1 token
   * |**openai**|**text-babbage-002**|`v1`|0.4 (per 1000000 token)|1 token
   * |**openai**|**text-davinci-002**|`v1`|2.0 (per 1000000 token)|1 token
   * |**google**|-|`v1`|0.375 (per 1000000 char)|1000 char
   * |**google**|**gemini-pro**|`v1`|0.375 (per 1000000 char)|1000 char
   * |**google**|**text-bison**|`v1`|0.5 (per 1000000 char)|1000 char
   * |**ai21labs**|-|`v1`|0.0188 (per 1000 token)|1 token
   * |**ai21labs**|**j2-mid**|`v1`|0.0125 (per 1000 token)|1 token
   * |**ai21labs**|**j2-ultra**|`v1`|0.0188 (per 1000 token)|1 token
   * |**anthropic**|**claude-instant-v1**|`bedrock-2023-05-31`|2.4 (per 1000000 token)|1
   * token
   * |**anthropic**|**claude-v1**|`bedrock-2023-05-31`|24.0 (per 1000000 token)|1 token
   * |**anthropic**|**claude-v2**|`bedrock-2023-05-31`|24.0 (per 1000000 token)|1 token
   * |**anthropic**|-|`bedrock-2023-05-31`|24.0 (per 1000000 token)|1 token
   * |**mistral**|-|`v0.0.1`|24.0 (per 1000000 token)|1 token
   * |**mistral**|**medium**|`v0.0.1`|8.1 (per 1000000 token)|1 token
   * |**mistral**|**tiny**|`v0.0.1`|0.42 (per 1000000 token)|1 token
   * |**mistral**|**large-latest**|`v0.0.1`|24.0 (per 1000000 token)|1 token
   * |**mistral**|**small**|`v0.0.1`|6.0 (per 1000000 token)|1 token
   * |**amazon**|-|`v1`|1.6 (per 1000000 token)|1 token
   * |**amazon**|**titan-text-express-v1**|`v1`|1.6 (per 1000000 token)|1 token
   * |**amazon**|**titan-text-lite-v1**|`v1`|0.4 (per 1000000 token)|1 token
   * |**amazon**|**titan-tg1-large**|`v1`|1.6 (per 1000000 token)|1 token
   * |**meta**|**llama2-13b-chat-v1**|`v1`|1.0 (per 1000000 token)|1 token
   * |**meta**|**llama2-70b-chat-v1**|`v1`|2.56 (per 1000000 token)|1 token
   * |**meta**|-|`v1`|2.56 (per 1000000 token)|1 token
   * |**meta**|**llama3-8b-instruct-v1:0**|`v1`|0.6 (per 1000000 token)|1 token
   * |**meta**|**llama3-70b-instruct-v1:0**|`v1`|3.5 (per 1000000 token)|1 token
   *
   *
   * </details>
   *
   * <details><summary>Supported Models</summary><details><summary>cohere</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**cohere**|`command`|
   * ||`command-light`|
   * ||`command-light-nightly`|
   * ||`command-nightly`|
   *
   * </details><details><summary>openai</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**openai**|`gpt-3.5-turbo-instruct`|
   * ||`text-babbage-002`|
   * ||`text-davinci-002`|
   *
   * </details><details><summary>google</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**google**|`gemini-pro`|
   * ||`text-bison`|
   *
   * </details><details><summary>ai21labs</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**ai21labs**|`j2-mid`|
   * ||`j2-ultra`|
   *
   * </details><details><summary>anthropic</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**anthropic**|`claude-instant-v1`|
   * ||`claude-v1`|
   * ||`claude-v2`|
   *
   * </details><details><summary>mistral</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**mistral**|`large-latest`|
   * ||`medium`|
   * ||`small`|
   * ||`tiny`|
   *
   * </details><details><summary>amazon</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**amazon**|`titan-text-express-v1`|
   * ||`titan-text-lite-v1`|
   * ||`titan-tg1-large`|
   *
   * </details><details><summary>meta</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**meta**|`llama2-13b-chat-v1`|
   * ||`llama2-70b-chat-v1`|
   * ||`llama3-70b-instruct-v1:0`|
   * ||`llama3-8b-instruct-v1:0`|
   *
   * </details>
   *
   * </details>
   *
   * @summary Generation
   * @throws FetchError<400, types.TextGenerationCreateResponse400>
   * @throws FetchError<403, types.TextGenerationCreateResponse403>
   * @throws FetchError<404, types.TextGenerationCreateResponse404>
   * @throws FetchError<500, types.TextGenerationCreateResponse500>
   */
  text_generation_create(body: types.TextGenerationCreateBodyParam): Promise<FetchResponse<200, types.TextGenerationCreateResponse200>> {
    return this.core.fetch('/text/generation', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**amazon**|`boto3 (v1.15.18)`|1.0 (per 1000000 char)|300 char
   * |**ibm**|`v1 (2021-08-01)`|0.3 (per 1000000 char)|10000 char
   * |**microsoft**|`v3.1`|1.0 (per 1000000 char)|1000 char
   * |**emvista**|`v1.0`|1.0 (per 1000000 char)|1000 char
   * |**openai**|`v3.0.0`|20.0 (per 1000000 token)|1 token
   * |**tenstorrent**|`v1.0.0`|0.7 (per 1000000 char)|1000 char
   * |**nlpcloud**|`v1`|25.0 (per 1000 request)|1 request
   * |**corticalio**|`v1.3.0`|0.97 (per 1000 request)|1 request
   *
   *
   * </details>
   *
   * <details><summary>Supported Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Achinese**|`ace`|
   * |**Afrikaans**|`af`|
   * |**Akan**|`ak`|
   * |**Amharic**|`am`|
   * |**Arabic**|`ar`|
   * |**Armenian**|`hy`|
   * |**Assamese**|`as`|
   * |**Asturian**|`ast`|
   * |**Awadhi**|`awa`|
   * |**Ayacucho Quechua**|`quy`|
   * |**Balinese**|`ban`|
   * |**Bambara**|`bm`|
   * |**Banjar**|`bjn`|
   * |**Bashkir**|`ba`|
   * |**Basque**|`eu`|
   * |**Belarusian**|`be`|
   * |**Bemba (Zambia)**|`bem`|
   * |**Bengali**|`bn`|
   * |**Bhojpuri**|`bho`|
   * |**Bosnian**|`bs`|
   * |**Buginese**|`bug`|
   * |**Bulgarian**|`bg`|
   * |**Burmese**|`my`|
   * |**Catalan**|`ca`|
   * |**Cebuano**|`ceb`|
   * |**Central Atlas Tamazight**|`tzm`|
   * |**Central Aymara**|`ayr`|
   * |**Central Kanuri**|`knc`|
   * |**Central Kurdish**|`ckb`|
   * |**Chhattisgarhi**|`hne`|
   * |**Chinese**|`zh`|
   * |**Chokwe**|`cjk`|
   * |**Crimean Tatar**|`crh`|
   * |**Croatian**|`hr`|
   * |**Czech**|`cs`|
   * |**Danish**|`da`|
   * |**Dutch**|`nl`|
   * |**Dyula**|`dyu`|
   * |**Dzongkha**|`dz`|
   * |**Eastern Yiddish**|`ydd`|
   * |**Egyptian Arabic**|`arz`|
   * |**English**|`en`|
   * |**Esperanto**|`eo`|
   * |**Estonian**|`et`|
   * |**Ewe**|`ee`|
   * |**Faroese**|`fo`|
   * |**Fijian**|`fj`|
   * |**Finnish**|`fi`|
   * |**Fon**|`fon`|
   * |**French**|`fr`|
   * |**Friulian**|`fur`|
   * |**Galician**|`gl`|
   * |**Ganda**|`lg`|
   * |**Georgian**|`ka`|
   * |**German**|`de`|
   * |**Guarani**|`gn`|
   * |**Gujarati**|`gu`|
   * |**Haitian**|`ht`|
   * |**Halh Mongolian**|`khk`|
   * |**Hausa**|`ha`|
   * |**Hebrew**|`he`|
   * |**Hindi**|`hi`|
   * |**Hungarian**|`hu`|
   * |**Icelandic**|`is`|
   * |**Igbo**|`ig`|
   * |**Iloko**|`ilo`|
   * |**Indonesian**|`id`|
   * |**Irish**|`ga`|
   * |**Italian**|`it`|
   * |**Japanese**|`ja`|
   * |**Javanese**|`jv`|
   * |**Kabiyè**|`kbp`|
   * |**Kabuverdianu**|`kea`|
   * |**Kabyle**|`kab`|
   * |**Kachin**|`kac`|
   * |**Kamba (Kenya)**|`kam`|
   * |**Kannada**|`kn`|
   * |**Kashmiri**|`ks`|
   * |**Kazakh**|`kk`|
   * |**Khmer**|`km`|
   * |**Kikuyu**|`ki`|
   * |**Kimbundu**|`kmb`|
   * |**Kinyarwanda**|`rw`|
   * |**Kirghiz**|`ky`|
   * |**Kongo**|`kg`|
   * |**Korean**|`ko`|
   * |**Lao**|`lo`|
   * |**Latgalian**|`ltg`|
   * |**Latvian**|`lv`|
   * |**Ligurian**|`lij`|
   * |**Limburgan**|`li`|
   * |**Lingala**|`ln`|
   * |**Lithuanian**|`lt`|
   * |**Lombard**|`lmo`|
   * |**Luba-Katanga**|`lu`|
   * |**Luo (Kenya and Tanzania)**|`luo`|
   * |**Lushai**|`lus`|
   * |**Luxembourgish**|`lb`|
   * |**Macedonian**|`mk`|
   * |**Magahi**|`mag`|
   * |**Maithili**|`mai`|
   * |**Malayalam**|`ml`|
   * |**Maltese**|`mt`|
   * |**Manipuri**|`mni`|
   * |**Maori**|`mi`|
   * |**Marathi**|`mr`|
   * |**Mesopotamian Arabic**|`acm`|
   * |**Minangkabau**|`min`|
   * |**Modern Greek (1453-)**|`el`|
   * |**Moroccan Arabic**|`ary`|
   * |**Mossi**|`mos`|
   * |**Najdi Arabic**|`ars`|
   * |**Nepali (macrolanguage)**|`ne`|
   * |**Nigerian Fulfulde**|`fuv`|
   * |**North Azerbaijani**|`azj`|
   * |**North Levantine Arabic**|`apc`|
   * |**Northern Kurdish**|`kmr`|
   * |**Northern Uzbek**|`uzn`|
   * |**Norwegian**|`no`|
   * |**Norwegian Bokmål**|`nb`|
   * |**Norwegian Nynorsk**|`nn`|
   * |**Nuer**|`nus`|
   * |**Nyanja**|`ny`|
   * |**Occitan (post 1500)**|`oc`|
   * |**Oriya (macrolanguage)**|`or`|
   * |**Pangasinan**|`pag`|
   * |**Panjabi**|`pa`|
   * |**Papiamento**|`pap`|
   * |**Pedi**|`nso`|
   * |**Persian**|`fa`|
   * |**Plateau Malagasy**|`plt`|
   * |**Polish**|`pl`|
   * |**Portuguese**|`pt`|
   * |**Romanian**|`ro`|
   * |**Rundi**|`rn`|
   * |**Russian**|`ru`|
   * |**Samoan**|`sm`|
   * |**Sango**|`sg`|
   * |**Sanskrit**|`sa`|
   * |**Santali**|`sat`|
   * |**Sardinian**|`sc`|
   * |**Scottish Gaelic**|`gd`|
   * |**Serbian**|`sr`|
   * |**Shan**|`shn`|
   * |**Shona**|`sn`|
   * |**Sicilian**|`scn`|
   * |**Silesian**|`szl`|
   * |**Sindhi**|`sd`|
   * |**Sinhala**|`si`|
   * |**Slovak**|`sk`|
   * |**Slovenian**|`sl`|
   * |**Somali**|`so`|
   * |**South Azerbaijani**|`azb`|
   * |**South Levantine Arabic**|`ajp`|
   * |**Southern Pashto**|`pbt`|
   * |**Southern Sotho**|`st`|
   * |**Southwestern Dinka**|`dik`|
   * |**Spanish**|`es`|
   * |**Standard Latvian**|`lvs`|
   * |**Standard Malay**|`zsm`|
   * |**Sundanese**|`su`|
   * |**Swahili (macrolanguage)**|`sw`|
   * |**Swati**|`ss`|
   * |**Swedish**|`sv`|
   * |**Ta'izzi-Adeni Arabic**|`acq`|
   * |**Tagalog**|`tl`|
   * |**Tajik**|`tg`|
   * |**Tamashek**|`tmh`|
   * |**Tamil**|`ta`|
   * |**Tatar**|`tt`|
   * |**Telugu**|`te`|
   * |**Thai**|`th`|
   * |**Tibetan**|`bo`|
   * |**Tigrinya**|`ti`|
   * |**Tok Pisin**|`tpi`|
   * |**Tosk Albanian**|`als`|
   * |**Tsonga**|`ts`|
   * |**Tswana**|`tn`|
   * |**Tumbuka**|`tum`|
   * |**Tunisian Arabic**|`aeb`|
   * |**Turkish**|`tr`|
   * |**Turkmen**|`tk`|
   * |**Twi**|`tw`|
   * |**Uighur**|`ug`|
   * |**Ukrainian**|`uk`|
   * |**Umbundu**|`umb`|
   * |**Urdu**|`ur`|
   * |**Venetian**|`vec`|
   * |**Vietnamese**|`vi`|
   * |**Waray (Philippines)**|`war`|
   * |**Welsh**|`cy`|
   * |**West Central Oromo**|`gaz`|
   * |**Wolof**|`wo`|
   * |**Xhosa**|`xh`|
   * |**Yoruba**|`yo`|
   * |**Yue Chinese**|`yue`|
   * |**Zulu**|`zu`|
   *
   * </details><details><summary>Supported Detailed Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Auto detection**|`auto-detect`|
   * |**Arabic (world)**|`ar-001`|
   * |**Chinese (Simplified)**|`zh-Hans`|
   * |**Chinese (Taiwan)**|`zh-TW`|
   * |**Chinese (Traditional)**|`zh-Hant`|
   * |**Persian (Afghanistan)**|`fa-AF`|
   * |**Portuguese (Brazil)**|`pt-BR`|
   * |**Portuguese (Portugal)**|`pt-PT`|
   *
   * </details>
   *
   * @summary Keyword Extraction
   * @throws FetchError<400, types.TextKeywordExtractionCreateResponse400>
   * @throws FetchError<403, types.TextKeywordExtractionCreateResponse403>
   * @throws FetchError<404, types.TextKeywordExtractionCreateResponse404>
   * @throws FetchError<500, types.TextKeywordExtractionCreateResponse500>
   */
  text_keyword_extraction_create(body: types.TextKeywordExtractionCreateBodyParam): Promise<FetchResponse<200, types.TextKeywordExtractionCreateResponse200>> {
    return this.core.fetch('/text/keyword_extraction', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**microsoft**|`v1.0`|1.0 (per 1000 request)|1 request
   * |**openai**|`v3.0.0`|free|-
   * |**clarifai**|`8.0.0`|1.2 (per 1000 request)|1 request
   * |**google**|`v1`|5.0 (per 1000000 char)|100 char
   *
   *
   * </details>
   *
   * <details><summary>Supported Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Afrikaans**|`af`|
   * |**Albanian**|`sq`|
   * |**Amharic**|`am`|
   * |**Arabic**|`ar`|
   * |**Aragonese**|`an`|
   * |**Armenian**|`hy`|
   * |**Assamese**|`as`|
   * |**Asturian**|`ast`|
   * |**Azerbaijani**|`az`|
   * |**Bashkir**|`ba`|
   * |**Basque**|`eu`|
   * |**Bavarian**|`bar`|
   * |**Belarusian**|`be`|
   * |**Bengali**|`bn`|
   * |**Bishnupriya**|`bpy`|
   * |**Bosnian**|`bs`|
   * |**Breton**|`br`|
   * |**Bulgarian**|`bg`|
   * |**Burmese**|`my`|
   * |**Catalan**|`ca`|
   * |**Cebuano**|`ceb`|
   * |**Central Kurdish**|`ckb`|
   * |**Chechen**|`ce`|
   * |**Cherokee**|`chr`|
   * |**Chinese**|`zh`|
   * |**Chuvash**|`cv`|
   * |**Croatian**|`hr`|
   * |**Czech**|`cs`|
   * |**Danish**|`da`|
   * |**Dutch**|`nl`|
   * |**English**|`en`|
   * |**Estonian**|`et`|
   * |**Filipino**|`fil`|
   * |**Finnish**|`fi`|
   * |**French**|`fr`|
   * |**Fulah**|`ff`|
   * |**Galician**|`gl`|
   * |**Georgian**|`ka`|
   * |**German**|`de`|
   * |**Gujarati**|`gu`|
   * |**Haitian**|`ht`|
   * |**Hausa**|`ha`|
   * |**Hebrew**|`he`|
   * |**Hindi**|`hi`|
   * |**Hungarian**|`hu`|
   * |**Icelandic**|`is`|
   * |**Ido**|`io`|
   * |**Igbo**|`ig`|
   * |**Indonesian**|`id`|
   * |**Inuktitut**|`iu`|
   * |**Irish**|`ga`|
   * |**Italian**|`it`|
   * |**Japanese**|`ja`|
   * |**Javanese**|`jv`|
   * |**Kannada**|`kn`|
   * |**Kazakh**|`kk`|
   * |**Khmer**|`km`|
   * |**Kinyarwanda**|`rw`|
   * |**Kirghiz**|`ky`|
   * |**Konkani (macrolanguage)**|`kok`|
   * |**Korean**|`ko`|
   * |**Lahnda**|`lah`|
   * |**Lao**|`lo`|
   * |**Latin**|`la`|
   * |**Latvian**|`lv`|
   * |**Lithuanian**|`lt`|
   * |**Lombard**|`lmo`|
   * |**Low German**|`nds`|
   * |**Luxembourgish**|`lb`|
   * |**Macedonian**|`mk`|
   * |**Malagasy**|`mg`|
   * |**Malay (macrolanguage)**|`ms`|
   * |**Malayalam**|`ml`|
   * |**Maltese**|`mt`|
   * |**Maori**|`mi`|
   * |**Marathi**|`mr`|
   * |**Minangkabau**|`min`|
   * |**Modern Greek (1453-)**|`el`|
   * |**Mongolian**|`mn`|
   * |**Nepali (macrolanguage)**|`ne`|
   * |**Norwegian**|`no`|
   * |**Norwegian Bokmål**|`nb`|
   * |**Norwegian Nynorsk**|`nn`|
   * |**Occitan (post 1500)**|`oc`|
   * |**Oriya (macrolanguage)**|`or`|
   * |**Panjabi**|`pa`|
   * |**Pedi**|`nso`|
   * |**Persian**|`fa`|
   * |**Piemontese**|`pms`|
   * |**Polish**|`pl`|
   * |**Portuguese**|`pt`|
   * |**Pushto**|`ps`|
   * |**Quechua**|`qu`|
   * |**Romanian**|`ro`|
   * |**Russian**|`ru`|
   * |**Scots**|`sco`|
   * |**Scottish Gaelic**|`gd`|
   * |**Serbian**|`sr`|
   * |**Serbo-Croatian**|`sh`|
   * |**Sicilian**|`scn`|
   * |**Sindhi**|`sd`|
   * |**Sinhala**|`si`|
   * |**Slovak**|`sk`|
   * |**Slovenian**|`sl`|
   * |**South Azerbaijani**|`azb`|
   * |**Southern Sotho**|`st`|
   * |**Spanish**|`es`|
   * |**Sundanese**|`su`|
   * |**Swahili (macrolanguage)**|`sw`|
   * |**Swedish**|`sv`|
   * |**Tagalog**|`tl`|
   * |**Tajik**|`tg`|
   * |**Tamil**|`ta`|
   * |**Tatar**|`tt`|
   * |**Telugu**|`te`|
   * |**Thai**|`th`|
   * |**Tigrinya**|`ti`|
   * |**Tswana**|`tn`|
   * |**Turkish**|`tr`|
   * |**Turkmen**|`tk`|
   * |**Uighur**|`ug`|
   * |**Ukrainian**|`uk`|
   * |**Urdu**|`ur`|
   * |**Uzbek**|`uz`|
   * |**Vietnamese**|`vi`|
   * |**Volapük**|`vo`|
   * |**Waray (Philippines)**|`war`|
   * |**Welsh**|`cy`|
   * |**Western Frisian**|`fy`|
   * |**Wolof**|`wo`|
   * |**Xhosa**|`xh`|
   * |**Yoruba**|`yo`|
   * |**Zulu**|`zu`|
   *
   * </details><details><summary>Supported Detailed Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Auto detection**|`auto-detect`|
   * |**Chinese (Traditional)**|`zh-Hant`|
   * |**Low German (Netherlands)**|`nds-NL`|
   *
   * </details>
   *
   * @summary Moderation
   * @throws FetchError<400, types.TextModerationCreateResponse400>
   * @throws FetchError<403, types.TextModerationCreateResponse403>
   * @throws FetchError<404, types.TextModerationCreateResponse404>
   * @throws FetchError<500, types.TextModerationCreateResponse500>
   */
  text_moderation_create(body: types.TextModerationCreateBodyParam): Promise<FetchResponse<200, types.TextModerationCreateResponse200>> {
    return this.core.fetch('/text/moderation', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**amazon**|`boto3 (v1.15.18)`|1.0 (per 1000000 char)|300 char
   * |**google**|`v1`|1.0 (per 1000000 char)|1000 char
   * |**ibm**|`v1 (2021-08-01)`|0.3 (per 1000000 char)|10000 char
   * |**lettria**|`v5.5.2`|2.0 (per 1000000 char)|1000 char
   * |**microsoft**|`v3.1`|1.0 (per 1000000 char)|1000 char
   * |**neuralspace**|`v1`|0.007 (per 1 request)|1 request
   * |**openai**|`v3.0.0`|20.0 (per 1000000 token)|1 token
   * |**tenstorrent**|`v1.0.0`|1.0 (per 1000000 char)|1000 char
   * |**nlpcloud**|`v1`|25.0 (per 1000 request)|1 request
   *
   *
   * </details>
   *
   * <details><summary>Supported Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Afrikaans**|`af`|
   * |**Albanian**|`sq`|
   * |**Arabic**|`ar`|
   * |**Aragonese**|`an`|
   * |**Armenian**|`hy`|
   * |**Assamese**|`as`|
   * |**Azerbaijani**|`az`|
   * |**Bashkir**|`ba`|
   * |**Basque**|`eu`|
   * |**Belarusian**|`be`|
   * |**Bengali**|`bn`|
   * |**Bosnian**|`bs`|
   * |**Breton**|`br`|
   * |**Bulgarian**|`bg`|
   * |**Burmese**|`my`|
   * |**Catalan**|`ca`|
   * |**Chechen**|`ce`|
   * |**Chinese**|`zh`|
   * |**Chuvash**|`cv`|
   * |**Croatian**|`hr`|
   * |**Czech**|`cs`|
   * |**Danish**|`da`|
   * |**Dutch**|`nl`|
   * |**English**|`en`|
   * |**Estonian**|`et`|
   * |**Finnish**|`fi`|
   * |**French**|`fr`|
   * |**Galician**|`gl`|
   * |**Georgian**|`ka`|
   * |**German**|`de`|
   * |**Gujarati**|`gu`|
   * |**Haitian**|`ht`|
   * |**Hebrew**|`he`|
   * |**Hindi**|`hi`|
   * |**Hungarian**|`hu`|
   * |**Icelandic**|`is`|
   * |**Indonesian**|`id`|
   * |**Irish**|`ga`|
   * |**Italian**|`it`|
   * |**Japanese**|`ja`|
   * |**Javanese**|`jv`|
   * |**Kannada**|`kn`|
   * |**Kazakh**|`kk`|
   * |**Kirghiz**|`ky`|
   * |**Korean**|`ko`|
   * |**Latin**|`la`|
   * |**Latvian**|`lv`|
   * |**Lithuanian**|`lt`|
   * |**Luxembourgish**|`lb`|
   * |**Macedonian**|`mk`|
   * |**Malagasy**|`mg`|
   * |**Malay (macrolanguage)**|`ms`|
   * |**Malayalam**|`ml`|
   * |**Maltese**|`mt`|
   * |**Marathi**|`mr`|
   * |**Modern Greek (1453-)**|`el`|
   * |**Nepali (macrolanguage)**|`ne`|
   * |**Norwegian**|`no`|
   * |**Norwegian Bokmål**|`nb`|
   * |**Occitan (post 1500)**|`oc`|
   * |**Panjabi**|`pa`|
   * |**Persian**|`fa`|
   * |**Polish**|`pl`|
   * |**Portuguese**|`pt`|
   * |**Romanian**|`ro`|
   * |**Russian**|`ru`|
   * |**Serbian**|`sr`|
   * |**Slovak**|`sk`|
   * |**Slovenian**|`sl`|
   * |**Spanish**|`es`|
   * |**Sundanese**|`su`|
   * |**Swahili (macrolanguage)**|`sw`|
   * |**Swedish**|`sv`|
   * |**Tagalog**|`tl`|
   * |**Tajik**|`tg`|
   * |**Tamil**|`ta`|
   * |**Tatar**|`tt`|
   * |**Telugu**|`te`|
   * |**Turkish**|`tr`|
   * |**Uighur**|`ug`|
   * |**Ukrainian**|`uk`|
   * |**Urdu**|`ur`|
   * |**Uzbek**|`uz`|
   * |**Vietnamese**|`vi`|
   * |**Welsh**|`cy`|
   * |**Yoruba**|`yo`|
   *
   * </details><details><summary>Supported Detailed Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Auto detection**|`auto-detect`|
   * |**Chinese (Simplified)**|`zh-Hans`|
   * |**Chinese (Taiwan)**|`zh-TW`|
   * |**Chinese (Traditional)**|`zh-Hant`|
   * |**English (United States)**|`en-US`|
   * |**French (France)**|`fr-FR`|
   * |**Portuguese (Brazil)**|`pt-BR`|
   * |**Portuguese (Portugal)**|`pt-PT`|
   *
   * </details>
   *
   * @summary Named Entity Recognition
   * @throws FetchError<400, types.TextNamedEntityRecognitionCreateResponse400>
   * @throws FetchError<403, types.TextNamedEntityRecognitionCreateResponse403>
   * @throws FetchError<404, types.TextNamedEntityRecognitionCreateResponse404>
   * @throws FetchError<500, types.TextNamedEntityRecognitionCreateResponse500>
   */
  text_named_entity_recognition_create(body: types.TextNamedEntityRecognitionCreateBodyParam): Promise<FetchResponse<200, types.TextNamedEntityRecognitionCreateResponse200>> {
    return this.core.fetch('/text/named_entity_recognition', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**originalityai**|`v1`|0.01 (per 400 char)|400 char
   * |**winstonai**|`v2`|14.0 (per 1000000 char)|1 char
   *
   *
   * </details>
   *
   *
   *
   * @summary Plagia Detection
   * @throws FetchError<400, types.TextPlagiaDetectionCreateResponse400>
   * @throws FetchError<403, types.TextPlagiaDetectionCreateResponse403>
   * @throws FetchError<404, types.TextPlagiaDetectionCreateResponse404>
   * @throws FetchError<500, types.TextPlagiaDetectionCreateResponse500>
   */
  text_plagia_detection_create(body: types.TextPlagiaDetectionCreateBodyParam): Promise<FetchResponse<200, types.TextPlagiaDetectionCreateResponse200>> {
    return this.core.fetch('/text/plagia_detection', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**openai**|`v3.0.0`|0.08 (per 1 request)|1 request
   *
   *
   * </details>
   *
   *
   *
   * @summary Prompt Optimization
   * @throws FetchError<400, types.TextPromptOptimizationCreateResponse400>
   * @throws FetchError<403, types.TextPromptOptimizationCreateResponse403>
   * @throws FetchError<404, types.TextPromptOptimizationCreateResponse404>
   * @throws FetchError<500, types.TextPromptOptimizationCreateResponse500>
   */
  text_prompt_optimization_create(body: types.TextPromptOptimizationCreateBodyParam): Promise<FetchResponse<200, types.TextPromptOptimizationCreateResponse200>> {
    return this.core.fetch('/text/prompt_optimization', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**openai**|`v3.0.0`|20.0 (per 1000000 token)|1 token
   * |**tenstorrent**|`v1.0.0`|10.0 (per 1000000 char)|1000 char
   *
   *
   * </details>
   *
   *
   *
   * @summary Question Answer
   * @throws FetchError<400, types.TextQuestionAnswerCreateResponse400>
   * @throws FetchError<403, types.TextQuestionAnswerCreateResponse403>
   * @throws FetchError<404, types.TextQuestionAnswerCreateResponse404>
   * @throws FetchError<500, types.TextQuestionAnswerCreateResponse500>
   */
  text_question_answer_create(body: types.TextQuestionAnswerCreateBodyParam): Promise<FetchResponse<200, types.TextQuestionAnswerCreateResponse200>> {
    return this.core.fetch('/text/question_answer', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**openai**|`v3.0.0`|20.0 (per 1000000 token)|1 token
   * |**cohere**|`v1`|0.1 (per 1000000 char)|1 char
   * |**google**|`v1`|0.1 (per 1000000 char)|1 char
   *
   *
   * </details>
   *
   *
   *
   * @summary Search
   * @throws FetchError<400, types.TextSearchCreateResponse400>
   * @throws FetchError<403, types.TextSearchCreateResponse403>
   * @throws FetchError<404, types.TextSearchCreateResponse404>
   * @throws FetchError<500, types.TextSearchCreateResponse500>
   */
  text_search_create(body: types.TextSearchCreateBodyParam): Promise<FetchResponse<200, types.TextSearchCreateResponse200>> {
    return this.core.fetch('/text/search', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**amazon**|`boto3 (v1.15.18)`|1.0 (per 1000000 char)|300 char
   * |**connexun**|`v1.0`|2.0 (per 1000 request)|1 request
   * |**google**|`v1`|1.0 (per 1000000 char)|1000 char
   * |**ibm**|`v1 (2021-08-01)`|0.3 (per 1000000 char)|10000 char
   * |**lettria**|`v5.5.2`|2.0 (per 1000000 char)|1000 char
   * |**microsoft**|`v3.1`|1.0 (per 1000000 char)|1000 char
   * |**emvista**|`v1.0`|3.0 (per 1000000 char)|1000 char
   * |**openai**|`v3.0.0`|20.0 (per 1000000 token)|1 token
   * |**tenstorrent**|`v1.1.0`|0.7 (per 1000000 char)|1000 char
   * |**sapling**|`v1`|20.0 (per 1000000 char)|1000 char
   * |**nlpcloud**|`v1`|25.0 (per 1000 request)|1 request
   *
   *
   * </details>
   *
   * <details><summary>Supported Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Arabic**|`ar`|
   * |**Bengali**|`bn`|
   * |**Chinese**|`zh`|
   * |**Danish**|`da`|
   * |**Dutch**|`nl`|
   * |**English**|`en`|
   * |**Finnish**|`fi`|
   * |**French**|`fr`|
   * |**German**|`de`|
   * |**Hindi**|`hi`|
   * |**Indonesian**|`id`|
   * |**Italian**|`it`|
   * |**Japanese**|`ja`|
   * |**Korean**|`ko`|
   * |**Modern Greek (1453-)**|`el`|
   * |**Norwegian**|`no`|
   * |**Panjabi**|`pa`|
   * |**Polish**|`pl`|
   * |**Portuguese**|`pt`|
   * |**Romanian**|`ro`|
   * |**Russian**|`ru`|
   * |**Spanish**|`es`|
   * |**Swedish**|`sv`|
   * |**Tamil**|`ta`|
   * |**Thai**|`th`|
   * |**Turkish**|`tr`|
   * |**Ukrainian**|`uk`|
   * |**Vietnamese**|`vi`|
   *
   * </details><details><summary>Supported Detailed Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Auto detection**|`auto-detect`|
   * |**Chinese (Simplified)**|`zh-Hans`|
   * |**Chinese (Taiwan)**|`zh-TW`|
   * |**Chinese (Traditional)**|`zh-Hant`|
   * |**English (United States)**|`en-US`|
   * |**French (France)**|`fr-FR`|
   * |**Portuguese (Brazil)**|`pt-BR`|
   * |**Portuguese (Portugal)**|`pt-PT`|
   *
   * </details>
   *
   * @summary Sentiment Analysis
   * @throws FetchError<400, types.TextSentimentAnalysisCreateResponse400>
   * @throws FetchError<403, types.TextSentimentAnalysisCreateResponse403>
   * @throws FetchError<404, types.TextSentimentAnalysisCreateResponse404>
   * @throws FetchError<500, types.TextSentimentAnalysisCreateResponse500>
   */
  text_sentiment_analysis_create(body: types.TextSentimentAnalysisCreateBodyParam): Promise<FetchResponse<200, types.TextSentimentAnalysisCreateResponse200>> {
    return this.core.fetch('/text/sentiment_analysis', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**microsoft**|`v7`|0.3 (per 1000 request)|1 request
   * |**openai**|`v3.0.0`|20.0 (per 1000000 token)|1 token
   * |**prowritingaid**|`v2`|10.0 (per 1000 request)|1 request
   * |**cohere**|`2022-12-06`|2.0 (per 1000000 token)|1 token
   * |**sapling**|`v1`|2.0 (per 1000000 char)|1 char
   * |**nlpcloud**|`v1`|25.0 (per 1000 request)|1 request
   * |**ai21labs**|`v1`|0.0005 (per 1 request)|1 request
   *
   *
   * </details>
   *
   * <details><summary>Supported Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Achinese**|`ace`|
   * |**Afrikaans**|`af`|
   * |**Akan**|`ak`|
   * |**Albanian**|`sq`|
   * |**Amharic**|`am`|
   * |**Arabic**|`ar`|
   * |**Armenian**|`hy`|
   * |**Assamese**|`as`|
   * |**Asturian**|`ast`|
   * |**Awadhi**|`awa`|
   * |**Ayacucho Quechua**|`quy`|
   * |**Azerbaijani**|`az`|
   * |**Balinese**|`ban`|
   * |**Bambara**|`bm`|
   * |**Banjar**|`bjn`|
   * |**Bashkir**|`ba`|
   * |**Basque**|`eu`|
   * |**Belarusian**|`be`|
   * |**Bemba (Zambia)**|`bem`|
   * |**Bengali**|`bn`|
   * |**Bhojpuri**|`bho`|
   * |**Bosnian**|`bs`|
   * |**Buginese**|`bug`|
   * |**Bulgarian**|`bg`|
   * |**Burmese**|`my`|
   * |**Catalan**|`ca`|
   * |**Cebuano**|`ceb`|
   * |**Central Atlas Tamazight**|`tzm`|
   * |**Central Aymara**|`ayr`|
   * |**Central Kanuri**|`knc`|
   * |**Central Kurdish**|`ckb`|
   * |**Chhattisgarhi**|`hne`|
   * |**Chinese**|`zh`|
   * |**Chokwe**|`cjk`|
   * |**Corsican**|`co`|
   * |**Crimean Tatar**|`crh`|
   * |**Croatian**|`hr`|
   * |**Czech**|`cs`|
   * |**Danish**|`da`|
   * |**Dutch**|`nl`|
   * |**Dyula**|`dyu`|
   * |**Dzongkha**|`dz`|
   * |**Eastern Yiddish**|`ydd`|
   * |**Egyptian Arabic**|`arz`|
   * |**English**|`en`|
   * |**Esperanto**|`eo`|
   * |**Estonian**|`et`|
   * |**Ewe**|`ee`|
   * |**Faroese**|`fo`|
   * |**Fijian**|`fj`|
   * |**Finnish**|`fi`|
   * |**Fon**|`fon`|
   * |**French**|`fr`|
   * |**Friulian**|`fur`|
   * |**Galician**|`gl`|
   * |**Ganda**|`lg`|
   * |**Georgian**|`ka`|
   * |**German**|`de`|
   * |**Guarani**|`gn`|
   * |**Gujarati**|`gu`|
   * |**Haitian**|`ht`|
   * |**Halh Mongolian**|`khk`|
   * |**Hausa**|`ha`|
   * |**Hawaiian**|`haw`|
   * |**Hebrew**|`he`|
   * |**Hindi**|`hi`|
   * |**Hmong**|`hmn`|
   * |**Hungarian**|`hu`|
   * |**Icelandic**|`is`|
   * |**Igbo**|`ig`|
   * |**Iloko**|`ilo`|
   * |**Indonesian**|`id`|
   * |**Irish**|`ga`|
   * |**Italian**|`it`|
   * |**Japanese**|`ja`|
   * |**Javanese**|`jv`|
   * |**Kabiyè**|`kbp`|
   * |**Kabuverdianu**|`kea`|
   * |**Kabyle**|`kab`|
   * |**Kachin**|`kac`|
   * |**Kamba (Kenya)**|`kam`|
   * |**Kannada**|`kn`|
   * |**Kashmiri**|`ks`|
   * |**Kazakh**|`kk`|
   * |**Khmer**|`km`|
   * |**Kikuyu**|`ki`|
   * |**Kimbundu**|`kmb`|
   * |**Kinyarwanda**|`rw`|
   * |**Kirghiz**|`ky`|
   * |**Kongo**|`kg`|
   * |**Korean**|`ko`|
   * |**Kurdish**|`ku`|
   * |**Lao**|`lo`|
   * |**Latgalian**|`ltg`|
   * |**Latin**|`la`|
   * |**Latvian**|`lv`|
   * |**Ligurian**|`lij`|
   * |**Limburgan**|`li`|
   * |**Lingala**|`ln`|
   * |**Lithuanian**|`lt`|
   * |**Lombard**|`lmo`|
   * |**Luba-Katanga**|`lu`|
   * |**Luo (Kenya and Tanzania)**|`luo`|
   * |**Lushai**|`lus`|
   * |**Luxembourgish**|`lb`|
   * |**Macedonian**|`mk`|
   * |**Magahi**|`mag`|
   * |**Maithili**|`mai`|
   * |**Malagasy**|`mg`|
   * |**Malay (macrolanguage)**|`ms`|
   * |**Malayalam**|`ml`|
   * |**Maltese**|`mt`|
   * |**Manipuri**|`mni`|
   * |**Maori**|`mi`|
   * |**Marathi**|`mr`|
   * |**Mesopotamian Arabic**|`acm`|
   * |**Minangkabau**|`min`|
   * |**Modern Greek (1453-)**|`el`|
   * |**Mongolian**|`mn`|
   * |**Moroccan Arabic**|`ary`|
   * |**Mossi**|`mos`|
   * |**Najdi Arabic**|`ars`|
   * |**Nepali (macrolanguage)**|`ne`|
   * |**Nigerian Fulfulde**|`fuv`|
   * |**North Azerbaijani**|`azj`|
   * |**North Levantine Arabic**|`apc`|
   * |**Northern Kurdish**|`kmr`|
   * |**Northern Uzbek**|`uzn`|
   * |**Norwegian**|`no`|
   * |**Norwegian Bokmål**|`nb`|
   * |**Norwegian Nynorsk**|`nn`|
   * |**Nuer**|`nus`|
   * |**Nyanja**|`ny`|
   * |**Occitan (post 1500)**|`oc`|
   * |**Oriya (macrolanguage)**|`or`|
   * |**Pangasinan**|`pag`|
   * |**Panjabi**|`pa`|
   * |**Papiamento**|`pap`|
   * |**Pedi**|`nso`|
   * |**Persian**|`fa`|
   * |**Plateau Malagasy**|`plt`|
   * |**Polish**|`pl`|
   * |**Portuguese**|`pt`|
   * |**Pushto**|`ps`|
   * |**Romanian**|`ro`|
   * |**Rundi**|`rn`|
   * |**Russian**|`ru`|
   * |**Samoan**|`sm`|
   * |**Sango**|`sg`|
   * |**Sanskrit**|`sa`|
   * |**Santali**|`sat`|
   * |**Sardinian**|`sc`|
   * |**Scottish Gaelic**|`gd`|
   * |**Serbian**|`sr`|
   * |**Shan**|`shn`|
   * |**Shona**|`sn`|
   * |**Sicilian**|`scn`|
   * |**Silesian**|`szl`|
   * |**Sindhi**|`sd`|
   * |**Sinhala**|`si`|
   * |**Slovak**|`sk`|
   * |**Slovenian**|`sl`|
   * |**Somali**|`so`|
   * |**South Azerbaijani**|`azb`|
   * |**South Levantine Arabic**|`ajp`|
   * |**Southern Pashto**|`pbt`|
   * |**Southern Sotho**|`st`|
   * |**Southwestern Dinka**|`dik`|
   * |**Spanish**|`es`|
   * |**Standard Latvian**|`lvs`|
   * |**Standard Malay**|`zsm`|
   * |**Sundanese**|`su`|
   * |**Swahili (macrolanguage)**|`sw`|
   * |**Swati**|`ss`|
   * |**Swedish**|`sv`|
   * |**Ta'izzi-Adeni Arabic**|`acq`|
   * |**Tagalog**|`tl`|
   * |**Tajik**|`tg`|
   * |**Tamashek**|`tmh`|
   * |**Tamil**|`ta`|
   * |**Tatar**|`tt`|
   * |**Telugu**|`te`|
   * |**Thai**|`th`|
   * |**Tibetan**|`bo`|
   * |**Tigrinya**|`ti`|
   * |**Tok Pisin**|`tpi`|
   * |**Tosk Albanian**|`als`|
   * |**Tsonga**|`ts`|
   * |**Tswana**|`tn`|
   * |**Tumbuka**|`tum`|
   * |**Tunisian Arabic**|`aeb`|
   * |**Turkish**|`tr`|
   * |**Turkmen**|`tk`|
   * |**Twi**|`tw`|
   * |**Uighur**|`ug`|
   * |**Ukrainian**|`uk`|
   * |**Umbundu**|`umb`|
   * |**Urdu**|`ur`|
   * |**Uzbek**|`uz`|
   * |**Venetian**|`vec`|
   * |**Vietnamese**|`vi`|
   * |**Waray (Philippines)**|`war`|
   * |**Welsh**|`cy`|
   * |**West Central Oromo**|`gaz`|
   * |**Western Frisian**|`fy`|
   * |**Wolof**|`wo`|
   * |**Xhosa**|`xh`|
   * |**Yiddish**|`yi`|
   * |**Yoruba**|`yo`|
   * |**Yue Chinese**|`yue`|
   * |**Zulu**|`zu`|
   * |**jp**|`jp`|
   *
   * </details><details><summary>Supported Detailed Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Auto detection**|`auto-detect`|
   * |**Arabic (world)**|`ar-001`|
   * |**Chinese (China)**|`zh-CN`|
   * |**Chinese (Simplified)**|`zh-hans`|
   * |**Chinese (Taiwan)**|`zh-TW`|
   * |**Chinese (Traditional)**|`zh-Hant`|
   * |**Chinese (Traditional)**|`zh-hant`|
   * |**English (United Kingdom)**|`en-gb`|
   * |**Persian (Afghanistan)**|`fa-AF`|
   * |**Portuguese (Brazil)**|`pt-br`|
   * |**Portuguese (Portugal)**|`pt-pt`|
   *
   * </details>
   *
   * @summary Spell Check
   * @throws FetchError<400, types.TextSpellCheckCreateResponse400>
   * @throws FetchError<403, types.TextSpellCheckCreateResponse403>
   * @throws FetchError<404, types.TextSpellCheckCreateResponse404>
   * @throws FetchError<500, types.TextSpellCheckCreateResponse500>
   */
  text_spell_check_create(body: types.TextSpellCheckCreateBodyParam): Promise<FetchResponse<200, types.TextSpellCheckCreateResponse200>> {
    return this.core.fetch('/text/spell_check', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Model|Version|Price|Billing unit|
   * |----|----|-------|-----|------------|
   * |**connexun**|-|`v1.0`|2.0 (per 1000 request)|1 request
   * |**microsoft**|-|`v3.1`|2.0 (per 1000000 char)|1000 char
   * |**openai**|-|`v3.0.0`|60.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-4**|`v3.0.0`|60.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-3.5-turbo-1106**|`v3.0.0`|2.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-3.5-turbo**|`v3.0.0`|2.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-3.5-turbo-16k**|`v3.0.0`|4.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-4-32k-0314**|`v3.0.0`|120.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-4-turbo-2024-04-09**|`v3.0.0`|30.0 (per 1000000 token)|1 token
   * |**openai**|**gpt-3.5-turbo-0125**|`v3.0.0`|1.5 (per 1000000 token)|1 token
   * |**openai**|**gpt-4o-mini**|`v3.0.0`|0.6 (per 1000000 token)|1 token
   * |**emvista**|-|`v1.0`|1.0 (per 1000000 char)|1000 char
   * |**cohere**|-|`2022-12-06`|2.0 (per 1000000 token)|1 token
   * |**cohere**|**summarize-xlarge**|`2022-12-06`|2.0 (per 1000000 token)|1 token
   * |**alephalpha**|-|`1.12.0`|50.0 (per 1000000 char)|1 char
   * |**alephalpha**|**luminous-base**|`1.12.0`|1.0 (per 1000000 char)|1 char
   * |**alephalpha**|**luminous-extended**|`1.12.0`|1.5 (per 1000000 char)|1 char
   * |**alephalpha**|**luminous-supreme**|`1.12.0`|50.0 (per 1000000 char)|1 char
   * |**alephalpha**|**luminous-base-control**|`1.12.0`|1.25 (per 1000000 char)|1 char
   * |**alephalpha**|**luminous-extended-control**|`1.12.0`|1.8 (per 1000000 char)|1 char
   * |**alephalpha**|**luminous-supreme-control**|`1.12.0`|62.5 (per 1000000 char)|1 char
   * |**nlpcloud**|-|`v1`|25.0 (per 1000 request)|1 request
   * |**nlpcloud**|**bart-large-cnn**|`v1`|25.0 (per 1000 request)|1 request
   * |**nlpcloud**|**fast-gpt-j**|`v1`|25.0 (per 1000 request)|1 request
   * |**nlpcloud**|**finetuned-llama-2-70b**|`v1`|25.0 (per 1000 request)|1 request
   * |**nlpcloud**|**chatdolphin**|`v1`|25.0 (per 1000 request)|1 request
   * |**ai21labs**|-|`v1`|0.005 (per 1000 char)|1000 char
   * |**anthropic**|**claude-3-haiku-20240307-v1:0**|`bedrock-2023-05-31`|1.25 (per 1000000
   * token)|1 token
   * |**anthropic**|**claude-3-sonnet-20240229-v1:0**|`bedrock-2023-05-31`|15.0 (per 1000000
   * token)|1 token
   * |**anthropic**|-|`bedrock-2023-05-31`|15.0 (per 1000000 token)|1 token
   * |**anthropic**|**claude-v2**|`bedrock-2023-05-31`|24.0 (per 1000000 token)|1 token
   * |**anthropic**|**claude-instant-v1**|`bedrock-2023-05-31`|2.4 (per 1000000 token)|1
   * token
   * |**anthropic**|**claude-3-5-sonnet-20240620-v1:0**|`bedrock-2023-05-31`|15.0 (per
   * 1000000 token)|1 token
   *
   *
   * </details>
   *
   * <details><summary>Supported Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Arabic**|`ar`|
   * |**Armenian**|`hy`|
   * |**Awadhi**|`awa`|
   * |**Azerbaijani**|`az`|
   * |**Bashkir**|`ba`|
   * |**Basque**|`eu`|
   * |**Belarusian**|`be`|
   * |**Bengali**|`bn`|
   * |**Bhojpuri**|`bho`|
   * |**Bosnian**|`bs`|
   * |**Bulgarian**|`bg`|
   * |**Catalan**|`ca`|
   * |**Chinese**|`zh`|
   * |**Czech**|`cs`|
   * |**Danish**|`da`|
   * |**Dogri (macrolanguage)**|`doi`|
   * |**Dutch**|`nl`|
   * |**English**|`en`|
   * |**Estonian**|`et`|
   * |**Faroese**|`fo`|
   * |**Finnish**|`fi`|
   * |**French**|`fr`|
   * |**Galician**|`gl`|
   * |**Georgian**|`ka`|
   * |**German**|`de`|
   * |**Gujarati**|`gu`|
   * |**Hausa**|`ha`|
   * |**Hindi**|`hi`|
   * |**Hungarian**|`hu`|
   * |**Indonesian**|`id`|
   * |**Irish**|`ga`|
   * |**Italian**|`it`|
   * |**Japanese**|`ja`|
   * |**Javanese**|`jv`|
   * |**Kannada**|`kn`|
   * |**Kashmiri**|`ks`|
   * |**Kazakh**|`kk`|
   * |**Khmer**|`km`|
   * |**Kirghiz**|`ky`|
   * |**Konkani (macrolanguage)**|`kok`|
   * |**Korean**|`ko`|
   * |**Kurdish**|`ku`|
   * |**Latvian**|`lv`|
   * |**Lithuanian**|`lt`|
   * |**Macedonian**|`mk`|
   * |**Maithili**|`mai`|
   * |**Malay (macrolanguage)**|`ms`|
   * |**Maltese**|`mt`|
   * |**Marathi**|`mr`|
   * |**Min Nan Chinese**|`nan`|
   * |**Modern Greek (1453-)**|`el`|
   * |**Mongolian**|`mn`|
   * |**Nepali (macrolanguage)**|`ne`|
   * |**Norwegian**|`no`|
   * |**Oriya (macrolanguage)**|`or`|
   * |**Panjabi**|`pa`|
   * |**Persian**|`fa`|
   * |**Polish**|`pl`|
   * |**Portuguese**|`pt`|
   * |**Pushto**|`ps`|
   * |**Romanian**|`mo`|
   * |**Romanian**|`ro`|
   * |**Russian**|`ru`|
   * |**Sanskrit**|`sa`|
   * |**Santali**|`sat`|
   * |**Shan**|`shn`|
   * |**Sicilian**|`scn`|
   * |**Sinhala**|`si`|
   * |**Slovak**|`sk`|
   * |**Slovenian**|`sl`|
   * |**Spanish**|`es`|
   * |**Swahili (macrolanguage)**|`sw`|
   * |**Swedish**|`sv`|
   * |**Tajik**|`tg`|
   * |**Tamil**|`ta`|
   * |**Tatar**|`tt`|
   * |**Telugu**|`te`|
   * |**Thai**|`th`|
   * |**Turkish**|`tr`|
   * |**Turkmen**|`tk`|
   * |**Ukrainian**|`uk`|
   * |**Urdu**|`ur`|
   * |**Uzbek**|`uz`|
   * |**Vietnamese**|`vi`|
   * |**Welsh**|`cy`|
   * |**Wu Chinese**|`wuu`|
   * |**Yue Chinese**|`yue`|
   * |**me**|`me`|
   * |**ra**|`ra`|
   *
   * </details><details><summary>Supported Detailed Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Auto detection**|`auto-detect`|
   * |**Chinese (Simplified)**|`zh-Hans`|
   * |**Portuguese (Brazil)**|`pt-BR`|
   * |**Portuguese (Brazil)**|`pt-br`|
   * |**Portuguese (Portugal)**|`pt-PT`|
   * |**Portuguese (Portugal)**|`pt-pt`|
   *
   * </details><details><summary>Supported Models</summary><details><summary>openai</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**openai**|`gpt-3.5-turbo`|
   * ||`gpt-3.5-turbo-0125`|
   * ||`gpt-3.5-turbo-1106`|
   * ||`gpt-3.5-turbo-16k`|
   * ||`gpt-4`|
   * ||`gpt-4-32k-0314`|
   * ||`gpt-4-turbo-2024-04-09`|
   * ||`gpt-4o-mini`|
   *
   * </details><details><summary>cohere</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**cohere**|`summarize-xlarge`|
   *
   * </details><details><summary>alephalpha</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**alephalpha**|`luminous-base`|
   * ||`luminous-base-control`|
   * ||`luminous-extended`|
   * ||`luminous-extended-control`|
   * ||`luminous-supreme`|
   * ||`luminous-supreme-control`|
   *
   * </details><details><summary>nlpcloud</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**nlpcloud**|`bart-large-cnn`|
   * ||`chatdolphin`|
   * ||`fast-gpt-j`|
   * ||`finetuned-llama-2-70b`|
   *
   * </details><details><summary>anthropic</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**anthropic**|`claude-3-5-sonnet-20240620-v1:0`|
   * ||`claude-3-haiku-20240307-v1:0`|
   * ||`claude-3-sonnet-20240229-v1:0`|
   * ||`claude-instant-v1`|
   * ||`claude-v2`|
   *
   * </details>
   *
   * </details>
   *
   * @summary Summarize
   * @throws FetchError<400, types.TextSummarizeCreateResponse400>
   * @throws FetchError<403, types.TextSummarizeCreateResponse403>
   * @throws FetchError<404, types.TextSummarizeCreateResponse404>
   * @throws FetchError<500, types.TextSummarizeCreateResponse500>
   */
  text_summarize_create(body: types.TextSummarizeCreateBodyParam): Promise<FetchResponse<200, types.TextSummarizeCreateResponse200>> {
    return this.core.fetch('/text/summarize', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**amazon**|`boto3 (v1.15.18)`|0.5 (per 1000000 char)|300 char
   * |**google**|`v1`|0.5 (per 1000000 char)|1000 char
   * |**ibm**|`v1 (2021-08-01)`|0.3 (per 1000000 char)|10000 char
   * |**lettria**|`v5.5.2`|2.0 (per 1000000 char)|1000 char
   * |**emvista**|`v1.0`|1.0 (per 1000000 char)|1 char
   *
   *
   * </details>
   *
   * <details><summary>Supported Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Arabic**|`ar`|
   * |**Chinese**|`zh`|
   * |**Czech**|`cs`|
   * |**Danish**|`da`|
   * |**Dutch**|`nl`|
   * |**English**|`en`|
   * |**Finnish**|`fi`|
   * |**French**|`fr`|
   * |**German**|`de`|
   * |**Hebrew**|`he`|
   * |**Hindi**|`hi`|
   * |**Italian**|`it`|
   * |**Japanese**|`ja`|
   * |**Korean**|`ko`|
   * |**Norwegian**|`no`|
   * |**Polish**|`pl`|
   * |**Portuguese**|`pt`|
   * |**Romanian**|`ro`|
   * |**Russian**|`ru`|
   * |**Slovak**|`sk`|
   * |**Spanish**|`es`|
   * |**Swedish**|`sv`|
   * |**Turkish**|`tr`|
   *
   * </details><details><summary>Supported Detailed Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Auto detection**|`auto-detect`|
   * |**Chinese (Taiwan)**|`zh-TW`|
   * |**Chinese (Traditional)**|`zh-Hant`|
   * |**English (United States)**|`en-US`|
   * |**French (France)**|`fr-FR`|
   *
   * </details>
   *
   * @summary Syntax Analysis
   * @throws FetchError<400, types.TextSyntaxAnalysisCreateResponse400>
   * @throws FetchError<403, types.TextSyntaxAnalysisCreateResponse403>
   * @throws FetchError<404, types.TextSyntaxAnalysisCreateResponse404>
   * @throws FetchError<500, types.TextSyntaxAnalysisCreateResponse500>
   */
  text_syntax_analysis_create(body: types.TextSyntaxAnalysisCreateBodyParam): Promise<FetchResponse<200, types.TextSyntaxAnalysisCreateResponse200>> {
    return this.core.fetch('/text/syntax_analysis', 'post', body);
  }

  /**
   * <details><summary><strong style='color: #0072a3; cursor: pointer'>Available
   * Providers</strong></summary>
   *
   *
   *
   * |Provider|Version|Price|Billing unit|
   * |----|-------|-----|------------|
   * |**google**|`v1`|2.0 (per 1000000 char)|1000 char
   * |**ibm**|`v1 (2021-08-01)`|0.3 (per 1000000 char)|10000 char
   * |**openai**|`v1`|20.0 (per 1000000 token)|1 token
   * |**tenstorrent**|`v1.0.0`|2.0 (per 1000000 char)|1000 char
   *
   *
   * </details>
   *
   * <details><summary>Supported Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Arabic**|`ar`|
   * |**Chinese**|`zh`|
   * |**Dutch**|`nl`|
   * |**English**|`en`|
   * |**French**|`fr`|
   * |**German**|`de`|
   * |**Italian**|`it`|
   * |**Japanese**|`ja`|
   * |**Korean**|`ko`|
   * |**Portuguese**|`pt`|
   * |**Russian**|`ru`|
   * |**Spanish**|`es`|
   *
   * </details><details><summary>Supported Detailed Languages</summary>
   *
   *
   *
   *
   *
   * |Name|Value|
   * |----|-----|
   * |**Auto detection**|`auto-detect`|
   *
   * </details>
   *
   * @summary Topic Extraction
   * @throws FetchError<400, types.TextTopicExtractionCreateResponse400>
   * @throws FetchError<403, types.TextTopicExtractionCreateResponse403>
   * @throws FetchError<404, types.TextTopicExtractionCreateResponse404>
   * @throws FetchError<500, types.TextTopicExtractionCreateResponse500>
   */
  text_topic_extraction_create(body: types.TextTopicExtractionCreateBodyParam): Promise<FetchResponse<200, types.TextTopicExtractionCreateResponse200>> {
    return this.core.fetch('/text/topic_extraction', 'post', body);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { TextAiDetectionCreateBodyParam, TextAiDetectionCreateResponse200, TextAiDetectionCreateResponse400, TextAiDetectionCreateResponse403, TextAiDetectionCreateResponse404, TextAiDetectionCreateResponse500, TextAnonymizationCreateBodyParam, TextAnonymizationCreateResponse200, TextAnonymizationCreateResponse400, TextAnonymizationCreateResponse403, TextAnonymizationCreateResponse404, TextAnonymizationCreateResponse500, TextChatCreateBodyParam, TextChatCreateResponse200, TextChatCreateResponse400, TextChatCreateResponse403, TextChatCreateResponse404, TextChatCreateResponse500, TextChatStreamCreateBodyParam, TextChatStreamCreateResponse200, TextCodeGenerationCreateBodyParam, TextCodeGenerationCreateResponse200, TextCodeGenerationCreateResponse400, TextCodeGenerationCreateResponse403, TextCodeGenerationCreateResponse404, TextCodeGenerationCreateResponse500, TextCustomClassificationCreateBodyParam, TextCustomClassificationCreateResponse200, TextCustomClassificationCreateResponse400, TextCustomClassificationCreateResponse403, TextCustomClassificationCreateResponse404, TextCustomClassificationCreateResponse500, TextCustomNamedEntityRecognitionCreateBodyParam, TextCustomNamedEntityRecognitionCreateResponse200, TextCustomNamedEntityRecognitionCreateResponse400, TextCustomNamedEntityRecognitionCreateResponse403, TextCustomNamedEntityRecognitionCreateResponse404, TextCustomNamedEntityRecognitionCreateResponse500, TextEmbeddingsCreateBodyParam, TextEmbeddingsCreateResponse200, TextEmbeddingsCreateResponse400, TextEmbeddingsCreateResponse403, TextEmbeddingsCreateResponse404, TextEmbeddingsCreateResponse500, TextEmotionDetectionCreateBodyParam, TextEmotionDetectionCreateResponse200, TextEmotionDetectionCreateResponse400, TextEmotionDetectionCreateResponse403, TextEmotionDetectionCreateResponse404, TextEmotionDetectionCreateResponse500, TextEntitySentimentCreateBodyParam, TextEntitySentimentCreateResponse200, TextEntitySentimentCreateResponse400, TextEntitySentimentCreateResponse403, TextEntitySentimentCreateResponse404, TextEntitySentimentCreateResponse500, TextGenerationCreateBodyParam, TextGenerationCreateResponse200, TextGenerationCreateResponse400, TextGenerationCreateResponse403, TextGenerationCreateResponse404, TextGenerationCreateResponse500, TextKeywordExtractionCreateBodyParam, TextKeywordExtractionCreateResponse200, TextKeywordExtractionCreateResponse400, TextKeywordExtractionCreateResponse403, TextKeywordExtractionCreateResponse404, TextKeywordExtractionCreateResponse500, TextModerationCreateBodyParam, TextModerationCreateResponse200, TextModerationCreateResponse400, TextModerationCreateResponse403, TextModerationCreateResponse404, TextModerationCreateResponse500, TextNamedEntityRecognitionCreateBodyParam, TextNamedEntityRecognitionCreateResponse200, TextNamedEntityRecognitionCreateResponse400, TextNamedEntityRecognitionCreateResponse403, TextNamedEntityRecognitionCreateResponse404, TextNamedEntityRecognitionCreateResponse500, TextPlagiaDetectionCreateBodyParam, TextPlagiaDetectionCreateResponse200, TextPlagiaDetectionCreateResponse400, TextPlagiaDetectionCreateResponse403, TextPlagiaDetectionCreateResponse404, TextPlagiaDetectionCreateResponse500, TextPromptOptimizationCreateBodyParam, TextPromptOptimizationCreateResponse200, TextPromptOptimizationCreateResponse400, TextPromptOptimizationCreateResponse403, TextPromptOptimizationCreateResponse404, TextPromptOptimizationCreateResponse500, TextQuestionAnswerCreateBodyParam, TextQuestionAnswerCreateResponse200, TextQuestionAnswerCreateResponse400, TextQuestionAnswerCreateResponse403, TextQuestionAnswerCreateResponse404, TextQuestionAnswerCreateResponse500, TextSearchCreateBodyParam, TextSearchCreateResponse200, TextSearchCreateResponse400, TextSearchCreateResponse403, TextSearchCreateResponse404, TextSearchCreateResponse500, TextSentimentAnalysisCreateBodyParam, TextSentimentAnalysisCreateResponse200, TextSentimentAnalysisCreateResponse400, TextSentimentAnalysisCreateResponse403, TextSentimentAnalysisCreateResponse404, TextSentimentAnalysisCreateResponse500, TextSpellCheckCreateBodyParam, TextSpellCheckCreateResponse200, TextSpellCheckCreateResponse400, TextSpellCheckCreateResponse403, TextSpellCheckCreateResponse404, TextSpellCheckCreateResponse500, TextSummarizeCreateBodyParam, TextSummarizeCreateResponse200, TextSummarizeCreateResponse400, TextSummarizeCreateResponse403, TextSummarizeCreateResponse404, TextSummarizeCreateResponse500, TextSyntaxAnalysisCreateBodyParam, TextSyntaxAnalysisCreateResponse200, TextSyntaxAnalysisCreateResponse400, TextSyntaxAnalysisCreateResponse403, TextSyntaxAnalysisCreateResponse404, TextSyntaxAnalysisCreateResponse500, TextTopicExtractionCreateBodyParam, TextTopicExtractionCreateResponse200, TextTopicExtractionCreateResponse400, TextTopicExtractionCreateResponse403, TextTopicExtractionCreateResponse404, TextTopicExtractionCreateResponse500 } from './types';
