# AIBench Skills

This directory contains custom skills for automating common tasks in the AIBench project.

## Available Skills

### `/add-ai-tool` - Discover and Add New AI Tools

Automates the discovery and addition of new AI tools from various sources.

**What it does:**
1. ✅ Analyzes content from social media, news, and official websites
2. ✅ Extracts structured tool information (name, description, category, pricing, etc.)
3. ✅ Generates translations for all 8 supported languages
4. ✅ Validates tool quality and checks for duplicates
5. ✅ Prepares data for addition to the database

**Usage:**

```
/add-ai-tool <source>
```

Examples:
```
/add-ai-tool https://x.com/elonmusk/status/1234567890
/add-ai-tool https://techcrunch.com/2026/02/new-ai-tool
/add-ai-tool "Today I discovered an amazing AI tool called..."
```

**Sources:**
- Social media posts (Twitter/X, LinkedIn, etc.)
- News articles (TechCrunch, VentureBeat, etc.)
- Official websites
- Text content

**Output:**
- JSON-formatted tool data
- 8-language translations
- Category and tag suggestions
- Quality assessment

**Categories:**
1. Chatbots
2. Image Generation
3. Video Creation
4. Audio & Speech
5. Coding Development
6. Writing Assistant
7. Productivity
8. AI Agents
9. AI Search
10. Development Platform
11. AI Design

### `/approve-tool-submission` - Approve Tool Submissions

Automates the complete workflow for approving and adding new AI tool submissions to the AIBench platform.

**What it does:**
1. ✅ Parses tool submission data (from Web3Forms email or manual input)
2. ✅ Adds tool to `src/data/tools.ts`
3. ✅ Creates translations for all 8 supported languages
4. ✅ Builds and validates the project
5. ✅ Commits and pushes changes to git
6. ✅ Generates approval email for the submitter

**Usage:**

Simply invoke the skill with the submission data:

```
/approve-tool-submission

Tool-name: Skywork
Tool-url: https://skywork.ai/
Tool-icon: https://skywork.ai/help/images/logo_light.svg
Tool-category: AI Agents
Tool-description: Skywork, the Originator of AI Workspace.
Tool-long-description: General Agent is Skywork's task center for end-to-end work execution...
Tool-tags: Agent, Workspace, Automation
Tool-pricing: Freemium
Contact-email: user@example.com
```

Or paste the raw Web3Forms email content.

**Output:**
- Tool added to all databases
- Multi-language translations generated
- Git commit created and pushed
- Approval email ready to send

**Categories:**
- Text Writing (文本写作) - ID: 1
- Image Generation (图像生成) - ID: 2
- Coding Development (编程开发) - ID: 3
- Video Creation (视频创作) - ID: 4
- Audio & Speech (音频音效) - ID: 5
- Productivity (办公效率) - ID: 6
- AI Agents (AI智能体) - ID: 7
- AI Search (AI搜索) - ID: 8
- Development Platform (开发平台) - ID: 9
- AI Design (AI设计) - ID: 10

**Supported Languages:**
- 🇺🇸 English (en)
- 🇨🇳 Chinese (zh)
- 🇩🇪 German (de)
- 🇯🇵 Japanese (ja)
- 🇪🇸 Spanish (es)
- 🇫🇷 French (fr)
- 🇰🇷 Korean (ko)
- 🇷🇺 Russian (ru)

## Creating New Skills

To create a new skill:

1. Create a JSON file in `.claude/skills/`
2. Include these fields:
   - `name`: Skill command name (used with `/skill-name`)
   - `description`: Brief description
   - `instructions`: Detailed step-by-step instructions
   - `version`: Semantic version
   - `author`: Author name

3. Test the skill by invoking it with `/skill-name`

## Notes

- Skills are project-specific and stored in version control
- All team members can use the same skills
- Skills help maintain consistency in workflows
- Skills can be updated by editing the JSON files

## Support

For issues or suggestions about skills, contact: service@x2v.co
