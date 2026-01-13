import { useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";

export default function Home() {
  const [wallets, setWallets] = useState(null);
  const [tx, setTx] = useState(null);
  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);

  const initProject = async () => {
    setLoading(true);
    const res = await axios.post('/api/create');
    setWallets(res.data);
    setLoading(false);
  };

  const sendPayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/transfer', {
        walletId: wallets.treasury.id,
        destinationAddress: wallets.user.address
      });
      console.log("Transaction Data:", res.data);
      setTx(res.data); // This contains the transaction info
    } catch (err) {
      alert("Payment Failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const getAiHelp = async () => {
    setLoading(true);
    const res = await axios.post('/api/ai-assistant', { txId: tx.id });
    setAiText(res.data.summary);
    setLoading(false);
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("ArcPay Payment Receipt", 20, 20);
    doc.setFontSize(10);
    doc.text(`Transaction ID: ${tx.id}`, 20, 35);
    doc.text(`From: ${wallets.treasury.address}`, 20, 45);
    doc.text(`To: ${wallets.user.address}`, 20, 55);
    doc.text(`Amount: 0.1 USDC`, 20, 65);
    if (aiText) {
      const splitText = doc.splitTextToSize(`AI Summary: ${aiText}`, 170);
      doc.text(splitText, 20, 80);
    }
    doc.save("receipt.pdf");
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#1a202c', marginBottom: '10px' }}>ArcPay AI Dashboard</h1>
      <p style={{ color: '#718096', marginBottom: '30px' }}>Stablecoin-native payments powered by Circle & Gemini AI</p>

      {!wallets ? (
        <button onClick={initProject} disabled={loading} style={btnStyle}>
          {loading ? "Initializing..." : "Initialize Project Wallets"}
        </button>
      ) : (
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, color: '#2d3748' }}>Infrastructure Ready</h3>
          <p><strong>Treasury Address:</strong> <code style={codeStyle}>{wallets.treasury.address}</code></p>
          <p><strong>User Address:</strong> <code style={codeStyle}>{wallets.user.address}</code></p>
          <hr style={{ border: '0.5px solid #eee', margin: '20px 0' }} />
          <p style={{ color: '#e53e3e', fontSize: '14px', fontWeight: 'bold' }}>1. Ensure Treasury has USDC (Arc Testnet)</p>
          <button onClick={sendPayment} disabled={loading} style={{ ...btnStyle, backgroundColor: '#3182ce' }}>
            {loading ? "Processing..." : "Send 0.1 USDC"}
          </button>
        </div>
      )}

      {tx && (
        <div style={{ ...cardStyle, borderLeft: '5px solid #38a169' }}>
          <p style={{ color: '#2f855a', fontWeight: 'bold', margin: '0 0 10px 0' }}>✅ Payment Initiated</p>
          <p style={{ fontSize: '12px', color: '#4a5568', marginBottom: '15px' }}>
            Circle ID: <code style={codeStyle}>{tx.id}</code>
          </p>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
            <button onClick={getAiHelp} disabled={loading} style={{ ...btnStyle, backgroundColor: '#667eea' }}>
              {loading ? "Thinking..." : "Explain with AI"}
            </button>
            <button onClick={downloadReceipt} style={{ ...btnStyle, backgroundColor: '#4a5568' }}>
              PDF Receipt
            </button>
          </div>

          {/* FIX: Dynamic Link Handling */}
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #edf2f7' }}>
            <a 
              href={tx.txHash ? `https://testnet.arcscan.app/tx/${tx.txHash}` : `https://testnet.arcscan.app/address/${wallets.treasury.address}`} 
              target="_blank" 
              rel="noreferrer" 
              style={{ color: '#3182ce', fontSize: '13px', textDecoration: 'none', fontWeight: '600' }}
            >
              {tx.txHash ? "View Transaction on Arcscan ↗" : "View Wallet Activity on Arcscan ↗"}
            </a>
            {!tx.txHash && <p style={{fontSize: '11px', color: '#a0aec0', marginTop: '4px'}}>* Blockchain hash may take a moment to generate.</p>}
          </div>

          {aiText && (
            <div style={aiBoxStyle}>
              <strong style={{ color: '#5a67d8', fontSize: '14px' }}>Gemini AI Analysis:</strong>
              <p style={{ margin: '8px 0 0 0', lineHeight: '1.5', color: '#2d3748', fontSize: '14px' }}>{aiText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle = { maxWidth: '750px', margin: '50px auto', padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f7fafc', borderRadius: '20px' };
const btnStyle = { padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#2d3748', color: '#fff', cursor: 'pointer', fontWeight: '600', fontSize: '13px' };
const cardStyle = { backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '24px', borderRadius: '16px', marginTop: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' };
const codeStyle = { backgroundColor: '#edf2f7', padding: '3px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '11px', color: '#4a5568', wordBreak: 'break-all' };
const aiBoxStyle = { backgroundColor: '#ebf4ff', padding: '18px', borderRadius: '12px', marginTop: '20px', borderLeft: '4px solid #667eea' };