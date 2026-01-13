# ArcPay: AI-Powered Stablecoin Payment Dashboard

**ArcPay** is a professional payment infrastructure demonstration built for the **Agentic Commerce on Arc Hackathon**. This project showcases the integration of **Circle's Programmable Wallets** for automated USDC settlement and **Google Gemini AI** for intelligent transaction analysis and agentic reasoning.

---

## 🏆 Hackathon Context
This project was developed for the **"Agentic Commerce on Arc"** hackathon, a premier event focused on building the next generation of AI-driven financial systems.

* **Host Platform:** [LabLab.ai](https://lablab.ai/event/agentic-commerce-on-arc)
* **Core Sponsors:** * **Arc:** The EVM-compatible Layer-1 blockchain that uses USDC as its native gas token.
    * **Circle:** The global fintech firm and issuer of USDC, providing the programmable wallet infrastructure.
    * **Google & Google DeepMind:** Providing the **Gemini 1.5 Flash** models used for the AI analysis layer.
* **Track:** Agentic Commerce / AI-Powered Payments.

---

## 🌟 Project Purpose
ArcPay solves the problem of "Blockchain Complexity" by using AI to interpret and verify stablecoin transactions for everyday users. It demonstrates how AI agents can autonomously handle commerce while providing human-readable insights into on-chain activities.

## 🛠️ Technical Stack
- **Framework:** Next.js (React)
- **Payments:** Circle Developer-Controlled Wallets SDK
- **AI Engine:** Google Gemini 1.5 Flash (LLM)
- **Network:** Arc Testnet (Native USDC Gas)
- **Documentation:** jsPDF for automated financial receipts
- **Styling:** Custom CSS with a Slate & Indigo professional theme

## 🚀 Core Features

### 1. Programmable Infrastructure
- **Instant Provisioning:** Deploys a Treasury and a User wallet via Circle's API upon initialization.
- **Native Gas:** Specifically configured to use USDC as the native gas token on the Arc Network, eliminating the need for ETH or other volatile tokens.

### 2. Intelligent Payments
- **Automated Transfer:** Executes a 0.1 USDC transfer from the Treasury to the User address.
- **On-Chain Verification:** Generates direct links to the **Arcscan Explorer** using real-time transaction hashes (`txHash`).

### 3. AI Assistant (Gemini)
- **Transaction Interpretation:** Uses Gemini to explain the technical details of the 0.1 USDC transfer in plain English.
- **Dynamic Context:** The AI understands the specific Transaction ID and the network context (Arc Testnet) to verify finality.

### 4. Financial Compliance
- **PDF Generation:** Allows users to download a formal transaction receipt containing the TX ID, wallet addresses, and the AI-generated summary.

---

## 📦 Local Installation & Setup

1. **Clone the Project:**
   ```bash
   git clone <INSERT_YOUR_GITHUB_URL>
   cd arcpay-dashboard