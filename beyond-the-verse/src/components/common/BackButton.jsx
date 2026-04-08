import { useNavigate } from 'react-router-dom';

export default function BackButton({ to = "/", label = "Back to Home" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      // group: icon container को होवर पर कंट्रोल करने के लिए
      // transition-all: स्मूथ इफ़ेक्ट के लिए
      className="group inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-white border border-slate-200 text-slate-500 rounded-full transition-all duration-200 hover:border-teal-300 hover:text-teal-600 hover:shadow-sm active:scale-95 w-max outline-none"
    >
      {/* आइकॉन वाला गोला - जो होवर करने पर टील (Teal) हो जाएगा */}
      <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-50 group-hover:bg-teal-50 transition-colors">
        <i className="fa-solid fa-arrow-left text-[10px] sm:text-xs"></i>
      </div>

      {/* Fluid Typography: मोबाइल पर 11px, मीडियम पर 13px और बड़े डेस्कटॉप पर 14px */}
      <span className="text-[11px] sm:text-[13px] lg:text-sm">
        {label}
      </span>
    </button>
  );
}