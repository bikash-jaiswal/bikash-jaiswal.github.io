"use client";
import Link from "next/link";
import React, { useState } from "react";

const AItools = [
    {
        Name: "Brand Mark",
        UsedFor: "Generating brand logos",
        Category: ["Design"],
        Link: "https://brandmark.io/",
    },
    {
        Name: "Magic Eraser",
        UsedFor: "Removing unwanted elements from images",
        Category: ["Design"],
        Link: "https://www.magiceraser.io/",
    },
    {
        Name: "bigJPG",
        UsedFor: "Increasing image resolution",
        Category: ["Design"],
        Link: "https://bigjpg.com/",
    },
    {
        Name: "Profile Pic Maker",
        UsedFor: "Creating profile pictures",
        Category: ["Design"],
        Link: "https://pfpmaker.com/",
    },
    {
        Name: "Musicfy",
        UsedFor: "Create AI covers of your favorite songs in seconds",
        Category: ["Design"],
        Link: "https://www.musicfy.lol/",
    },
    {
        Name: "Room Reinvented",
        Category: ["Design"],
        UsedFor:
            "Transform your room effortlessly with Room Reinvented! Upload a photo and let AI create over 30 stunning interior styles. Elevate your space today.",
        Link: "https://roomreinvented.com",
    },
    {
        Name: "Anypod.ai",
        UsedFor: "Semantic search engine for YouTube and podcast content",
        Category: ["Education"],
        Link: "https://www.anypod.ai/",
    },
    {
        Name: "Ask Botta",
        UsedFor: "Personal teaching assistant",
        Category: ["Education"],
        Link: "https://askbotta.com/",
    },
    {
        Name: "Podly.ai",
        UsedFor: "Summarized podcasts",
        Category: ["Education"],
        Link: "https://podly.ai/",
    },
    {
        Name: "Lorro",
        UsedFor: "Practice speaking English with an AI tutor",
        Category: ["Education"],
        Link: "https://lorro.io/",
    },
    {
        Name: "SlidesAI.io",
        UsedFor:
            "An AI Powered Text to Presentation Tool, Works with Google Slides",
        Category: ["Education"],
        Link: "https://slidesai.io",
    },
    {
        Name: "Flair",
        UsedFor: "AI design tool for branded content",
        Category: ["Education"],
        Link: "https://withflair.ai/",
    },
    {
        Name: "Twee",
        UsedFor: "A.I. Powered Tools For English Teachers",
        Category: ["Education"],
        Link: "https://twee.com",
    },
    {
        Name: "Wilco Sierra",
        UsedFor:
            "A platform that generates engineering challenges for software engineers using AI",
        Category: ["Education"],
        Link: "https://trywilco.com/sierra",
    },
    {
        Name: "Yomu",
        UsedFor: "AI writing assistant for students and academics",
        Category: ["Education"],
        Link: "https://www.yomu.ai",
    },
    {
        Name: "PDFPeer",
        UsedFor: "Chat with any PDF in seconds!",
        Category: ["Education"],
        Link: "https://pdfpeer.com/",
    },
    {
        Name: "GPT for Sheets and Docs",
        UsedFor: "Integrate GPT in your everyday tools",
        Category: ["Productivity"],
        Link: "https://workspace.google.com/marketplace/app/gpt_for_sheets_and_docs/677318054654",
    },
    {
        Name: "Lex",
        UsedFor: "Web based AI writing tool",
        Category: ["Productivity"],
        Link: "https://lex.page/",
    },
    {
        Name: "Smart Write & Smart Edit (by Mem)",
        Category: ["Productivity"],
        UsedFor: "Knowledge-aware AI writer",
        Link: "https://get.mem.ai/",
    },
    {
        Name: "DraftLab",
        UsedFor: "Gmail copilot",
        Category: ["Productivity"],
        Link: "https://draftlab.ai/",
    },
    {
        Name: "Adept",
        UsedFor: "Useful general intelligence",
        Category: ["Productivity"],
        Link: "https://www.adept.ai/",
    },
    {
        Name: "AutoRegEx",
        UsedFor: "AI based Text to Regex conversion",
        Category: ["Productivity"],
        Link: "https://www.autoregex.xyz",
    },
    {
        Name: "NotionAI",
        UsedFor: "AI Writing tool",
        Category: ["Productivity"],
        Link: "https://www.notion.so/product/ai",
    },
    {
        Name: "Plus AI for Google Slides",
        UsedFor: "Create AI-powered presentations in Google Slides",
        Category: ["Productivity"],
        Link: "https://www.plusdocs.com/plus-ai-for-google-slides",
    },
    {
        Name: "Podwise",
        UsedFor: "The premier AI learning app for Podcast Listeners",
        Category: ["Productivity"],
        Link: "https://podwise.xyz",
    },
    {
        Name: "guidde",
        UsedFor: "Magically create video documentation with AI",
        Category: ["Productivity"],
        Link: "https://www.guidde.com",
    },
    {
        Name: "Kolega",
        UsedFor: "AI powered employees for Slack and Teams",
        Category: ["Productivity"],
        Link: "https://kolega.ai",
    },
    {
        Name: "chatgpt",
        Category: ["General purpose"],
        popularity: 3,
        UsedFor:
            "Free Chrome extension providing one click to curate AI chatbot, including ChatGPT, Google Bard to improve AI responses",
        Link: "https://chromewebstore.google.com/detail/ai-character-for-gpt/daoeioifimkjegafelcaljboknjkkohh",
    },
    {
        Name: "AI Character for GPT",
        Category: ["Productivity"],
        popularity: 3,
        UsedFor:
            "Free Chrome extension providing one click to curate AI chatbot, including ChatGPT, Google Bard to improve AI responses",
        Link: "https://chromewebstore.google.com/detail/ai-character-for-gpt/daoeioifimkjegafelcaljboknjkkohh",
    },
    {
        Name: "Elephas",
        UsedFor: "Personal AI writing assistant for the Mac",
        Category: ["Productivity"],
        Link: "https://elephas.app/?ref=Top-AI-Tools",
    },
    {
        Name: "Lemmy",
        UsedFor: "Autonomous AI Assistant for Work",
        Category: ["Productivity"],
        Link: "https://lemmy.co/?ref=Top-AI-Tools",
    },
    {
        Name: "Google Sheets Formula Generator",
        UsedFor: "Forget about frustrating formulas in Google Sheets",
        Category: ["Productivity"],
        Link: "https://bettersheets.co/google-sheets-formula-generator?ref=Top-AI-Tools",
    },
    {
        Name: "morpher.com",
        Category: ["Finance"],
        UsedFor:
            "Morpher AI is a comprehensive tool for financial market analysis that acts as your personal investment analyst.",
        Link: "https://www.morpher.com/ai",
    },
    {
        Name: "Chat Data Prep",
        UsedFor: "Data transformation using plain English",
        Category: ["Developer"],
        Link: "https://www.akkio.com/chat-data-prep",
    },
    {
        Name: "Codeium",
        Category: ["Developer"],
        UsedFor: "Free AI powered code completion",
        Link: "https://www.codeium.com/",
    },
    {
        Name: "Ghostwriter (by Replit)",
        Category: ["Developer"],
        UsedFor: "AI pair programmer",
        Link: "https://replit.com/site/ghostwriter",
    },
    {
        Name: "GitHub Copilot",
        Category: ["Developer"],
        UsedFor: "An AI pair programmer",
        Link: "https://github.com/features/copilot",
    },
    {
        Name: "Keploy",
        Category: ["Developer"],
        UsedFor:
            "Open source Tool for converting user-traffic to Test Cases and Data Stubs",
        Link: "https://keploy.io",
    },
    {
        Name: "Liner.ai",
        UsedFor: "Creates classification models from your data",
        Category: ["Developer"],
        Link: "https://liner.ai/",
    },
    {
        Name: "Phind",
        Category: ["Developer"],
        UsedFor: "LLM-powered search engine for developers and technical questions",
        Link: "https://phind.com/",
    },
    {
        Name: "Promptable.ai",
        Category: ["Developer"],
        UsedFor: "The ultimate workspace for prompt engineering",
        Link: "https://promptable.ai/",
    },
    {
        Name: "Suppress.js",
        Category: ["Developer"],
        UsedFor: "Building or augmenting backend with AI",
        Link: "https://github.com/velocitatem/suppress",
    },
    {
        Name: "Dystr",
        Category: ["Developer"],
        UsedFor: "AI powered analysis / cloud runtime",
        Link: "https://dystr.com",
    },
    {
        Name: "GitPoet",
        Category: ["Developer"],
        UsedFor:
            "Git commit message generator (based on your changes) with a VSCode extension",
        Link: "https://www.gitpoet.dev/",
    },
    {
        Name: "AskCommand",
        Category: ["Developer"],
        UsedFor: "Generate Unix commands from text automatically",
        Link: "https://www.askcommand.cppexpert.online/",
    },
    {
        Name: "Shotstack Workflows",
        Category: ["Developer"],
        UsedFor:
            "No-code, automation workflow tool for building Generative AI media applications",
        Link: "https://shotstack.io/product/workflows/",
    },
    {
        Name: "GoodListen",
        UsedFor:
            "Find your next Podcast with the help of AI. AI-driven audio comprehension app",
        Category: ["Search Engines"],
        Link: "https://goodlisten.co/",
    },
    {
        Name: "Ask Anything (by Perplexity)",
        Popularity: 5,
        UsedFor:
            "Combines large language models with search engines for question answering. se it to generate titles, poems, marketing tactics, and so on. you can ask follow-up questions, upload PDF or text files, use collections to organize your conversation into customizable folders, employ Copilot, and more.",
        Category: ["Search Engines"],
        Link: "https://www.perplexity.ai/",
    },
    {
        Name: "Bird SQL (by Perplexity)",
        UsedFor: "AI-powered search for Twitter's social graph",
        Category: ["Search Engines"],
        Link: "https://www.perplexity.ai/sql",
    },
    {
        Name: "Metaphor",
        UsedFor: "A system to search the internet with large language models",
        Category: ["Search Engines"],
        Link: "https://metaphor.systems/",
    },
    {
        Name: "Rewind",
        UsedFor: "Search engine for your life",
        Category: ["Search Engines"],
        Link: "https://www.rewind.ai/",
    },
    {
        Name: "Tasmania",
        UsedFor: "YouTube video search",
        Category: ["Search Engines"],
        Link: "https://tasmania.sievedata.com/",
    },
    {
        Name: "You",
        UsedFor: "AI powered search engine",
        Category: ["Search Engines"],
        Link: "https://you.com / apps / discover",
    },
    {
        Name: "muse.ai",
        UsedFor: "Video content search and conversational assistant",
        Category: ["Search Engines"],
        Link: "https://muse.ai/",
    },
    {
        Name: "Choppity.com",
        UsedFor: "Instantly turn long podcast videos into short TikToks",
        Category: ["content generator"],
        Link: "https://www.choppity.com/",
    },
    {
        Name: "copy.ai",
        UsedFor: "AI content generator",
        Category: ["content generator"],
        Link: "https://www.copy.ai/",
    },
    {
        Name: "Jasper",
        UsedFor: "AI content creator",
        Category: ["content generator"],
        Link: "https://www.jasper.ai/",
    },
    {
        Name: "Magic Summaries by Sybill",
        UsedFor: "Create automatic, accurate sales call summaries using AI",
        Category: ["content generator"],
        Link: "https://www.sybill.ai/magic-summary",
    },
    {
        Name: "Peech",
        UsedFor: "Video content creator for content marketing",
        Category: ["content generator"],
        Link: "https://www.peech-ai.com/",
    },
    {
        Name: "Headlines",
        UsedFor: "Generating headlines for content marketing",
        Category: ["content generator"],
        Link: "https://headlines.sharethrough.com/",
    },
    {
        Name: "PressPulse AI",
        UsedFor: "Get personalized media coverage leads every morning",
        Category: ["content generator"],
        Link: "https://www.presspulse.ai/?ref=Top-AI-Tools",
    },
    {
        Name: "Taplio",
        UsedFor: "The all-in-one, AI-powered LinkedIn tool",
        Category: ["content generator"],
        Link: "https://taplio.com/?ref=Top-AI-Tools",
    },
    {
        Name: "Imagine 3D (by Luma AI)",
        UsedFor: "Tool for prototyping 3D objects with text",
        Category: ["Gaming", "3D", "Motion"],
        Link: "https://captures.lumalabs.ai/imagine",
    },
    {
        Name: "move.ai",
        UsedFor: "AI-powered real-time motion capture",
        Category: ["Gaming", "3D", "Motion"],
        Link: "https://www.move.ai/",
    },
    {
        Name: "Scenario",
        UsedFor: "Creating AI-generated game assets",
        Category: ["Gaming", "3D", "Motion"],
        Link: "https://www.scenario.gg/",
    },
    {
        Name: "Inworld AI",
        UsedFor: "Create any character you can imagine",
        Category: ["Gaming", "3D", "Motion"],
        Link: "https://inworld.ai/",
    },
    {
        Name: "Consensus",
        UsedFor: "AI powered search for research papers",
        Link: "https://consensus.app/",
        Category: ["Research"],
    },
    {
        Name: "Elicit",
        UsedFor: "An AI research assistant",
        Link: "https://elicit.org/",
        Category: ["Research"],
    },
    {
        Name: "Explainpaper",
        UsedFor: "An AI research assistant",
        Link: "https://www.explainpaper.com/",
        Category: ["Research"],
    },
    {
        Name: "Expontum",
        UsedFor: "AI generated research knowledge gaps",
        Link: "https://www.expontum.com/",
        Category: ["Research"],
    },
    {
        Name: "GummySearch",
        Category: ["Research"],
        UsedFor:
            "AI-based customer research via Reddit. Discover problems to solve, sentiment on current solutions, and people who want to buy your product",
        Link: "https://gummysearch.com/?ref=Top-AI-Tools",
    },
    {
        Name: "SiteGPT",
        Category: ["Customer Support"],
        UsedFor: "Make AI your expert customer support agent",
        Link: "https://sitegpt.ai/?ref=Top-AI-Tools",
    },
    {
        Name: "GPTHelp.ai",
        Category: ["Customer Support"],
        UsedFor: "ChatGPT for your website / AI customer support chatbot",
        Link: "https://gpthelp.ai/?ref=Top-AI-Tools",
    },
    {
        Name: "Picterra",
        Category: ["Geospatial"],
        UsedFor:
            "AI geospatial software platform for feature & change detection in satellite, drone, & aerial imagery",
        Link: "https://picterra.ch/",
    },
    {
        Name: "Never Jobless LinkedIn Message Generator",
        Category: ["Others"],
        UsedFor:
            "Maximize Your Interview Chances with AI-Powered LinkedIn Messaging",
        Link: "https://neverjobless.com/?ref=Top-AI-Tools",
    },
    {
        Name: "Aispect",
        Category: ["Others"],
        UsedFor: "New way to experience events",
        Link: "https://aispect.io/?ref=Top-AI-Tools",
    },
    {
        Name: "PromptPal",
        Category: ["Others"],
        UsedFor:
            "Search for prompts and bots, then use them with your favourite AI. All in one place",
        Link: "https://promptpal.net",
    }
]

const GridCard = () => {
    const [searchQuery, setSearchQuery] = useState('');

     const filteredAITools = AItools.filter(tool =>
        tool.Name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    // const popularAITools = filteredAITools.filter(tool => tool.Popular);
    // const nonPopularAITools = filteredAITools.filter(tool => !tool.Popular);


    return (
        <div className="my-10">
            <input
                type="text"
                placeholder="Search by tools"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 mb-4 text-black justify-center w-full rounded-full shadow-lg"
            />

            <div className="grid grid-cols-3 gap-2 p-2">
                {filteredAITools.map((tool) => (
                    <Link
                        key={tool.Name}
                        href={tool.Link}
                        className="block w-full h-full no-underline"
                    >
                        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-4 py-5 h-60">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {tool.Name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{tool.UsedFor}</p>
                            </div>
                            <div className="flex flex-wrap mt-2">
                                {Array.isArray(tool.Category) &&
                                    tool.Category.length > 0 &&
                                    tool.Category.map((tag) => (
                                        <p key={tag} className="inline-block  rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                            Tags: <span

                                                className="bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                            >
                                                {tag}
                                            </span>
                                        </p>

                                    ))}
                                {tool.popular && (
                                    <span className="inline-block bg-yellow-500 text-white rounded-full px-2 py-1 text-sm font-semibold mr-2 mb-2">
                                        Popular
                                    </span>
                                )}
                            </div>
                            <div className="px-4 pt-5 pb-4">
                                <p className="text-indigo-600 hover:text-indigo-500">
                                    <span>Visit Website</span>
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GridCard;