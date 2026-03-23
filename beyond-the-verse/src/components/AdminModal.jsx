import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function AdminModal({
  onClose,
  donations,
  totalRaised,
  targetAmount,
  showToast,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newTarget, setNewTarget] = useState(targetAmount);

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.email) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      showToast("Admin Logged In Securely");
    } catch (err) {
      setError("Invalid Email or Password!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    showToast("Logged out successfully");
    onClose();
  };

  const handleSaveTarget = async () => {
    if (newTarget > 0) {
      try {
        await setDoc(
          doc(db, "settings", "config"),
          { targetAmount: Number(newTarget) },
          { merge: true }
        );
        showToast("Goal target updated successfully!");
      } catch (e) {
        alert("Permission Denied: Ensure you are logged in as Admin.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Is this a fake record? Deleting it will reduce the total amount."
      )
    ) {
      try {
        await deleteDoc(doc(db, "donations", id));
        showToast("Record Deleted Successfully");
      } catch (err) {
        alert("Permission Denied: Ensure you are logged in as Admin.");
      }
    }
  };

  const handleExportCsv = () => {
    if (donations.length === 0) return alert("No donations to export!");
    let csvContent = "Date,Name,Phone,UTR Number,Amount (INR),Message\n";
    donations.forEach((d) => {
      let safeName = d.name ? `"${d.name.replace(/"/g, '""')}"` : '"Unknown"';
      let dateStr = d.timestamp
        ? new Date(d.timestamp).toLocaleDateString("en-IN")
        : "N/A";
      let cleanMsg = d.message ? `"${d.message.replace(/"/g, '""')}"` : "None";
      let utr = d.utr ? `"${d.utr}"` : "N/A";
      let amount = d.amount || 0;
      csvContent += `${dateStr},${safeName},${
        d.phone || ""
      },${utr},${amount},${cleanMsg}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "BeyondTheVerse_Donations.csv";
    link.click();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-5xl relative shadow-2xl flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 z-10"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>

        {!isLoggedIn ? (
          <div className="p-10 text-center">
            <i className="fa-solid fa-shield-halved text-4xl text-teal-600 mb-4"></i>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">
              Secure Admin Login
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Enter your Firebase Admin Credentials
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin Email"
              className="w-full max-w-xs mx-auto block px-4 py-3 border border-slate-200 rounded-xl mb-3 outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full max-w-xs mx-auto block px-4 py-3 border border-slate-200 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 w-full max-w-xs mx-auto flex justify-center items-center gap-2 transition"
            >
              {isLoading ? "Checking..." : "Login securely"}{" "}
              <i className="fa-solid fa-arrow-right"></i>
            </button>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          </div>
        ) : (
          <div className="flex-col h-full overflow-hidden flex">
            <div className="p-6 border-b border-slate-100 bg-slate-50 rounded-t-2xl flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  <i className="fa-solid fa-list-check text-teal-600 mr-2"></i>{" "}
                  Supporter List
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Total Collections: ₹
                  <span className="font-bold text-teal-700">
                    {totalRaised.toLocaleString("en-IN")}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportCsv}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-sm px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm transition"
                >
                  <i className="fa-solid fa-download"></i> CSV
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 hover:bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition"
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </div>
            </div>

            <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <label className="text-sm font-bold text-slate-700">
                  Goal Target (₹):
                </label>
                <input
                  type="number"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-1.5 w-32 outline-none focus:border-teal-500 font-semibold text-slate-700"
                />
                <button
                  onClick={handleSaveTarget}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm transition"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-0 max-h-[50vh]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white sticky top-0 border-b border-slate-100 shadow-sm z-10">
                  <tr>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">
                      Date
                    </th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">
                      Donor Details
                    </th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">
                      UTR Number
                    </th>
                    <th className="p-4 text-xs font-semibold text-teal-600 uppercase text-right">
                      Amount
                    </th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {donations.map((d) => (
                    <tr
                      key={d.id}
                      className="hover:bg-slate-50 border-b border-slate-50"
                    >
                      <td className="p-4 text-sm text-slate-500">
                        {new Date(d.timestamp).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-medium text-slate-800">
                          {d.name}
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          {d.phone}
                        </div>
                        {d.message && (
                          <div className="text-[10px] text-slate-500 italic mt-1 leading-tight">
                            <i className="fa-solid fa-quote-left mr-1"></i>
                            {d.message}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-sm text-slate-600 font-mono font-bold tracking-wider">
                        {d.utr || (
                          <span className="text-slate-300 italic">No UTR</span>
                        )}
                      </td>
                      <td className="p-4 text-sm font-bold text-teal-700 text-right">
                        ₹{Number(d.amount).toLocaleString("en-IN")}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors p-2 rounded"
                          title="Delete Record"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
